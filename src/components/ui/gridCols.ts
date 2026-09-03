/* Column classes capped at the number of cards there actually are.

   The catalogue is the client's, and it changes: four projects open for sale
   one month, one the next. A grid hard-coded to four columns turns that into
   a row with three holes in it, so the section asks for classes here instead
   and gets a layout sized to what it is actually holding. Counts above the
   cap fill the widest grid and wrap. */

const wide: Record<number, string> = {
    1: "max-w-xl",
    2: "sm:grid-cols-2 lg:max-w-4xl",
    3: "sm:grid-cols-2 xl:grid-cols-3",
    4: "sm:grid-cols-2 xl:grid-cols-4",
};

const narrow: Record<number, string> = {
    1: "max-w-xl",
    2: "sm:grid-cols-2 lg:max-w-4xl",
    3: "sm:grid-cols-2 lg:grid-cols-3",
};

export function gridCols(count: number, max: 3 | 4 = 4) {
    const scale = max === 3 ? narrow : wide;
    return scale[Math.min(Math.max(count, 1), max)] ?? scale[max];
}
