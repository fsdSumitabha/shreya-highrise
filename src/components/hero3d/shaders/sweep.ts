/* The work face. A champagne plane that rides up the tower on the highest
   build front, brightest where it meets the slab edge and dissolving outward.
   Kept at a peak alpha in the low tenths: this is a survey band on a working
   floor, not a scanner. */

export const sweepVert = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const sweepFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
uniform vec2 uFootprint;

varying vec2 vUv;

void main() {
    // Distance to the footprint outline, normalised so 1.0 sits on the edge
    // of the slab whatever the plan proportions are.
    vec2 p = abs(vUv - 0.5) * 2.0 / uFootprint;
    float d = max(p.x, p.y);

    float ring = smoothstep(1.28, 0.98, d) * smoothstep(0.62, 0.96, d);
    float fill = (1.0 - smoothstep(0.0, 1.0, d)) * 0.28;

    float a = (ring + fill) * uOpacity;
    if (a < 0.002) discard;
    gl_FragColor = vec4(uColor, a);
}
`;

/* Atmospheric dust. Enough to give the light rig something to sit in, and to
   stop the deep field reading as flat black. Off entirely on mobile. */

export const dustVert = /* glsl */ `
#include <common>

attribute float aSeed;

uniform float uTime;
uniform float uSize;
uniform float uOpacity;
uniform float uSpan;

varying float vAlpha;

void main() {
    vec3 p = position;
    // Wrapped drift, so the field never runs out and never needs respawning.
    p.y = mod(p.y + uTime * (0.05 + aSeed * 0.07), uSpan) - 2.0;
    p.x += sin(uTime * 0.11 + aSeed * 31.0) * 0.7;
    p.z += cos(uTime * 0.09 + aSeed * 23.0) * 0.7;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (0.45 + aSeed) * (24.0 / max(-mvPosition.z, 1.0));
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = (0.18 + 0.82 * aSeed) * uOpacity;
}
`;

export const dustFrag = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.04, d) * vAlpha;
    if (a < 0.004) discard;
    gl_FragColor = vec4(uColor, a);
}
`;
