"use client";

import { BUILDING } from "./config";

/* No WebGL2, or a context that has gone away.

   Not a placeholder: the same tower, drawn as a north elevation on the same
   grid and palette, with its dimension run and level marks intact. A visitor
   who lands here should think the studio chose to show a drawing — because at
   that point a drawing is the honest thing to show. */

const FLOORS = BUILDING.floors;
const TOP = 96;
const BASE = 548;
const LEFT = 68;
const RIGHT = 198;
const RUN = (BASE - TOP) / FLOORS;

const NAVY = "#1d3a56";
const CHAMPAGNE = "#c8a96b";

export default function HeroFallback() {
    const floorLines = Array.from({ length: FLOORS - 1 }, (_, i) => BASE - (i + 1) * RUN);
    const mullions = Array.from({ length: 6 }, (_, i) => LEFT + ((i + 1) * (RIGHT - LEFT)) / 7);

    return (
        <div className="hero3d-fallback" aria-hidden="true">
            <svg viewBox="0 0 266 620" fill="none" preserveAspectRatio="xMidYMax meet">
                <defs>
                    <linearGradient id="hero3d-body" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#0f2439" />
                        <stop offset="0.62" stopColor="#0b1f33" />
                        <stop offset="1" stopColor="#071523" />
                    </linearGradient>
                </defs>

                {/* Grade and site line. */}
                <line x1="0" y1="596" x2="266" y2="596" stroke={CHAMPAGNE} strokeOpacity="0.3" />
                <line x1="14" y1="574" x2="252" y2="574" stroke={NAVY} strokeOpacity="0.7" />

                {/* Podium. */}
                <rect x="34" y="548" width="198" height="48" fill="#0d2338" />
                <rect x="34" y="548" width="198" height="48" stroke={NAVY} strokeOpacity="0.9" fill="none" />

                {/* Tower. */}
                <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={BASE - TOP} fill="url(#hero3d-body)" />
                {floorLines.map((y, i) => (
                    <line
                        key={y}
                        x1={LEFT}
                        y1={y}
                        x2={RIGHT}
                        y2={y}
                        stroke={i % 6 === 5 ? CHAMPAGNE : NAVY}
                        strokeOpacity={i % 6 === 5 ? 0.42 : 0.55}
                    />
                ))}
                {mullions.map((x) => (
                    <line key={x} x1={x} y1={TOP} x2={x} y2={BASE} stroke={NAVY} strokeOpacity="0.55" />
                ))}
                <rect
                    x={LEFT}
                    y={TOP}
                    width={RIGHT - LEFT}
                    height={BASE - TOP}
                    stroke={CHAMPAGNE}
                    strokeOpacity="0.42"
                    fill="none"
                />

                {/* Crown: parapet, plant enclosure, setback, mast. */}
                <rect x={LEFT - 4} y={TOP - 10} width={RIGHT - LEFT + 8} height="10" fill="#12293e" />
                <rect x={LEFT + 18} y={TOP - 34} width={RIGHT - LEFT - 36} height="24" fill="#0f2336" />
                <rect x={LEFT + 44} y={TOP - 50} width={RIGHT - LEFT - 88} height="16" fill="#12293e" />
                <line
                    x1={(LEFT + RIGHT) / 2}
                    y1={TOP - 50}
                    x2={(LEFT + RIGHT) / 2}
                    y2={TOP - 76}
                    stroke={CHAMPAGNE}
                    strokeOpacity="0.6"
                />
                <circle cx={(LEFT + RIGHT) / 2} cy={TOP - 78} r="2.4" fill={CHAMPAGNE} fillOpacity="0.75" />

                {/* Dimension run. */}
                <line x1="30" y1={TOP} x2="30" y2={BASE} stroke={CHAMPAGNE} strokeOpacity="0.35" />
                {[TOP, BASE].map((y) => (
                    <g key={y} stroke={CHAMPAGNE} strokeOpacity="0.5">
                        <line x1="25" y1={y - 5} x2="35" y2={y + 5} />
                        <line x1="36" y1={y} x2={LEFT - 6} y2={y} strokeOpacity="0.22" />
                    </g>
                ))}

                {/* Level marks. */}
                {[12, 24, 36].map((level) => {
                    const y = BASE - level * RUN;
                    return (
                        <g key={level}>
                            <line
                                x1={RIGHT + 4}
                                y1={y}
                                x2={RIGHT + 40}
                                y2={y}
                                stroke={CHAMPAGNE}
                                strokeOpacity="0.4"
                            />
                            <text
                                x={RIGHT + 44}
                                y={y + 3}
                                fill="#8fa4ba"
                                fillOpacity="0.7"
                                fontSize="8"
                                letterSpacing="2.2">
                                L{level}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
