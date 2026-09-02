/* Theme plumbing shared by the boot script in the root layout and
   <ThemeToggle> in the footer.

   The site opens light no matter what the device prefers — only a reader who
   reaches for the footer toggle gets the dark treatment, and only then is a
   preference stored. Nothing here reads prefers-color-scheme. */

export type Theme = "light" | "dark";

export const THEME_KEY = "shreya-theme";
export const DEFAULT_THEME: Theme = "light";

/* Page background per theme, mirrored into <meta name="theme-color"> so the
   browser chrome on mobile matches the page. Keep in step with the body
   classes in the root layout. */
export const THEME_COLOR: Record<Theme, string> = {
    light: "#f1f5f9",
    dark: "#071523",
};

/* Runs before first paint, ahead of React, straight out of the document.
   Anything that throws here — Safari private mode denying localStorage, most
   likely — leaves the markup's light default in place, which is the intended
   fallback rather than an error worth handling. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t!=="dark"&&t!=="light")return;document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?${JSON.stringify(THEME_COLOR.dark)}:${JSON.stringify(THEME_COLOR.light)})}catch(e){}})();`;
