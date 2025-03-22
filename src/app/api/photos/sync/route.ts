import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos, Photo } from '@/lib/data';
import fs from 'fs';
import path from 'path';
import { existsSync } from 'fs';
import { revalidatePath } from 'next/cache';
import fsPromises from 'fs/promises';
import { photoImageExists } from '@/lib/server-storage';

// Configure as a dynamic API route during runtime
// but allow build to proceed during static export
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Path to stored photo data
const PHOTO_DATA_PATH = path.join(process.cwd(), 'data', 'photos.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fsPromises.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Load photos from JSON file
async function loadPhotoData() {
  try {
    await ensureDataDirectory();
    const exists = await fsPromises.access(PHOTO_DATA_PATH).then(() => true).catch(() => false);
    if (!exists) {
      return [];
    }
    const data = await fsPromises.readFile(PHOTO_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading photo data:', error);
    return [];
  }
}

// Revalidate paths directly using next/cache
function revalidateAllPages() {
  const pagesToRevalidate = ['/', '/admin', '/news', '/prints', '/portfolio'];
  
  for (const page of pagesToRevalidate) {
    try {
      revalidatePath(page);
      console.log(`Revalidated path: ${page}`);
    } catch (error) {
      console.error(`Failed to revalidate path ${page}:`, error);
    }
  }
}

// Validate photo data and remove references to missing files
async function validatePhotos(photoData: any[]): Promise<any[]> {
  const validatedPhotos = [];
  
  for (const photo of photoData) {
    if (!photo.image || !photo.image.startsWith('/uploads/')) {
      // Keep non-upload images without validation
      validatedPhotos.push(photo);
      continue;
    }
    
    // Check if the image file exists using the async photoImageExists function
    const exists = await photoImageExists(photo);
    if (exists) {
      validatedPhotos.push(photo);
    } else {
      console.warn(`Warning: Image file not found for photo: ${photo.title}. Skipping.`);
    }
  }
  
  return validatedPhotos;
}

// Routes
export async function GET(request: NextRequest) {
  try {
    // For sync endpoint, allow public access for system health checks
    const storedPhotos = await loadPhotoData();
    const validatedPhotos = await validatePhotos(storedPhotos);
    
    // Clear the in-memory array
    photos.length = 0;
    
    // Push validated photos into the in-memory array
    validatedPhotos.forEach(photo => {
      photos.push(photo);
    });
    
    console.log(`Initialized ${photos.length} photos (filtered from ${storedPhotos.length} total)`);
    
    // Revalidate all pages directly
    revalidateAllPages();
    
    return NextResponse.json({
      success: true,
      message: "Photos synchronized and all pages revalidated",
      photoCount: photos.length,
      originalCount: storedPhotos.length
    });
  } catch (error) {
    console.error("Error synchronizing photos:", error);
    
    return NextResponse.json(
      { success: false, error: "Failed to synchronize photos" },
      { status: 500 }
    );
  }
} 