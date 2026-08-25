/** `to` and `suffix` are what <CountUp> renders, animated or not. */
export type Stat = { label: string; note: string; to: number; suffix?: string; decimals?: number };

export const stats: Stat[] = [
    { to: 18, suffix: "+", label: "Years building in Kolkata", note: "Since 2006" },
    { to: 10, label: "Addresses across the city", note: "Four corridors" },
    { to: 1450, label: "Families handed keys", note: "And counting" },
    { to: 1.6, decimals: 1, suffix: "M", label: "Sq. ft. developed", note: "Residential & mixed use" },
];
