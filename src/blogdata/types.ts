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
}
