"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, type BlogPost } from '@/lib/data';
import Image from 'next/image';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { isStaticExport } from '@/lib/static-data';
import { Components } from 'react-markdown';

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
  const [imagePath, setImagePath] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // If no matching post is found, show 404
  if (!post) {
    notFound();
  }
  
  useEffect(() => {
    // Initialize image path
    if (post.coverImage) {
      setImagePath(post.coverImage);
    }
    
    // Fix image paths for GitHub Pages if needed
    const fixGitHubPaths = () => {
      if (typeof window === 'undefined') return;
      
      const isGitHub = isStaticExport();
      
      if (isGitHub && post.coverImage && post.coverImage.startsWith('/') && 
          !post.coverImage.startsWith('/Barelands/')) {
        const fixedPath = `/Barelands${post.coverImage}`;
        console.log(`Blog: Setting GitHub Pages image path: ${fixedPath}`);
        setImagePath(fixedPath);
      }
    };
    
    fixGitHubPaths();
    setIsLoaded(true);
  }, [post.coverImage]);
  
  // Custom renderer for image components to handle GitHub Pages paths
  const customComponents: Components = {
    img: ({ src, alt }) => {
      // Handle relative image paths for GitHub Pages
      let imageSrc = src;
      if (typeof window !== 'undefined') {
        const isGitHub = isStaticExport();
        
        if (isGitHub && src?.startsWith('/') && !src.startsWith('/Barelands/')) {
          imageSrc = `/Barelands${src}`;
        }
      }
      
      return (
        <div className="my-6 relative">
          <img src={imageSrc} alt={alt} className="rounded-lg w-full" />
        </div>
      );
    },
    h1: ({children}) => <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>,
    p: ({children}) => <p className="my-4 text-zinc-300">{children}</p>,
    ul: ({children}) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
    li: ({children}) => <li className="my-1 text-zinc-300">{children}</li>,
    a: ({href, children}) => <a href={href} className="text-blue-400 hover:underline">{children}</a>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-zinc-700 pl-4 italic my-6">{children}</blockquote>
    ),
    code: ({node, className, children}) => {
      const match = /language-(\w+)/.exec(className || '');
      const isCodeBlock = match && match[1];
      
      return isCodeBlock ? (
        <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto my-6">
          <code className={className}>{children}</code>
        </pre>
      ) : (
        <code className="bg-zinc-800 px-1 py-0.5 rounded text-sm">{children}</code>
      );
    }
  };
  
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
        
        <article className="max-w-4xl mx-auto bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
          {imagePath && isLoaded && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={imagePath}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-zinc-400 text-sm mb-8">
              <span className="mr-4">{format(new Date(post.date), 'MMMM d, yyyy')}</span>
              <span>{post.author}</span>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={customComponents}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
} 