"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BlogPostForm from '@/components/admin/BlogPostForm';
import { type Photo, type BlogPost } from '@/lib/data';

export default function NewBlogPostPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        if (response.ok) {
          const data = await response.json();
          setPhotos(data.photos || []);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhotos();
  }, []);
  
  const handleSubmit = async (data: Partial<BlogPost>) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/blogposts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      toast.success('Blog post created successfully');
      router.push('/admin/dashboard/blog');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create blog post');
      console.error('Error creating blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Create New Blog Post</h1>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <BlogPostForm
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          photos={photos}
        />
      )}
    </div>
  );
} 