import { blogPosts } from '@/lib/data';
import EditBlogPostClient from './EditBlogPostClient';

// Generate static params for all blog post IDs
export function generateStaticParams() {
  return blogPosts.map(post => ({
    id: post.id,
  }));
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  return <EditBlogPostClient params={params} />;
} 