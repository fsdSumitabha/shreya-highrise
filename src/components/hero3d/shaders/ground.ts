/* The site. A single plane carrying a procedural survey grid — a few
   thousand lines would be a few thousand draw calls' worth of geometry for
   something a fragment shader resolves exactly, at any distance, with
   derivative-based anti-aliasing and no moire in the deep field. */

export const groundVert = /* glsl */ `
#include <common>
#include <fog_pars_vertex>

varying vec3 vWorld;

void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;

    vec4 mvPosition = viewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;

    #include <fog_vertex>
}
`;

export const groundFrag = /* glsl */ `
#include <common>
#include <fog_pars_fragment>

uniform vec3 uNavy;
uniform vec3 uChampagne;
uniform float uReveal;
uniform float uSiteRadius;

varying vec3 vWorld;

/* One anti-aliased grid at a given module. fwidth gives the footprint of the
   pixel in grid space, so lines stay a pixel wide however oblique the view. */
float gridMask(vec2 p, float spacing, float thickness) {
    vec2 q = p / spacing;
    vec2 grid = abs(fract(q - 0.5) - 0.5) / fwidth(q);
    return 1.0 - clamp(min(grid.x, grid.y) / thickness, 0.0, 1.0);
}

void main() {
    vec2 p = vWorld.xz;
    float r = length(p);

    float fine = gridMask(p, 1.0, 1.0);
    float major = gridMask(p, 5.0, 1.5);

    // Two-stage falloff: readable across the site, dissolving into the haze
    // well before the plane's own edge can ever be seen.
    float fade = (1.0 - smoothstep(24.0, 76.0, r)) * (0.45 + 0.55 * (1.0 - smoothstep(2.0, 30.0, r)));

    // Champagne is spent only on the plot itself.
    float site = 1.0 - smoothstep(uSiteRadius * 0.55, uSiteRadius, r);

    float alpha = (fine * 0.15 + major * 0.34) * fade * uReveal;
    // A faint pool of light where the tower meets the ground.
    alpha += exp(-r * r / 46.0) * 0.05 * uReveal;
    if (alpha < 0.002) discard;

    gl_FragColor = vec4(mix(uNavy, uChampagne, site * 0.5), alpha);

    #include <colorspace_fragment>
    #include <fog_fragment>
}
`;

/* A soft dark pool under the tower. Cheaper and calmer than a shadow map, and
   it never has to reckon with instances the build shader has collapsed away. */
export const contactVert = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const contactFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;

void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float d = length(vec2(p.x, p.y * 1.25));
    float a = pow(clamp(1.0 - d, 0.0, 1.0), 2.2) * uOpacity;
    if (a < 0.002) discard;
    gl_FragColor = vec4(uColor, a);
}
`;
