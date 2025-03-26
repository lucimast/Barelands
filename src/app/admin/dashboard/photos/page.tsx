"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiEdit2, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { photos as defaultPhotos, Photo as DataPhoto } from '@/lib/data';
import CloudinaryUploadButton from '@/components/CloudinaryUploadButton';
import { isStaticExport, getStaticPhotoData } from '@/lib/static-data';
import { filterValidPhotos } from '@/lib/storage';

// Use the Photo type from data.ts
type Photo = DataPhoto;

// Define all available categories
const categories = [
  'Mountains',
  'Deserts',
  'Forests',
  'Oceans',
  'Night Sky',
  'Italy',
  'Travel'
].sort();

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [newPhoto, setNewPhoto] = useState<Partial<Photo> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      console.log("Starting to fetch photos...");
      setIsLoading(true);
      let validPhotos: Photo[] = [];
      
      // Check if we're in static export mode
      if (isStaticExport()) {
        // Use static data instead of API
        console.log("Using static photo data");
        validPhotos = await getStaticPhotoData();
      } else {
        // Use API in development mode
        try {
          console.log("Fetching photos from API...");
          const response = await fetch('/api/photos');
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Received data from API:", data);
          
          // Handle both direct array response and object with photos property
          if (Array.isArray(data)) {
            console.log("API returned a direct array");
            validPhotos = filterValidPhotos(data);
          } else if (data && data.success === true && Array.isArray(data.photos)) {
            console.log("Using photos from API response object");
            validPhotos = filterValidPhotos(data.photos);
          } else {
            console.error("API returned invalid data format:", data);
            throw new Error("API returned invalid data format");
          }
          
          console.log("Filtered valid photos:", validPhotos);
        } catch (apiError) {
          console.error('API fetch failed, falling back to static data:', apiError);
          // Fallback to static data even in development if API fails
          validPhotos = await getStaticPhotoData();
        }
      }
      
      if (!validPhotos || validPhotos.length === 0) {
        console.error("No photos loaded, throwing error");
        throw new Error("No photos could be loaded");
      }
      
      console.log(`Loaded ${validPhotos.length} photos`);
      setPhotos(validPhotos);
      setError(null);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError('Failed to load photos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (imageUrl: string) => {
    try {
      console.log('Starting photo upload process with URL:', imageUrl);
      
      // Verify this is a Cloudinary URL
      if (imageUrl.includes('res.cloudinary.com')) {
        console.log('✅ Confirmed Cloudinary URL:', imageUrl);
        
        // Extract some information from the URL for logging
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        console.log('Cloudinary filename:', filename);
        
        // Check if image contains upload folder name
        if (imageUrl.includes('/landscape-photos/')) {
          console.log('✅ Image is in correct Cloudinary folder');
        } else {
          console.log('⚠️ Image might not be in the expected Cloudinary folder');
        }
      } else {
        console.warn('⚠️ This does not appear to be a Cloudinary URL:', imageUrl);
      }
      
      // Create a new photo object
      const photo: Partial<Photo> = {
        id: Date.now().toString(),
        title: 'New Photo',
        description: '',
        image: imageUrl, // This should be the Cloudinary URL
        category: categories[0], // Default to first category
        featured: false,
        location: '',
        dateAdded: new Date().toISOString()
      };
      
      console.log('Created new photo object:', photo);
      
      // Show the edit modal for the new photo
      setNewPhoto(photo);
      setEditingPhoto(photo as Photo);
      
      console.log('Upload process completed successfully');
    } catch (error) {
      console.error('Error in handleUpload:', error);
      alert('Failed to process uploaded photo. Please try again.');
    }
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    try {
      console.log('Starting save process for photo:', editingPhoto);
      
      if (newPhoto) {
        // Add new photo
        console.log('Adding new photo...');
        
        try {
          const response = await fetch('/api/photos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingPhoto)
          });
          
          console.log('API response status:', response.status);
          
          // First check if the response is ok
          if (!response.ok) {
            // Try to parse the error message
            let errorMessage = 'Failed to add photo';
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorMessage;
            } catch (parseError) {
              console.error('Could not parse error response:', parseError);
            }
            throw new Error(errorMessage);
          }
          
          // Then try to parse the response
          let savedPhoto: Photo;
          try {
            const responseText = await response.text();
            console.log('Response text:', responseText);
            
            if (responseText) {
              savedPhoto = JSON.parse(responseText);
              console.log('Photo saved successfully:', savedPhoto);
              setPhotos([...photos, savedPhoto]);
            } else {
              console.error('Empty response received');
              throw new Error('Empty response received from server');
            }
          } catch (parseError) {
            console.error('Error parsing response:', parseError);
            throw new Error('Error parsing server response');
          }
        } catch (apiError) {
          console.error('API call error:', apiError);
          throw apiError;
        }
        
        // Refresh photos from the server to ensure we have the latest data
        await fetchPhotos();
      } else {
        // Update existing photo
        console.log('Updating existing photo...');
        
        try {
          const response = await fetch('/api/photos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingPhoto)
          });
          
          console.log('API response status:', response.status);
          
          // First check if the response is ok
          if (!response.ok) {
            // Try to parse the error message
            let errorMessage = 'Failed to update photo';
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorMessage;
            } catch (parseError) {
              console.error('Could not parse error response:', parseError);
            }
            throw new Error(errorMessage);
          }
          
          // Then try to parse the response
          let updatedPhoto: Photo;
          try {
            const responseText = await response.text();
            console.log('Response text:', responseText);
            
            if (responseText) {
              updatedPhoto = JSON.parse(responseText);
              console.log('Photo updated successfully:', updatedPhoto);
              setPhotos(photos.map(photo =>
                photo.id === updatedPhoto.id ? updatedPhoto : photo
              ));
            } else {
              console.error('Empty response received');
              throw new Error('Empty response received from server');
            }
          } catch (parseError) {
            console.error('Error parsing response:', parseError);
            throw new Error('Error parsing server response');
          }
        } catch (apiError) {
          console.error('API call error:', apiError);
          throw apiError;
        }
        
        // Refresh photos from the server to ensure we have the latest data
        await fetchPhotos();
      }
      
      setEditingPhoto(null);
      setNewPhoto(null);
    } catch (error: any) {
      console.error('Error saving photo:', error);
      alert(`Failed to save photo: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        const response = await fetch(`/api/photos?id=${photoId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete photo');
        
        setPhotos(photos.filter(photo => photo.id !== photoId));
        
        // Refresh photos from the server to ensure we have the latest data
        await fetchPhotos();
      } catch (error) {
        console.error('Error deleting photo:', error);
        alert('Failed to delete photo. Please try again.');
      }
    }
  };

  const handleToggleFeatured = async (photoId: string) => {
    const photo = photos.find(p => p.id === photoId);
    if (!photo) return;

    try {
      const updatedPhoto = { ...photo, featured: !photo.featured };
      const response = await fetch('/api/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPhoto)
      });
      
      if (!response.ok) throw new Error('Failed to update photo');
      
      const savedPhoto = await response.json();
      setPhotos(photos.map(p =>
        p.id === photoId ? savedPhoto : p
      ));
      
      // Refresh photos from the server to ensure we have the latest data
      await fetchPhotos();
    } catch (error) {
      console.error('Error toggling featured status:', error);
      alert('Failed to update photo. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Photos</h1>
        <div className="flex space-x-2">
          <button
            onClick={fetchPhotos}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FiRefreshCw className="-ml-1 mr-2 h-4 w-4" />
            Refresh
          </button>
          <CloudinaryUploadButton onUpload={handleUpload} />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <FiRefreshCw className="animate-spin h-8 w-8 text-white" />
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-white">No photos</h3>
          <p className="mt-1 text-sm text-zinc-400">Get started by uploading a new photo.</p>
          <div className="mt-6">
            <CloudinaryUploadButton onUpload={handleUpload} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-zinc-800 rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-200">
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => setEditingPhoto(photo)}
                      className="p-2 text-white hover:text-blue-400 transition-colors"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 text-white hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-white">{photo.title}</h3>
                <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{photo.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-zinc-400">{photo.category}</span>
                  <button
                    onClick={() => handleToggleFeatured(photo.id)}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      photo.featured
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {photo.featured ? 'Featured' : 'Not Featured'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              {newPhoto ? 'Add New Photo' : 'Edit Photo'}
            </h2>
            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-zinc-400">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={editingPhoto.title}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-400">
                  Description
                </label>
                <textarea
                  id="description"
                  value={editingPhoto.description}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-zinc-400">
                  Category
                </label>
                <select
                  id="category"
                  value={editingPhoto.category}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-zinc-400">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={editingPhoto.location}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingPhoto.featured || false}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, featured: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-600 rounded bg-zinc-700"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-zinc-400">
                  Featured Photo
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPhoto(null);
                    setNewPhoto(null);
                  }}
                  className="px-4 py-2 border border-zinc-600 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {newPhoto ? 'Add Photo' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 