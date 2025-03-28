"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BlogPostForm from '@/components/admin/BlogPostForm';
import { type Photo, type BlogPost } from '@/lib/data';

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the blog post
        const postResponse = await fetch(`/api/blogposts/${params.id}`);
        
        if (!postResponse.ok) {
          if (postResponse.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error(`Failed to fetch blog post: ${postResponse.status}`);
        }
        
        const postData = await postResponse.json();
        setBlogPost(postData.post);
        
        // Fetch photos for the form
        const photosResponse = await fetch('/api/photos');
        
        if (photosResponse.ok) {
          const photosData = await photosResponse.json();
          setPhotos(photosData.photos || []);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error('Error fetching data:', err);
        toast.error(err.message || 'Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params.id]);
  
  const handleSubmit = async (data: Partial<BlogPost>) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/blogposts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      toast.success('Blog post updated successfully');
      router.push('/admin/dashboard/blog');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update blog post');
      console.error('Error updating blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }
  
  if (error || !blogPost) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
        <div className="bg-red-900/20 border border-red-900 rounded-md p-6 text-center">
          <p className="text-red-200 mb-4">{error || 'Blog post not found'}</p>
          <button
            onClick={() => router.push('/admin/dashboard/blog')}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded"
          >
            Go Back to Blog Posts
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
      
      <BlogPostForm
        initialData={blogPost}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        photos={photos}
      />
    </div>
  );
} 