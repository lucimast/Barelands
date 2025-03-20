"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';
import PhotoUploadForm from '@/components/PhotoUploadForm';
import AdminPhotoGallery from '@/components/AdminPhotoGallery';
import { Photo } from '@/lib/data';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');

  // Check authentication
  if (status === 'loading') {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  useEffect(() => {
    // Fetch photos when component mounts
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
  }, []);

  // Handle successful photo upload
  const handlePhotoAdded = (newPhoto: Photo) => {
    setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
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
          </div>
        </div>

        {activeTab === 'upload' ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upload New Photo</h2>
            <PhotoUploadForm onPhotoAdded={handlePhotoAdded} />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Photos</h2>
            {isLoading ? (
              <p>Loading photos...</p>
            ) : (
              <AdminPhotoGallery photos={photos} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
