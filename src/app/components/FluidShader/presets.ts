import { FluidShaderProps } from './types';

// Color presets matching your reference image
export const BLUE_LAVA_PRESET: FluidShaderProps = {
  colors: {
    color1: '#4f46e5', // Deep blue
    color2: '#7c3aed', // Purple-blue
    color3: '#2563eb', // Bright blue
    color4: '#1e40af', // Royal blue
  },
  colorIntensity: 1.3,
  distortionAmount: 1.2,
  softness: 6.0,
  brushSize: 45.0,
  brushStrength: 1.2,
  fluidDecay: 0.985,
  trailLength: 0.99,
  autoMove: true,
  autoMoveSpeed: 0.4,
};

// Alternative color schemes
export const PURPLE_PLASMA_PRESET: FluidShaderProps = {
  colors: {
    color1: '#8b5cf6', // Purple
    color2: '#a855f7', // Light purple
    color3: '#c084fc', // Lavender
    color4: '#e879f9', // Pink
  },
  colorIntensity: 1.4,
  distortionAmount: 1.5,
  softness: 4.0,
  brushSize: 60.0,
  brushStrength: 0.8,
  fluidDecay: 0.99,
  trailLength: 0.995,
};

export const OCEAN_DEPTHS_PRESET: FluidShaderProps = {
  colors: {
    color1: '#0c4a6e', // Deep ocean blue
    color2: '#0369a1', // Ocean blue
    color3: '#0284c7', // Sky blue
    color4: '#06b6d4', // Cyan
  },
  colorIntensity: 1.1,
  distortionAmount: 0.8,
  softness: 8.0,
  brushSize: 70.0,
  brushStrength: 1.5,
  fluidDecay: 0.995,
  trailLength: 0.998,
};

export const AURORA_PRESET: FluidShaderProps = {
  colors: {
    color1: '#059669', // Green
    color2: '#0891b2', // Teal
    color3: '#7c3aed', // Purple
    color4: '#db2777', // Pink
  },
  colorIntensity: 1.6,
  distortionAmount: 2.0,
  softness: 3.0,
  brushSize: 40.0,
  brushStrength: 2.0,
  fluidDecay: 0.98,
  trailLength: 0.99,
};

export const FIRE_PRESET: FluidShaderProps = {
  colors: {
    color1: '#dc2626', // Red
    color2: '#ea580c', // Orange
    color3: '#f59e0b', // Amber
    color4: '#eab308', // Yellow
  },
  colorIntensity: 1.8,
  distortionAmount: 1.8,
  softness: 2.0,
  brushSize: 35.0,
  brushStrength: 1.8,
  fluidDecay: 0.975,
  trailLength: 0.985,
};

export const COSMIC_PRESET: FluidShaderProps = {
  colors: {
    color1: '#1e1b4b', // Deep space blue
    color2: '#581c87', // Deep purple
    color3: '#be185d', // Magenta
    color4: '#f97316', // Orange
  },
  colorIntensity: 2.0,
  distortionAmount: 2.5,
  softness: 1.0,
  brushSize: 30.0,
  brushStrength: 2.5,
  fluidDecay: 0.97,
  trailLength: 0.98,
};

// Performance presets
export const HIGH_PERFORMANCE: Partial<FluidShaderProps> = {
  pixelRatio: 0.5,
  fps: 30,
  brushSize: 80.0,
  fluidDecay: 0.98,
};

export const ULTRA_QUALITY: Partial<FluidShaderProps> = {
  pixelRatio: 2,
  fps: 120,
  brushSize: 25.0,
  fluidDecay: 0.999,
};

// Interaction presets
export const MOUSE_ONLY: Partial<FluidShaderProps> = {
  enableMouse: true,
  autoMove: false,
  brushStrength: 2.0,
};

export const AUTO_ONLY: Partial<FluidShaderProps> = {
  enableMouse: false,
  autoMove: true,
  autoMoveSpeed: 0.6,
};

export const INTERACTIVE: Partial<FluidShaderProps> = {
  enableMouse: true,
  autoMove: true,
  autoMoveSpeed: 0.2,
  brushStrength: 1.5,
};