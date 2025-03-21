import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos as inMemoryPhotos, Photo } from '@/lib/data';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

// Path to stored photo data
const PHOTO_DATA_PATH = path.join(process.cwd(), 'data', 'photos.json');

// Load photos from JSON file
async function loadPhotoData(): Promise<Photo[]> {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(PHOTO_DATA_PATH)) {
      return [];
    }
    
    const data = fs.readFileSync(PHOTO_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading photo data:', error);
    return [];
  }
}

// Save photos to JSON file
async function savePhotoData(photos: Photo[]): Promise<boolean> {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(PHOTO_DATA_PATH, JSON.stringify(photos, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving photo data:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse the request body
    const updatedPhoto = await request.json();
    
    // Validate required fields
    if (!updatedPhoto || !updatedPhoto.id || !updatedPhoto.title || !updatedPhoto.category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Load existing photo data
    const storedPhotos = await loadPhotoData();
    
    // Find and update the photo in the stored data
    const updatedStoredPhotos = storedPhotos.map(photo => 
      photo.id === updatedPhoto.id ? { ...photo, ...updatedPhoto } : photo
    );
    
    // Save updated photos back to the JSON file
    await savePhotoData(updatedStoredPhotos);
    
    // Update in-memory photos for immediate use
    // Find the index of the photo to update
    const inMemoryIndex = inMemoryPhotos.findIndex(p => p.id === updatedPhoto.id);
    if (inMemoryIndex !== -1) {
      // Update the in-memory photo
      inMemoryPhotos[inMemoryIndex] = {
        ...inMemoryPhotos[inMemoryIndex],
        title: updatedPhoto.title,
        category: updatedPhoto.category,
        description: updatedPhoto.description || inMemoryPhotos[inMemoryIndex].description,
        location: updatedPhoto.location || inMemoryPhotos[inMemoryIndex].location,
        featured: updatedPhoto.featured !== undefined ? updatedPhoto.featured : inMemoryPhotos[inMemoryIndex].featured
      };
    }
    
    // Revalidate relevant paths
    revalidatePath('/');
    revalidatePath('/portfolio');
    revalidatePath('/admin');
    revalidatePath('/prints');
    
    return NextResponse.json({
      success: true,
      message: 'Photo updated successfully',
      photo: updatedPhoto
    });
    
  } catch (error) {
    console.error('Error updating photo:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to update photo' },
      { status: 500 }
    );
  }
} 