import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import { format } from 'date-fns';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';

// Generate static params for blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="pt-20 pb-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/news" 
              className="inline-flex items-center text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to News
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto bg-zinc-900 rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog Post Not Found</h1>
            <div className="h-1 w-24 bg-zinc-700 mx-auto mb-8"></div>
            
            <p className="text-zinc-300 text-lg mb-6 text-center">
              The blog post you're looking for could not be found.
            </p>
            
            <div className="text-center">
              <Link
                href="/news"
                className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
              >
                Return to News
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/news" 
            className="inline-flex items-center text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to News
          </Link>
        </div>
        
        <article className="max-w-4xl mx-auto bg-zinc-900 rounded-lg p-8 shadow-lg">
          <div className="flex items-center text-zinc-400 text-sm mb-4">
            <FiCalendar className="mr-2" />
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
          
          {post.image && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          
          <div className="prose prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <h2 className="text-lg font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
} 