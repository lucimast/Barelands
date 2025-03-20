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
      // If the file doesn't exist, return an empty array
      return [];
    }
    
    const data = await fs.readFile(PHOTO_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading photo data:', error);
    return [];
  }
}

// Save photo data to the JSON file
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

// Revalidate all pages to refresh cache
async function revalidateAllPages(baseUrl: string): Promise<boolean> {
  try {
    const pagesToRevalidate = ['/', '/admin', '/news', '/prints', '/portfolio'];
    
    for (const page of pagesToRevalidate) {
      try {
        await fetch(`${baseUrl}/api/revalidate?path=${page}&secret=barelands_secret_key`);
        console.log(`Revalidated page: ${page}`);
      } catch (error) {
        console.error(`Failed to revalidate page ${page}:`, error);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error during revalidation:', error);
    return false;
  }
}

// Synchronize in-memory photos with stored JSON data
export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin functions
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Load the current stored photos
    const storedPhotos = await loadPhotoData();
    
    // Clear the in-memory photos array
    photos.length = 0;
    
    // Repopulate with photos from JSON storage
    storedPhotos.forEach(photo => {
      photos.push(photo);
    });
    
    // Also save the current state back to JSON (ensures consistency)
    await savePhotoData(photos);
    
    // Revalidate all pages to refresh the cache
    await revalidateAllPages(request.nextUrl.origin);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Photos synchronized successfully and all pages revalidated', 
      count: photos.length 
    });
  } catch (error) {
    console.error('Error synchronizing photos:', error);
    return NextResponse.json(
      { error: 'Failed to synchronize photos' },
      { status: 500 }
    );
  }
} 