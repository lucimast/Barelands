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

  // Toggle the featured status of a photo
  const toggleFeatured = async (photoId: string) => {
    try {
      const response = await fetch('/api/photos/feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update featured status');
      }
      
      // Update local state
      const updatedPhotos = photos.map(photo => 
        photo.id === photoId 
          ? { ...photo, featured: !photo.featured } 
          : photo
      );
      
      setPhotos(updatedPhotos);
      
      // Re-apply the current filter
      if (selectedCategory === 'All') {
        setDisplayedPhotos(updatedPhotos);
      } else {
        setDisplayedPhotos(updatedPhotos.filter(p => p.category === selectedCategory));
      }
      
      toast.success('Featured status updated');
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast.error('Failed to update featured status');
    }
  };

  // Delete a photo
  const deletePhoto = async (photoId: string) => {
    if (window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      setIsDeleting(photoId);
      try {
        const response = await fetch('/api/photos/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: photoId }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete photo');
        }
        
        // Update local state
        const updatedPhotos = photos.filter(photo => photo.id !== photoId);
        setPhotos(updatedPhotos);
        
        // Re-apply the current filter
        if (selectedCategory === 'All') {
          setDisplayedPhotos(updatedPhotos);
        } else {
          setDisplayedPhotos(updatedPhotos.filter(p => p.category === selectedCategory));
        }
        
        toast.success('Photo deleted successfully');
      } catch (error) {
        console.error('Error deleting photo:', error);
        toast.error('Failed to delete photo');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // Initialize by syncing photos when component mounts
  useEffect(() => {
    syncPhotos();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <Button 
            onClick={syncPhotos} 
            disabled={isSyncing}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700"
          >
            {isSyncing ? (
              <>
                <FiRefreshCw className="animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <FiRefreshCw />
                Sync Photos
              </>
            )}
          </Button>
        </div>
        
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => filterPhotosByCategory(e.target.value)}
            className="px-4 py-2 rounded-md bg-zinc-800 border-none"
          >
            {photoCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Photos count summary */}
      <div className="text-sm text-zinc-400">
        Displaying {displayedPhotos.length} photo{displayedPhotos.length !== 1 ? 's' : ''} 
        {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        {' '} (Total: {photos.length})
      </div>

      {displayedPhotos.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-700 rounded-lg">
          <FiAlertTriangle className="mx-auto h-8 w-8 text-zinc-500 mb-2" />
          <p className="text-zinc-400">
            {selectedCategory === 'All' 
              ? 'No photos found. Upload some photos to get started.'
              : `No photos found in the "${selectedCategory}" category.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedPhotos.map((photo) => (
            <div key={photo.id} className="relative group overflow-hidden rounded-lg">
              {/* Photo */}
              <div className="relative aspect-[4/3] bg-zinc-800">
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Show placeholder for failed images
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/50 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-medium truncate">{photo.title}</h3>
                <p className="text-zinc-300 text-sm truncate">{photo.location}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-700 text-zinc-300">
                    {photo.category}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={photo.featured ? "secondary" : "outline"}
                      onClick={() => toggleFeatured(photo.id)}
                      className={`p-1 h-8 w-8 ${
                        photo.featured ? "bg-amber-600 hover:bg-amber-700" : ""
                      }`}
                    >
                      <FiStar className={photo.featured ? "text-white" : ""} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deletePhoto(photo.id)}
                      disabled={isDeleting === photo.id}
                      className="p-1 h-8 w-8"
                    >
                      {isDeleting === photo.id ? (
                        <FiCheck className="animate-pulse" />
                      ) : (
                        <FiTrash2 />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 