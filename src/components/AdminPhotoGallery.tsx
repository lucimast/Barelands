'use client';

import { useState, useEffect, useRef } from 'react';
import { Photo, photoCategories } from '@/lib/data';
import { toast } from 'sonner';
import { FiTrash2, FiStar, FiRefreshCw, FiCheck, FiAlertTriangle, FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AdminPhotoGalleryProps {
  photos: Photo[];
}

export default function AdminPhotoGallery({ photos: initialPhotos }: AdminPhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>(initialPhotos);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [photoOrientations, setPhotoOrientations] = useState<Record<string, 'portrait' | 'landscape'>>({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Detect image orientations when photos change
  useEffect(() => {
    const detectOrientations = async () => {
      const orientations: Record<string, 'portrait' | 'landscape'> = {};
      
      // Create a promise for each photo to check orientation
      const promises = photos.map(photo => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            orientations[photo.id] = img.height > img.width ? 'portrait' : 'landscape';
            resolve();
          };
          img.onerror = () => {
            // Default to landscape on error
            orientations[photo.id] = 'landscape';
            resolve();
          };
          img.src = photo.image;
        });
      });
      
      // Wait for all images to be processed
      await Promise.all(promises);
      setPhotoOrientations(orientations);
    };
    
    detectOrientations();
  }, [photos]);

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
      console.log('Sending feature toggle request for photo:', photoId);
      
      const response = await fetch('/api/photos/feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoId }),
        credentials: 'include', // Including credentials for authentication
      });
      
      console.log('Feature toggle response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(e => ({ error: 'Could not parse error response' }));
        console.error('Feature toggle error data:', errorData);
        
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        
        throw new Error(errorData.error || `Failed to update featured status (Status: ${response.status})`);
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
      
      toast('Featured status updated', {
        description: 'The photo featured status has been updated.',
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast('Error', {
        description: error instanceof Error ? error.message : 'Failed to update featured status',
        style: { background: 'red', color: 'white' },
      });
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
          credentials: 'include', // Including credentials for authentication
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
        
        toast('Success', {
          description: 'Photo deleted successfully',
        });
      } catch (error) {
        console.error('Error deleting photo:', error);
        toast('Error', {
          description: 'Failed to delete photo',
          style: { background: 'red', color: 'white' },
        });
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // Open edit dialog
  const openEditDialog = (photo: Photo) => {
    setEditingPhoto({ ...photo });
    setIsEditDialogOpen(true);
  };

  // Handle edit form input changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingPhoto) return;
    const { name, value } = e.target;
    setEditingPhoto(prev => prev ? { ...prev, [name]: value } : null);
  };

  // Save edited photo
  const saveEditedPhoto = async () => {
    if (!editingPhoto) return;
    
    setIsSaving(true);
    
    try {
      const response = await fetch('/api/photos/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPhoto),
        credentials: 'include', // Including credentials for authentication
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update photo');
      }
      
      // Update the photo in the local state
      setPhotos(photos.map(photo => 
        photo.id === editingPhoto.id ? editingPhoto : photo
      ));
      
      // Update displayed photos based on the current filter
      const updatedPhotos = photos.map(photo => 
        photo.id === editingPhoto.id ? editingPhoto : photo
      );
      
      if (selectedCategory === 'All') {
        setDisplayedPhotos(updatedPhotos);
      } else {
        setDisplayedPhotos(updatedPhotos.filter(p => p.category === selectedCategory));
      }
      
      toast('Photo updated successfully', {
        description: 'The photo details have been updated',
      });
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating photo:', error);
      toast('Error updating photo', {
        description: error instanceof Error ? error.message : "Failed to update photo",
        style: { background: 'red', color: 'white' },
      });
    } finally {
      setIsSaving(false);
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
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-red-500"
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
            className="px-4 py-2 rounded-md bg-zinc-800 border-none text-red-500"
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
      <div className="text-sm text-red-500">
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
              <div className={`relative ${photoOrientations[photo.id] === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-zinc-800`}>
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
                      variant="outline"
                      onClick={() => openEditDialog(photo)}
                      className="p-1 h-8 w-8"
                    >
                      <FiEdit />
                    </Button>
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

      {/* Edit Photo Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Edit Photo Details</DialogTitle>
          </DialogHeader>
          
          {editingPhoto && (
            <div className="space-y-4 py-2">
              <div className="mb-4 relative w-32 h-32 mx-auto overflow-hidden rounded-md">
                <img 
                  src={editingPhoto.image} 
                  alt={editingPhoto.title || 'Photo preview'}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={editingPhoto.title}
                  onChange={handleEditChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={editingPhoto.category}
                  onChange={handleEditChange}
                  className="w-full rounded-md bg-zinc-800 border-zinc-700 text-zinc-100 p-2"
                >
                  {photoCategories
                    .filter(category => category !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={editingPhoto.location}
                  onChange={handleEditChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editingPhoto.description}
                  onChange={handleEditChange}
                  className="resize-none bg-zinc-800 border-zinc-700 min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="featured" className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={!!editingPhoto.featured}
                    onChange={(e) => setEditingPhoto({
                      ...editingPhoto,
                      featured: e.target.checked
                    })}
                    className="rounded border-zinc-700 bg-zinc-800"
                  />
                  <span>Featured Photo</span>
                </Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-zinc-700">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={saveEditedPhoto} 
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 