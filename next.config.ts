import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    // 75 turns the architects' hairline dimension lines to mush. The sanctioned
    // drawings are served at 90; everything else stays on the default.
    images: { qualities: [75, 90] },
};

export default nextConfig;
