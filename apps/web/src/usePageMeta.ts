import { useEffect } from "react";

// Sets the document <title> and meta description for a route. Runs on the
// client and, because the prerender step (scripts/prerender.ts) snapshots each
// page after it renders, the values are baked into that route's static HTML —
// giving per-route SEO without a runtime head-management dependency.
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (!description) return;
    let tag = document.head.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [title, description]);
}
