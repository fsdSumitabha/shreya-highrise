/* The hero backdrop: a drawn skyline rather than a photograph.

   Two depth layers — a hazy back row and a near row of lit towers — so the
   parallax in <Hero> has something to separate. Windows are one tiled
   <pattern> instead of a few thousand rects; only the handful that glow are
   drawn individually.

   Every figure below is computed from a plain integer generator, never
   Math.random, so the server and the browser draw the identical skyline and
   hydration stays quiet.

   Colour lives in the .skyline block in globals.css, one set of custom
   properties per theme — daylight towers against an overcast sky, or dusk
   with the lamps coming on. Every paint below therefore goes through inline
   style: an SVG presentation attribute such as fill= or stop-color= cannot
   hold a var(). */

const GROUND = 640;
const CELL_W = 20;
const CELL_H = 28;
const WIN_W = 8;
const WIN_H = 12;
const WIN_X = 6;
const WIN_Y = 8;

type Tower = { x: number; w: number; h: number };

const backRow: Tower[] = [
    { x: -20, w: 90, h: 210 }, { x: 80, w: 60, h: 285 }, { x: 152, w: 110, h: 180 },
    { x: 272, w: 70, h: 325 }, { x: 352, w: 95, h: 240 }, { x: 458, w: 65, h: 300 },
    { x: 534, w: 120, h: 200 }, { x: 664, w: 80, h: 272 }, { x: 754, w: 100, h: 232 },
    { x: 864, w: 70, h: 335 }, { x: 944, w: 112, h: 192 }, { x: 1066, w: 75, h: 292 },
    { x: 1151, w: 95, h: 222 }, { x: 1256, w: 85, h: 312 }, { x: 1351, w: 115, h: 252 },
];

const frontRow: Tower[] = [
    { x: 34, w: 122, h: 356 }, { x: 176, w: 148, h: 296 }, { x: 344, w: 102, h: 430 },
    { x: 466, w: 168, h: 338 },
    { x: 662, w: 128, h: 524 }, { x: 812, w: 128, h: 566 },
    { x: 962, w: 148, h: 378 }, { x: 1132, w: 108, h: 462 }, { x: 1262, w: 162, h: 330 },
];

/** Integer LCG — deterministic on every engine, unlike Math.sin tricks. */
const noise = (seed: number) => ((seed * 1103515245 + 12345) % 2147483648) / 2147483648;

type Light = { x: number; y: number; duration: number; delay: number };

/** Picks the windows that are awake, snapped to the tiled window grid. */
function lightsFor(tower: Tower, seed: number): Light[] {
    const cells: { x: number; y: number }[] = [];
    const firstCol = Math.ceil((tower.x - WIN_X) / CELL_W);
    const lastCol = Math.floor((tower.x + tower.w - WIN_X - WIN_W) / CELL_W);
    const firstRow = Math.ceil((GROUND - tower.h - WIN_Y) / CELL_H);
    const lastRow = Math.floor((GROUND - WIN_Y - WIN_H) / CELL_H);

    for (let col = firstCol; col <= lastCol; col++) {
        for (let row = firstRow; row <= lastRow; row++) {
            cells.push({ x: col * CELL_W + WIN_X, y: row * CELL_H + WIN_Y });
        }
    }
    if (cells.length === 0) return [];

    const count = Math.min(cells.length, 5 + Math.floor(noise(seed) * 5));
    const picked: Light[] = [];
    for (let i = 0; i < count; i++) {
        const roll = noise(seed * 31 + i * 7 + 3);
        const cell = cells[Math.floor(roll * cells.length)];
        if (picked.some((light) => light.x === cell.x && light.y === cell.y)) continue;
        picked.push({
            x: cell.x,
            y: cell.y,
            duration: 4 + Math.round(noise(seed + i * 13) * 60) / 10,
            delay: Math.round(noise(seed * 7 + i * 17) * 70) / 10,
        });
    }
    return picked;
}

