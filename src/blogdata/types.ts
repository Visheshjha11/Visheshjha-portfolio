import React from "react";

export interface BlogPostType {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  link: string;
  isInternal?: boolean;
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
