export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
  tags: string[];
  featured: boolean;
  slug: string;
}

export const blogPosts: BlogPost[] = []; 