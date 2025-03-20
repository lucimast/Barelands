'use client';

import { useState, useEffect } from 'react';
import { Photo, photoCategories } from '@/lib/data';
import { toast } from 'sonner';
import { FiTrash2, FiStar, FiRefreshCw, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

interface AdminPhotoGalleryProps {
  photos: Photo[];
}

export default function AdminPhotoGallery({ photos: initialPhotos }: AdminPhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>(initialPhotos);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter photos by category
  const filterPhotosByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setDisplayedPhotos(photos);
    } else {
      setDisplayedPhotos(photos.filter(photo => photo.category === category));
    }
  };

  // Sync photos with the server
  const syncPhotos = async () => {
    setIsSyncing(true);
    try {
      // First call the sync endpoint to ensure consistency
      const syncResponse = await fetch('/api/photos/sync');
      if (!syncResponse.ok) {
        throw new Error('Failed to synchronize photos with server');
      }
      
      // Then fetch the updated photo list
      const photosResponse = await fetch('/api/photos');
      if (!photosResponse.ok) {
        throw new Error('Failed to fetch photos');
      }
      
      const photosData = await photosResponse.json();
      
      // Update local state
      setPhotos(photosData);
      // Re-apply the current filter
      if (selectedCategory === 'All') {
        setDisplayedPhotos(photosData);
      } else {
        setDisplayedPhotos(photosData.filter((p: Photo) => p.category === selectedCategory));
      }
      
      // Show success message
      toast.success(`Photos synchronized successfully (${photosData.length} photos)`);
    } catch (error) {
      console.error('Error syncing photos:', error);
      toast.error('Failed to synchronize photos');
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync photos on component mount
  useEffect(() => {
    syncPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle featured status
  const toggleFeatured = async (photoId: string, currentStatus: boolean) => {
    try {
      // In a full implementation, this would make an API call to update the photo
      toast(`Toggled featured status for photo: ${photoId}`);
      
      // Update local state to reflect change
      const updatedPhotos = photos.map(photo => 
        photo.id === photoId 
          ? { ...photo, featured: !currentStatus } 
          : photo
      );
      setPhotos(updatedPhotos);
      filterPhotosByCategory(selectedCategory); // Re-apply the current filter
    } catch (error) {
      toast.error('Failed to update photo');
      console.error(error);
    }
  };

  // Delete photo function that calls the API endpoint
  const deletePhoto = async (photoId: string) => {
    if (confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      try {
        // Set deleting state for the current photo
        setIsDeleting(photoId);
        
        // Call the API to delete the photo
        const response = await fetch('/api/photos/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ photoId }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to delete photo');
        }
        
        // Update local state to remove the photo
        const updatedPhotos = photos.filter(photo => photo.id !== photoId);
        setPhotos(updatedPhotos);
        // Re-apply the current filter
        if (selectedCategory === 'All') {
          setDisplayedPhotos(updatedPhotos);
        } else {
          setDisplayedPhotos(updatedPhotos.filter(p => p.category === selectedCategory));
        }
        
        // Show success message
        toast.success(`Photo deleted successfully (${data.remainingCount} photos remaining)`);
        
        // Force a revalidation by calling the revalidate API
        try {
          const paths = ['/', '/admin', '/news', '/prints'];
          for (const path of paths) {
            await fetch(`/api/revalidate?path=${path}&secret=barelands_secret_key`);
          }
        } catch (e) {
          console.error('Error revalidating paths:', e);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to delete photo');
        console.error('Error deleting photo:', error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => filterPhotosByCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Photos</option>
            {photoCategories.filter(c => c !== 'All').map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <Button 
          onClick={syncPhotos}
          disabled={isSyncing}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
        >
          {isSyncing ? (
            <>
              <FiRefreshCw className="mr-2 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <FiRefreshCw className="mr-2" />
              Sync Photos
            </>
          )}
        </Button>
      </div>
      
      {displayedPhotos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FiAlertTriangle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No photos found</h3>
          <p className="text-gray-500">
            {selectedCategory === 'All' 
              ? 'There are no photos in the gallery yet. Try uploading some photos first.' 
              : `No photos found in the "${selectedCategory}" category. Try selecting a different category.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPhotos.map((photo) => (
            <div key={photo.id} className="bg-gray-50 rounded-lg overflow-hidden shadow border border-gray-200">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => toggleFeatured(photo.id, photo.featured || false)}
                    className={`p-2 rounded-full ${
                      photo.featured 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-white/80 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={photo.featured ? 'Remove from featured' : 'Add to featured'}
                    disabled={isDeleting === photo.id}
                  >
                    <FiStar className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className={`p-2 ${
                      isDeleting === photo.id
                        ? 'bg-red-100 text-red-600 cursor-not-allowed'
                        : 'bg-white/80 text-red-600 hover:bg-red-100'
                    } rounded-full`}
                    title="Delete photo"
                    disabled={isDeleting === photo.id}
                  >
                    {isDeleting === photo.id ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <FiTrash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{photo.location}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-md">
                    {photo.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(photo.dateAdded).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="flex items-center">
          <FiCheck className="text-green-500 mr-2" />
          <span>Currently showing {displayedPhotos.length} photo{displayedPhotos.length !== 1 ? 's' : ''} {selectedCategory !== 'All' ? `in ${selectedCategory}` : '(all categories)'} out of {photos.length} total photos.</span>
        </p>
      </div>
    </div>
  );
} 