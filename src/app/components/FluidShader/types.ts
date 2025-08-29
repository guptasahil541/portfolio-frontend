import * as THREE from 'three';

export interface FluidShaderProps {
  // Visual Properties
  colors?: {
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
  };
  colorIntensity?: number;
  distortionAmount?: number;
  softness?: number;
  
  // Fluid Physics
  brushSize?: number;
  brushStrength?: number;
  fluidDecay?: number;
  trailLength?: number;
  stopDecay?: number;
  
  // Interaction
  enableMouse?: boolean;
  autoMove?: boolean;
  autoMoveSpeed?: number;
  
  // Performance
  pixelRatio?: number;
  fps?: number;
  
  // Style
  className?: string;
  style?: React.CSSProperties;
}

export interface FluidUniforms {
  // Fluid simulation uniforms
  iTime: { value: number };
  iResolution: { value: THREE.Vector2 };
  iMouse: { value: THREE.Vector4 };
  iFrame: { value: number };
  iPreviousFrame: { value: THREE.Texture | null };
  uBrushSize: { value: number };
  uBrushStrength: { value: number };
  uFluidDecay: { value: number };
  uTrailLength: { value: number };
  uStopDecay: { value: number };
}

export interface DisplayUniforms {
  // Display shader uniforms
  iTime: { value: number };
  iResolution: { value: THREE.Vector2 };
  iFluid: { value: THREE.Texture | null };
  uDistortionAmount: { value: number };
  uColor1: { value: THREE.Vector3 };
  uColor2: { value: THREE.Vector3 };
  uColor3: { value: THREE.Vector3 };
  uColor4: { value: THREE.Vector3 };
  uColorIntensity: { value: number };
  uSoftness: { value: number };
}

export const DEFAULT_PROPS: Required<FluidShaderProps> = {
  colors: {
    color1: '#4f46e5', // Deep blue
    color2: '#7c3aed', // Purple-blue
    color3: '#2563eb', // Bright blue
    color4: '#1e40af', // Royal blue
  },
  colorIntensity: 1.2,
  distortionAmount: 1.0,
  softness: 5.0,
  brushSize: 50.0,
  brushStrength: 1.0,
  fluidDecay: 0.99,
  trailLength: 0.995,
  stopDecay: 0.8,
  enableMouse: true,
  autoMove: true,
  autoMoveSpeed: 0.3,
  pixelRatio: 1,
  fps: 60,
  className: '',
  style: {},
};