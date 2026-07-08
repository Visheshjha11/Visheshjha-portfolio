// Re-exporting blog posts
import { BlogPostType } from "./types";
import { nvidiaPost } from "./nvidia";
import { typingPlatformPost } from "./typingPlatform";
import { pythonConcurrencyPost } from "./pythonConcurrency";
import { reactVsNextPost } from "./reactVsNext";

export type { BlogPostType };

export const BLOG_POSTS: BlogPostType[] = [
  nvidiaPost,
  typingPlatformPost,
  pythonConcurrencyPost,
  reactVsNextPost
];
