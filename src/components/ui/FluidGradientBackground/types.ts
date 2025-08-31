import * as THREE from 'three';

export interface FluidGradientBackgroundProps {
    // Visual Properties
    colors?: {
        color1?: string;
        color2?: string;
        color3?: string;
        color4?: string;
    };
    colorIntensity?: number;
    pixelRatio?: number;
    fps?: number;
}

export interface FluidUniforms {
    // Fluid simulation uniforms
    iTime: THREE.IUniform<number>;
    iResolution: THREE.IUniform<THREE.Vector2>;
    iFrame: THREE.IUniform<number>;
    iPreviousFrame: THREE.IUniform<THREE.Texture | null>;

    [uniform: string]: { value: any };
}

export interface DisplayUniforms {
    // Display shader uniforms
    iTime: THREE.IUniform<number>;
    iResolution: THREE.IUniform<THREE.Vector2>;
    iFluid: THREE.IUniform<THREE.Texture | null>;
    uColor1: THREE.IUniform<THREE.Vector3>;
    uColor2: THREE.IUniform<THREE.Vector3>;
    uColor3: THREE.IUniform<THREE.Vector3>;
    uColor4: THREE.IUniform<THREE.Vector3>;
    uColorIntensity: THREE.IUniform<number>;

    [uniform: string]: { value: any };
}
