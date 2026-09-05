export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  cover: string;
  keywords: string[];
  /** Lightweight markdown: "## " and "### " headings, "- " list items, blank-line separated paragraphs. */
  body: string;
};

export const readingTime = (body: string) =>
  `${Math.max(1, Math.round(body.trim().split(/\s+/).length / 220))} min read`;

export const wordCount = (body: string) => body.trim().split(/\s+/).length;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
