import * as THREE from 'three';

/**
 * Convert hex color to THREE.Vector3
 */
export const hexToVector3 = (hex: string): THREE.Vector3 => {
  const color = new THREE.Color(hex);
  return new THREE.Vector3(color.r, color.g, color.b);
};

/**
 * Create render target with proper settings
 */
export const createRenderTarget = (
  width: number, 
  height: number, 
  pixelRatio: number = 1
): THREE.WebGLRenderTarget => {
  return new THREE.WebGLRenderTarget(
    width * pixelRatio,
    height * pixelRatio,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      stencilBuffer: false,
      depthBuffer: false,
    }
  );
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Get mouse position in normalized coordinates
 */
export const getMousePosition = (
  event: MouseEvent,
  element: HTMLElement
): { x: number; y: number } => {
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  return { x, y };
};

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation
 */
export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

/**
 * Smooth step function
 */
export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Generate auto-movement path
 */
export const generateAutoMovement = (
  time: number, 
  speed: number, 
  width: number, 
  height: number
): { x: number; y: number } => {
  const t = time * speed;
  const x = (Math.sin(t * 0.8) * 0.3 + Math.cos(t * 0.5) * 0.2) * width * 0.5 + width * 0.5;
  const y = (Math.cos(t * 0.6) * 0.3 + Math.sin(t * 0.7) * 0.2) * height * 0.5 + height * 0.5;
  return { x, y };
};