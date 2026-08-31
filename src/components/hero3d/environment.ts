import * as THREE from "three";
import { PALETTE } from "./config";

/* A studio, built in code.

   Dark glass is only as good as what it has to reflect, and an unlit navy box
   reflecting nothing reads as plastic. This assembles a small room — graded
   dome, one cool key card, one champagne bounce, a dark floor — and pushes it
   through PMREM to get a proper roughness-aware environment.

   Procedural rather than an HDRI because the hero must not wait on a network
   request, and because the reflections then sit exactly on the brand palette. */

const domeVert = /* glsl */ `
varying vec3 vDir;
void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const domeFrag = /* glsl */ `
uniform vec3 uSky;
uniform vec3 uHorizon;
uniform vec3 uGround;
varying vec3 vDir;

void main() {
    float h = normalize(vDir).y;
    // Tight band of lift at the horizon, falling away hard in both directions.
    vec3 c = mix(uGround, uHorizon, smoothstep(-0.35, 0.0, h));
    c = mix(c, uSky, smoothstep(0.0, 0.55, h));
    gl_FragColor = vec4(c, 1.0);
    #include <colorspace_fragment>
}
`;

function lightCard(color: number, intensity: number, size: [number, number], place: (m: THREE.Mesh) => void) {
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(size[0], size[1]),
        new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
    );
    mesh.material.color.multiplyScalar(intensity);
    place(mesh);
    return mesh;
}

export function createStudioEnvironment(renderer: THREE.WebGLRenderer) {
    const scene = new THREE.Scene();

    const dome = new THREE.Mesh(
        new THREE.SphereGeometry(40, 24, 16),
        new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            vertexShader: domeVert,
            fragmentShader: domeFrag,
            uniforms: {
                uSky: { value: new THREE.Color(PALETTE.void) },
                uHorizon: { value: new THREE.Color(0x24506f) },
                uGround: { value: new THREE.Color(0x040c15) },
            },
        }),
    );
    scene.add(dome);

    // Key: a tall cool card, high and to the camera's right.
    scene.add(
        lightCard(0xbcd2e8, 2.6, [26, 34], (m) => {
            m.position.set(22, 14, 16);
            m.lookAt(0, 8, 0);
        }),
    );
    // Fill: broad, dim, opposite side — keeps the dark face from going flat.
    scene.add(
        lightCard(0x2e5b7d, 0.9, [30, 26], (m) => {
            m.position.set(-24, 10, -8);
            m.lookAt(0, 8, 0);
        }),
    );
    // Champagne bounce, low and small. The only warm thing in the room.
    scene.add(
        lightCard(PALETTE.champagne300, 1.15, [16, 7], (m) => {
            m.position.set(-6, 1.5, 20);
            m.lookAt(0, 5, 0);
        }),
    );

    const pmrem = new THREE.PMREMGenerator(renderer);
    // Sigma stays small: past ~0.02 three warns that the blur wants more
    // samples than the mip chain has, and clips it anyway.
    const target = pmrem.fromScene(scene, 0.02, 0.1, 100);
    pmrem.dispose();

    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            (object.material as THREE.Material).dispose();
        }
    });

    return { texture: target.texture, dispose: () => target.dispose() };
}
