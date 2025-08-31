import * as THREE from 'three';

export const hexToVector3 = (hex: string): THREE.Vector3 => {
    const color = new THREE.Color(hex);
    return new THREE.Vector3(color.r, color.g, color.b);
};

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
