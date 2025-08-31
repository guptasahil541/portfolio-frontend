'use client';

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';

import { vertexShader, fluidShader, displayShader } from '@/utility/shaders';
import { hexToVector3, createRenderTarget } from '@/utility/threejs';

import {
    FluidGradientBackgroundProps,
    FluidUniforms,
    DisplayUniforms,
} from './types';

import styles from '@/styles/components/ui/FluidGradientBackground/FluidGradientBackground.module.css';

import { DEFAULT_PRESET } from './FluidBackgroundPresets';

export const FluidGradientBackground: React.FC<FluidGradientBackgroundProps> = (
    props
) => {
    const config = useMemo(() => ({ ...DEFAULT_PRESET, ...props }), [props]);

    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>(null);
    const cameraRef = useRef<THREE.OrthographicCamera>(null);
    const rendererRef = useRef<THREE.WebGLRenderer>(null);
    const fluidMaterialRef = useRef<THREE.ShaderMaterial>(null);
    const displayMaterialRef = useRef<THREE.ShaderMaterial>(null);
    const renderTargetsRef = useRef<THREE.WebGLRenderTarget[]>([]);
    const frameRef = useRef(0);
    const timeRef = useRef(0);
    const animationIdRef = useRef<number>(null);

    // Memoized uniforms
    const fluidUniforms = useMemo(
        (): FluidUniforms => ({
            iTime: { value: 0 },
            iResolution: {
                value: new THREE.Vector2(1920, 1080),
            },
            iFrame: { value: 0 },
            iPreviousFrame: { value: null },
        }),
        [config]
    );

    // Update resolution when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            fluidUniforms.iResolution.value.set(
                window.innerWidth,
                window.innerHeight
            );
        }
    }, [fluidUniforms]);

    const displayUniforms = useMemo(
        (): DisplayUniforms => ({
            iTime: { value: 0 },
            iResolution: {
                value: new THREE.Vector2(1920, 1080),
            },
            iFluid: { value: null },
            uColor1: { value: hexToVector3(config.colors.color1!) },
            uColor2: { value: hexToVector3(config.colors.color2!) },
            uColor3: { value: hexToVector3(config.colors.color3!) },
            uColor4: { value: hexToVector3(config.colors.color4!) },
            uColorIntensity: { value: config.colorIntensity },
        }),
        [config]
    );

    // Update resolution when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            displayUniforms.iResolution.value.set(
                window.innerWidth,
                window.innerHeight
            );
        }
    }, [displayUniforms]);

    // Initialize WebGL scene
    const initScene = useCallback(() => {
        if (!containerRef.current) return;

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
            powerPreference: 'high-performance',
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(config.pixelRatio);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create render targets for ping-pong
        const renderTarget1 = createRenderTarget(
            width,
            height,
            config.pixelRatio
        );
        const renderTarget2 = createRenderTarget(
            width,
            height,
            config.pixelRatio
        );
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

    // Resize handler
    const handleResize = useCallback(() => {
        if (!rendererRef.current || !renderTargetsRef.current.length) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Update renderer
        rendererRef.current.setSize(width, height);
        rendererRef.current.setPixelRatio(config.pixelRatio);

        // Update render targets
        renderTargetsRef.current.forEach((target) => {
            target.setSize(
                width * config.pixelRatio,
                height * config.pixelRatio
            );
        });

        // Update uniforms
        fluidUniforms.iResolution.value.set(width, height);
        displayUniforms.iResolution.value.set(width, height);
    }, [config.pixelRatio, fluidUniforms, displayUniforms]);

    // Animation loop
    const animate = useCallback((time: number) => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current)
            return;

        timeRef.current = time * 0.001;
        frameRef.current++;

        // Update fluid uniforms
        if (fluidMaterialRef.current) {
            const uniforms = fluidMaterialRef.current.uniforms;
            uniforms.iTime.value = timeRef.current;
            uniforms.iFrame.value = frameRef.current;
        }

        // Update display uniforms
        if (displayMaterialRef.current) {
            displayMaterialRef.current.uniforms.iTime.value = timeRef.current;
        }

        // Ping-pong rendering
        const [currentTarget, nextTarget] = renderTargetsRef.current;

        // First pass: fluid simulation
        if (fluidMaterialRef.current && currentTarget && nextTarget) {
            fluidMaterialRef.current.uniforms.iPreviousFrame.value =
                currentTarget.texture;

            rendererRef.current.setRenderTarget(nextTarget);
            rendererRef.current.render(sceneRef.current, cameraRef.current);

            // Second pass: display
            if (displayMaterialRef.current) {
                displayMaterialRef.current.uniforms.iFluid.value =
                    nextTarget.texture;

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
    }, []);

    // Effect: Initialize and cleanup
    useEffect(() => {
        const sceneData = initScene();
        if (!sceneData) return;

        window.addEventListener('resize', handleResize);

        // Start animation
        animationIdRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            window.removeEventListener('resize', handleResize);

            // Cleanup WebGL resources
            renderTargetsRef.current.forEach((target) => target.dispose());
            if (sceneData.geometry) sceneData.geometry.dispose();
            if (fluidMaterialRef.current) fluidMaterialRef.current.dispose();
            if (displayMaterialRef.current)
                displayMaterialRef.current.dispose();
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(
                    rendererRef.current.domElement
                );
                rendererRef.current.dispose();
            }
        };
    }, [initScene, handleResize, animate]);

    // Effect: Update uniforms when props change
    useEffect(() => {
        if (displayMaterialRef.current) {
            const uniforms = displayMaterialRef.current.uniforms;
            uniforms.uColor1.value = hexToVector3(config.colors.color1!);
            uniforms.uColor2.value = hexToVector3(config.colors.color2!);
            uniforms.uColor3.value = hexToVector3(config.colors.color3!);
            uniforms.uColor4.value = hexToVector3(config.colors.color4!);
            uniforms.uColorIntensity.value = config.colorIntensity;
        }
    }, [config]);

    return (
        <div
            ref={containerRef}
            className={styles.fluid_gradient_background_container}
        />
    );
};
