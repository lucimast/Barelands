import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';
import { deleteImageFile } from '@/lib/server-storage';
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

// Revalidate all relevant pages to update the UI
async function revalidateAllPages(baseUrl: string) {
  const pagesToRevalidate = ['/', '/admin', '/news', '/prints', '/portfolio'];
  
  for (const page of pagesToRevalidate) {
    try {
      await fetch(`${baseUrl}/api/revalidate?path=${page}&secret=barelands_secret_key`);
      console.log(`Revalidated path: ${page}`);
    } catch (error) {
      console.error(`Failed to revalidate path ${page}:`, error);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse request body to get photo ID
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }

    // Find the photo in both memory and storage
    const inMemoryPhotoIndex = photos.findIndex(photo => photo.id === id);
    const storedPhotos = await loadPhotoData();
    const storedPhotoIndex = storedPhotos.findIndex(photo => photo.id === id);

    // Check if photo exists
    if (inMemoryPhotoIndex === -1 && storedPhotoIndex === -1) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    let photoToDelete: Photo | null = null;
    
    // Get photo info from wherever it exists
    if (inMemoryPhotoIndex !== -1) {
      photoToDelete = photos[inMemoryPhotoIndex];
    } else if (storedPhotoIndex !== -1) {
      photoToDelete = storedPhotos[storedPhotoIndex];
    }
    
    if (!photoToDelete) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    // 1. Delete the physical image file
    if (photoToDelete.image.startsWith('/uploads/')) {
      const deleted = await deleteImageFile(photoToDelete.image);
      if (deleted) {
        console.log(`Deleted image file: ${photoToDelete.image}`);
      } else {
        console.warn(`Failed to delete image file: ${photoToDelete.image}`);
        // Continue with deletion even if file removal fails
      }
    }

    // 2. Remove from memory array
    if (inMemoryPhotoIndex !== -1) {
      photos.splice(inMemoryPhotoIndex, 1);
    }

    // 3. Remove from JSON storage
    if (storedPhotoIndex !== -1) {
      storedPhotos.splice(storedPhotoIndex, 1);
      await savePhotoData(storedPhotos);
    }

    // 4. Revalidate all pages to refresh the UI
    await revalidateAllPages(request.nextUrl.origin);

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully',
      photoId: id
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
} 