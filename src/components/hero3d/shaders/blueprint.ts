/* The drawing. One LineSegments geometry carries the whole set — site
   boundary, footprint, column grid, floor outlines, elevation markers,
   dimension runs — so the entire CAD layer is a single draw call.

   Per-vertex attributes decide when a line is inked and how loud it is:

     aLevel   normalised height, so the drawing is laid down from the ground up
     aTone    0 navy, 1 champagne
     aWeight  base opacity, for hierarchy between primary and secondary lines

   Deliberately not tone-mapped. Linework should read as ink on a drawing, at
   exactly the brand colour, rather than as a lit surface. */

export const blueprintVert = /* glsl */ `
#include <common>
#include <fog_pars_vertex>

attribute float aLevel;
attribute float aTone;
attribute float aWeight;

varying float vLevel;
varying float vTone;
varying float vWeight;

void main() {
    vLevel = aLevel;
    vTone = aTone;
    vWeight = aWeight;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    #include <fog_vertex>
}
`;

export const blueprintFrag = /* glsl */ `
#include <common>
#include <fog_pars_fragment>

uniform vec3 uNavy;
uniform vec3 uChampagne;
uniform float uDraw;
uniform float uFade;
uniform float uOpacity;

varying float vLevel;
varying float vTone;
varying float vWeight;

void main() {
    // The varying interpolates along each segment, so a vertical guide inks
    // itself from the bottom up rather than blinking on whole.
    float draw = smoothstep(vLevel - 0.14, vLevel + 0.01, uDraw);
    float alpha = vWeight * uFade * uOpacity * draw;
    if (alpha < 0.002) discard;

    gl_FragColor = vec4(mix(uNavy, uChampagne, vTone), alpha);

    #include <colorspace_fragment>
    #include <fog_fragment>
}
`;
