import { BlogPostType } from "./types";

export const pythonConcurrencyPost: BlogPostType = {
  id: 3,
  date: "APR 20, 2025",
  title: "The Birth of Python: How Rossum Cracked Concurrency",
  excerpt: "Most programming languages are designed by computer scientists. Python was designed by someone who loved puzzles and hated bureaucracy. Here's how Guido van Rossum tackled threading, the GIL, and asynchronous event loops.",
  tags: ["PYTHON", "CONCURRENCY", "SYSTEMS"],
  link: "https://medium.com/@visheshjha.in",
  isInternal: false,
  coverImage: "/blog/python-bw-cover.jpg",
  readTime: "5 min read",
  author: {
    name: "Vishesh Jha",
    role: "Product Engineer"
  }
};
