import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';

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
async function savePhotoData(photoData: Photo[]) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(PHOTO_DATA_PATH, JSON.stringify(photoData, null, 2));
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
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get photo ID from request body
    const { photoId } = await request.json();
    
    if (!photoId) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }

    // Find the photo to delete
    const photoToDelete = photos.find(photo => photo.id === photoId);
    if (!photoToDelete) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    // Remove photo from the in-memory array
    const photoIndex = photos.findIndex(photo => photo.id === photoId);
    if (photoIndex !== -1) {
      photos.splice(photoIndex, 1);
    }
    
    // Also update the photos.json file to ensure persistence
    await savePhotoData(photos);

    // Attempt to delete the actual image file from public uploads
    if (photoToDelete?.image) {
      try {
        const imagePath = path.join(process.cwd(), 'public', photoToDelete.image);
        await fs.access(imagePath); // Check if file exists
        await fs.unlink(imagePath);
        console.log(`Deleted image file: ${imagePath}`);
      } catch (err) {
        // Log but don't fail if file doesn't exist or can't be deleted
        console.log(`Image file not found or cannot be deleted: ${photoToDelete.image}`);
      }
    }

    // Force the Next.js cache to revalidate all relevant paths
    try {
      const revalidatePaths = ['/', '/admin', '/news', '/prints', '/portfolio'];
      for (const pathname of revalidatePaths) {
        await fetch(`${request.nextUrl.origin}/api/revalidate?path=${pathname}&secret=barelands_secret_key`);
      }
    } catch (error) {
      console.error('Error revalidating paths:', error);
    }

    return NextResponse.json({ 
      success: true, 
      photoId,
      message: 'Photo deleted successfully',
      remainingCount: photos.length
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
} 