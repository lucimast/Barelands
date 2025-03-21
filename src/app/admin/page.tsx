"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';
import PhotoUploadForm from '@/components/PhotoUploadForm';
import AdminPhotoGallery from '@/components/AdminPhotoGallery';
import BlogPostForm from '@/components/BlogPostForm';
import { Photo, BlogPost } from '@/lib/data';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Fetch photos when component mounts - keeping this useEffect before any conditional returns
  useEffect(() => {
    // Only fetch if authenticated
    if (status === 'authenticated') {
      const fetchPhotos = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/photos');
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          console.error('Error fetching photos:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPhotos();
    }
  }, [status]);

  // Check authentication
  if (status === 'loading') {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  // Handle successful photo upload
  const handlePhotoAdded = (newPhoto: Photo) => {
    setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
  };

  // Handle successful blog post creation
  const handleBlogPostAdded = (newBlogPost: BlogPost) => {
    setBlogPosts(prevPosts => [newBlogPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Photo
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'manage'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('manage')}
            >
              Manage Photos
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'blog'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('blog')}
            >
              Add Blog Post
            </button>
          </div>
        </div>

        {activeTab === 'upload' ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upload New Photo</h2>
            <PhotoUploadForm onPhotoAdded={handlePhotoAdded} />
          </div>
        ) : activeTab === 'manage' ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Photos</h2>
            {isLoading ? (
              <p>Loading photos...</p>
            ) : (
              <AdminPhotoGallery photos={photos} />
            )}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create Blog Post</h2>
            <p className="text-gray-600 mb-4">Create a new blog post that can optionally be linked to one of your photos.</p>
            {isLoading ? (
              <p>Loading photos...</p>
            ) : (
              <BlogPostForm onBlogPostAdded={handleBlogPostAdded} photos={photos} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
