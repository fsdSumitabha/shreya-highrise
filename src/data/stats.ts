/** `to` and `suffix` are what <CountUp> renders, animated or not. */
export type Stat = { label: string; note: string; to: number; suffix?: string; decimals?: number };

export const stats: Stat[] = [
    { to: 10, label: "Years building in Kolkata", note: "Since 2016" },
    { to: 10, suffix: "+", label: "Addresses across the city", note: "Four corridors" },
    { to: 120, suffix: "+", label: "Families handed keys", note: "And counting" },
    { to: 130, suffix: "K+", label: "Sq. ft. built", note: "G+4 co-operative blocks" },
];
