// Server component
import { blogPosts, type BlogPost } from '@/lib/data';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

// Generate static params for blog posts
export function generateStaticParams() {
  // Generate params for all blog posts
  return blogPosts.map(post => ({
    slug: post.id,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the blog post with the matching slug (id)
  const post = blogPosts.find(post => post.id === params.slug);
  
  // If no matching post is found, show 404
  if (!post) {
    notFound();
  }
  
  return <BlogPostClient post={post} />;
} 