export interface NewsArticle {
  title: string;
  date: string; // ISO date string for sorting, displayed formatted
  excerpt: string;
  image?: string;
  href: string; // external link or internal route
}

// News items — add new items at the top (newest first).
// Placeholder entries for 2016-2017 news from the telepresence site.
// Fill in the details as you gather them.
export const newsArticles: NewsArticle[] = [
  // ── 2017 ──
  {
    title: "Placeholder: 2017 News Item 3",
    date: "2017-12-01",
    excerpt: "Description of a notable event or achievement from 2017. Replace this with actual content from the telepresence site.",
    href: "#",
  },
  {
    title: "Placeholder: 2017 News Item 2",
    date: "2017-06-01",
    excerpt: "Description of a notable event or achievement from 2017. Replace this with actual content from the telepresence site.",
    href: "#",
  },
  {
    title: "Placeholder: 2017 News Item 1",
    date: "2017-01-15",
    excerpt: "Description of a notable event or achievement from 2017. Replace this with actual content from the telepresence site.",
    href: "#",
  },

  // ── 2016 ──
  {
    title: "Placeholder: 2016 News Item 3",
    date: "2016-12-01",
    excerpt: "Description of a notable event or achievement from 2016. Replace this with actual content from the telepresence site.",
    href: "#",
  },
  {
    title: "Placeholder: 2016 News Item 2",
    date: "2016-06-01",
    excerpt: "Description of a notable event or achievement from 2016. Replace this with actual content from the telepresence site.",
    href: "#",
  },
  {
    title: "Placeholder: 2016 News Item 1",
    date: "2016-01-15",
    excerpt: "Description of a notable event or achievement from 2016. Replace this with actual content from the telepresence site.",
    href: "#",
  },
];