export default function Skyline({ className = "", id = "skyline" }: { className?: string; id?: string }) {
    return (
        <svg viewBox={`0 0 1440 ${GROUND}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true"
            className={`skyline ${className}`}>
            <defs>
                <pattern id={`${id}-windows`} width={CELL_W} height={CELL_H} patternUnits="userSpaceOnUse">
                    <rect x={WIN_X} y={WIN_Y} width={WIN_W} height={WIN_H}
                        style={{ fill: "var(--sky-window)", opacity: "var(--sky-window-opacity)" }} />
                </pattern>
                <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: "var(--sky-back-top)", stopOpacity: 0.85 }} />
                    <stop offset="100%" style={{ stopColor: "var(--sky-back-bottom)", stopOpacity: 0.95 }} />
                </linearGradient>
                <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: "var(--sky-front-top)" }} />
                    <stop offset="55%" style={{ stopColor: "var(--sky-front-mid)" }} />
                    <stop offset="100%" style={{ stopColor: "var(--sky-front-bottom)" }} />
                </linearGradient>
                {/* Haze on the horizon — dusk, or an overcast midday — sits behind
                    the towers, not in front of them. */}
                <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: "var(--sky-haze)", stopOpacity: 0 }} />
                    <stop offset="100%"
                        style={{ stopColor: "var(--sky-haze)", stopOpacity: "var(--sky-haze-opacity)" }} />
                </linearGradient>
            </defs>

            <rect x="0" y={GROUND - 420} width="1440" height="420" fill={`url(#${id}-haze)`} />

            <g fill={`url(#${id}-back)`}>
                {backRow.map((tower) => (
                    <rect key={`b-${tower.x}`} x={tower.x} y={GROUND - tower.h} width={tower.w} height={tower.h} />
                ))}
            </g>

            {frontRow.map((tower, i) => (
                <g key={`f-${tower.x}`}>
                    <rect x={tower.x} y={GROUND - tower.h} width={tower.w} height={tower.h}
                        fill={`url(#${id}-front)`} />
                    <rect x={tower.x} y={GROUND - tower.h} width={tower.w} height={tower.h}
                        fill={`url(#${id}-windows)`} />
                    {/* Sunlit roof edge, and the highlight down the lit face. */}
                    <rect x={tower.x} y={GROUND - tower.h} width={tower.w} height="2"
                        style={{ fill: "var(--sky-roof)", opacity: "var(--sky-roof-opacity)" }} />
                    <rect x={tower.x} y={GROUND - tower.h} width="1.5" height={tower.h}
                        style={{ fill: "var(--sky-edge)", opacity: "var(--sky-edge-opacity)" }} />
                    {lightsFor(tower, i + 1).map((light) => (
                        <rect key={`${light.x}-${light.y}`} x={light.x} y={light.y} width={WIN_W} height={WIN_H}
                            className="window-lit"
                            style={{
                                fill: "var(--sky-glint)",
                                "--lit-duration": `${light.duration}s`,
                                "--lit-delay": `${light.delay}s`,
                            } as React.CSSProperties} />
                    ))}
                </g>
            ))}

            {/* Beacons on the twin towers. */}
            {[
                { x: 726, y: GROUND - 524 },
                { x: 876, y: GROUND - 566 },
            ].map((mast) => (
                <g key={mast.x}>
                    <line x1={mast.x} y1={mast.y} x2={mast.x} y2={mast.y - 46} strokeWidth="1.5"
                        style={{ stroke: "var(--sky-mast)", strokeOpacity: 0.5 }} />
                    <circle cx={mast.x} cy={mast.y - 50} r="4" className="window-lit sky-beacon"
                        style={{ fill: "var(--sky-beacon)", "--lit-duration": "3.2s" } as React.CSSProperties} />
                </g>
            ))}
        </svg>
    );
}
