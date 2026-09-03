import type { ReactNode } from "react";

/* Outside the (site) group on purpose — no header, no footer, no floating
   call bar. Just the landmark the chrome used to provide, so the page still
   has a <main> to be. */

export default function InternalLayout({ children }: { children: ReactNode }) {
    return <main className="flex-1">{children}</main>;
}
