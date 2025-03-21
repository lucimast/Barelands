import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

// Path to stored photo data
const PHOTO_DATA_PATH = path.join(process.cwd(), 'data', 'photos.json');

// Load photos from JSON file
async function loadPhotoData(): Promise<Photo[]> {
  try {
    const exists = await fs.access(PHOTO_DATA_PATH).then(() => true).catch(() => false);
    if (!exists) {
      return [];
    }
    const data = await fs.readFile(PHOTO_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading photo data:', error);
    return [];
  }
}

// Save photo data to file
async function savePhotoData(photoData: Photo[]): Promise<boolean> {
  try {
    const dataDir = path.dirname(PHOTO_DATA_PATH);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(PHOTO_DATA_PATH, JSON.stringify(photoData, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving photo data:', error);
    return false;
  }
}

// Revalidate all relevant paths directly
function revalidateAllPaths() {
  const paths = ['/', '/admin', '/news', '/prints', '/portfolio'];
  
  for (const path of paths) {
    try {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    } catch (error) {
      console.error(`Failed to revalidate path ${path}:`, error);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    console.log('Checking authentication for feature toggle request');
    const session = await getServerSession(authOptions);
    console.log('Session check result:', session ? 'Authenticated' : 'Not authenticated');
    
    if (!session) {
      console.log('Authentication failed for feature toggle request');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('User authenticated:', session.user?.email);

    // Parse request body to get photo ID
    const body = await request.json();
    const { photoId } = body;

    console.log('Attempting to toggle featured status for photo:', photoId);

    if (!photoId) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }

    // Find the photo in both memory and storage
    const inMemoryPhotoIndex = photos.findIndex(photo => photo.id === photoId);
    const storedPhotos = await loadPhotoData();
    const storedPhotoIndex = storedPhotos.findIndex(photo => photo.id === photoId);

    // Check if photo exists
    if (inMemoryPhotoIndex === -1 && storedPhotoIndex === -1) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    let updatedFeaturedStatus = false;

    // Update in-memory array
    if (inMemoryPhotoIndex !== -1) {
      // Toggle the featured status
      updatedFeaturedStatus = !photos[inMemoryPhotoIndex].featured;
      photos[inMemoryPhotoIndex].featured = updatedFeaturedStatus;
    }

    // Update JSON storage
    if (storedPhotoIndex !== -1) {
      // Toggle the featured status, using the value from memory if already updated
      updatedFeaturedStatus = inMemoryPhotoIndex !== -1 
        ? updatedFeaturedStatus 
        : !storedPhotos[storedPhotoIndex].featured;
      
      storedPhotos[storedPhotoIndex].featured = updatedFeaturedStatus;
      await savePhotoData(storedPhotos);
    }

    // Directly revalidate all paths
    revalidateAllPaths();

    return NextResponse.json({
      success: true,
      message: 'Featured status updated successfully',
      photoId,
      featured: updatedFeaturedStatus
    });
  } catch (error) {
    console.error('Error updating featured status:', error);
    return NextResponse.json(
      { error: 'Failed to update featured status' },
      { status: 500 }
    );
  }
} 