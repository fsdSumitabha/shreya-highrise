import NotFound from "@/components/sections/NotFound";

/* The boundary for notFound() thrown anywhere in the website — a /projects
   slug with no project behind it, today. The chrome comes from the group's
   layout, so only the sheet itself is rendered here. Without this file the
   throw would climb to app/not-found.tsx, which brings its own header and
   footer. */

export default NotFound;
