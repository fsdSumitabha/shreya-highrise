/* Reading progress across the whole document. <MotionRoot> keeps
   --scroll-progress up to date on <html>; this is only the paint. */
export default function ScrollProgress() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.5">
            <div className="scroll-progress h-full bg-linear-to-r from-champagne-400 via-champagne-300 to-champagne-100" />
        </div>
    );
}
