import React from "react";

export interface BlogPostType {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  link: string;
  isInternal?: boolean;
  /** If set, the on-site article is shown as a preview and the rest is gated behind this Medium link. */
  mediumUrl?: string;
  content?: React.ReactNode;
  coverImage?: string;
  readTime?: string;
  featured?: boolean;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}
