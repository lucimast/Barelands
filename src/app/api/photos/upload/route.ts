import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos as inMemoryPhotos, Photo } from '@/lib/data';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

// Add static export configuration
export const dynamic = 'force-static';
export const revalidate = false;

// Add generateStaticParams for static export
export function generateStaticParams() {
  return [];
}

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
    const newPhoto = await request.json();
    
    // Validate required fields
    if (!newPhoto || !newPhoto.id || !newPhoto.title || !newPhoto.category || !newPhoto.image) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Load existing photo data
    const storedPhotos = await loadPhotoData();
    
    // Add the new photo to the stored data
    const updatedPhotos = [...storedPhotos, newPhoto];
    
    // Save updated photos back to the JSON file
    await savePhotoData(updatedPhotos);
    
    // Add to in-memory photos for immediate use
    inMemoryPhotos.push(newPhoto);
    
    // Revalidate relevant paths
    revalidatePath('/');
    revalidatePath('/portfolio');
    revalidatePath('/admin');
    revalidatePath('/prints');
    
    return NextResponse.json({
      success: true,
      message: 'Photo uploaded successfully',
      photo: newPhoto
    });
    
  } catch (error) {
    console.error('Error uploading photo:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to upload photo' },
      { status: 500 }
    );
  }
} 