'use client'

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { vertexShader, fluidShader, displayShader } from './shaders';
import { FluidShaderProps, FluidUniforms, DisplayUniforms, DEFAULT_PROPS } from './types';
import { 
  hexToVector3, 
  createRenderTarget, 
  throttle, 
  getMousePosition, 
  generateAutoMovement 
} from './utils';

const FluidShader: React.FC<FluidShaderProps> = (props) => {
  const config = useMemo(() => ({ ...DEFAULT_PROPS, ...props }), [props]);
  
  // Refs
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const fluidMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const displayMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const renderTargetsRef = useRef<THREE.WebGLRenderTarget[]>([]);
  const frameRef = useRef(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, isPressed: false });
  const animationIdRef = useRef<number>(null);

  // Memoized uniforms
  const fluidUniforms = useMemo((): FluidUniforms => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
    iFrame: { value: 0 },
    iPreviousFrame: { value: null },
    uBrushSize: { value: config.brushSize },
    uBrushStrength: { value: config.brushStrength },
    uFluidDecay: { value: config.fluidDecay },
    uTrailLength: { value: config.trailLength },
    uStopDecay: { value: config.stopDecay },
  }), [config]);

  const displayUniforms = useMemo((): DisplayUniforms => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iFluid: { value: null },
    uDistortionAmount: { value: config.distortionAmount },
    uColor1: { value: hexToVector3(config.colors.color1!) },
    uColor2: { value: hexToVector3(config.colors.color2!) },
    uColor3: { value: hexToVector3(config.colors.color3!) },
    uColor4: { value: hexToVector3(config.colors.color4!) },
    uColorIntensity: { value: config.colorIntensity },
    uSoftness: { value: config.softness },
  }), [config]);

  // Initialize WebGL scene
  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(config.pixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create render targets for ping-pong
    const renderTarget1 = createRenderTarget(width, height, config.pixelRatio);
    const renderTarget2 = createRenderTarget(width, height, config.pixelRatio);
    renderTargetsRef.current = [renderTarget1, renderTarget2];

    // Fluid simulation material
    const fluidMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fluidShader,
      uniforms: fluidUniforms,
    });
    fluidMaterialRef.current = fluidMaterial;

    // Display material
    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayShader,
      uniforms: displayUniforms,
    });
    displayMaterialRef.current = displayMaterial;

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Mesh for fluid simulation
    const fluidMesh = new THREE.Mesh(geometry, fluidMaterial);
    scene.add(fluidMesh);

    // Mesh for display (will be swapped)
    const displayMesh = new THREE.Mesh(geometry, displayMaterial);
    scene.add(displayMesh);

    // Initially hide display mesh
    displayMesh.visible = false;
    fluidMesh.visible = true;

    return { scene, camera, renderer, geometry, fluidMesh, displayMesh };
  }, [config.pixelRatio, fluidUniforms, displayUniforms]);

  // Handle mouse events
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!config.enableMouse || !mountRef.current) return;

    const { x, y } = getMousePosition(event, mountRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    mouseRef.current.prevX = mouseRef.current.x;
    mouseRef.current.prevY = mouseRef.current.y;
    mouseRef.current.x = (x + 1) * 0.5 * width;
    mouseRef.current.y = (y + 1) * 0.5 * height;
  }, [config.enableMouse]);

  const handleMouseDown = useCallback(() => {
    if (config.enableMouse) {
      mouseRef.current.isPressed = true;
    }
  }, [config.enableMouse]);

  const handleMouseUp = useCallback(() => {
    if (config.enableMouse) {
      mouseRef.current.isPressed = false;
    }
  }, [config.enableMouse]);

  // Throttled mouse handler for performance
  const throttledMouseMove = useMemo(() => 
    throttle(handleMouseMove, 1000 / config.fps), 
    [handleMouseMove, config.fps]
  );

  // Resize handler
  const handleResize = useCallback(() => {
    if (!rendererRef.current || !renderTargetsRef.current.length) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update renderer
    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(config.pixelRatio);

    // Update render targets
    renderTargetsRef.current.forEach(target => {
      target.setSize(width * config.pixelRatio, height * config.pixelRatio);
    });

    // Update uniforms
    fluidUniforms.iResolution.value.set(width, height);
    displayUniforms.iResolution.value.set(width, height);
  }, [config.pixelRatio, fluidUniforms, displayUniforms]);

  // Animation loop
  const animate = useCallback((time: number) => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    timeRef.current = time * 0.001;
    frameRef.current++;

    // Update fluid uniforms
    if (fluidMaterialRef.current) {
      const uniforms = fluidMaterialRef.current.uniforms;
      uniforms.iTime.value = timeRef.current;
      uniforms.iFrame.value = frameRef.current;

      // Handle mouse input or auto movement
      if (config.enableMouse && mouseRef.current.isPressed) {
        uniforms.iMouse.value.set(
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.prevX,
          mouseRef.current.prevY
        );
      } else if (config.autoMove) {
        const autoPos = generateAutoMovement(
          timeRef.current,
          config.autoMoveSpeed,
          window.innerWidth,
          window.innerHeight
        );
        uniforms.iMouse.value.set(autoPos.x, autoPos.y, autoPos.x, autoPos.y);
      } else {
        uniforms.iMouse.value.set(0, 0, 0, 0);
      }
    }

    // Update display uniforms
    if (displayMaterialRef.current) {
      displayMaterialRef.current.uniforms.iTime.value = timeRef.current;
    }

    // Ping-pong rendering
    const [currentTarget, nextTarget] = renderTargetsRef.current;
    
    // First pass: fluid simulation
    if (fluidMaterialRef.current && currentTarget && nextTarget) {
      fluidMaterialRef.current.uniforms.iPreviousFrame.value = currentTarget.texture;
      
      rendererRef.current.setRenderTarget(nextTarget);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Second pass: display
      if (displayMaterialRef.current) {
        displayMaterialRef.current.uniforms.iFluid.value = nextTarget.texture;
        
        rendererRef.current.setRenderTarget(null);
        
        // Switch to display material
        const fluidMesh = sceneRef.current.children[0] as THREE.Mesh;
        const displayMesh = sceneRef.current.children[1] as THREE.Mesh;
        
        fluidMesh.visible = false;
        displayMesh.visible = true;
        
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        
        // Switch back for next frame
        fluidMesh.visible = true;
        displayMesh.visible = false;
      }
    }

    // Swap render targets
    renderTargetsRef.current = [nextTarget, currentTarget];

    animationIdRef.current = requestAnimationFrame(animate);
  }, [config.enableMouse, config.autoMove, config.autoMoveSpeed]);

  // Effect: Initialize and cleanup
  useEffect(() => {
    const sceneData = initScene();
    if (!sceneData) return;

    // Add event listeners
    if (config.enableMouse) {
      window.addEventListener('mousemove', throttledMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
    }
    window.addEventListener('resize', handleResize);

    // Start animation
    animationIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      // Cleanup WebGL resources
      renderTargetsRef.current.forEach(target => target.dispose());
      if (sceneData.geometry) sceneData.geometry.dispose();
      if (fluidMaterialRef.current) fluidMaterialRef.current.dispose();
      if (displayMaterialRef.current) displayMaterialRef.current.dispose();
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [initScene, throttledMouseMove, handleMouseDown, handleMouseUp, handleResize, animate, config.enableMouse]);

  // Effect: Update uniforms when props change
  useEffect(() => {
    if (displayMaterialRef.current) {
      const uniforms = displayMaterialRef.current.uniforms;
      uniforms.uColor1.value = hexToVector3(config.colors.color1!);
      uniforms.uColor2.value = hexToVector3(config.colors.color2!);
      uniforms.uColor3.value = hexToVector3(config.colors.color3!);
      uniforms.uColor4.value = hexToVector3(config.colors.color4!);
      uniforms.uColorIntensity.value = config.colorIntensity;
      uniforms.uDistortionAmount.value = config.distortionAmount;
      uniforms.uSoftness.value = config.softness;
    }

    if (fluidMaterialRef.current) {
      const uniforms = fluidMaterialRef.current.uniforms;
      uniforms.uBrushSize.value = config.brushSize;
      uniforms.uBrushStrength.value = config.brushStrength;
      uniforms.uFluidDecay.value = config.fluidDecay;
      uniforms.uTrailLength.value = config.trailLength;
      uniforms.uStopDecay.value = config.stopDecay;
    }
  }, [config]);

  return (
    <div
      ref={mountRef}
      className={config.className}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        overflow: 'hidden',
        ...config.style,
      }}
    />
  );
};

export default FluidShader;