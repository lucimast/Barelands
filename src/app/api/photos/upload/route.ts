import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos, Photo } from '@/lib/data';
import { saveImageToLocal, createUploadFolderIfNeeded } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

// Path to store photo data
const PHOTO_DATA_PATH = path.join(process.cwd(), 'data', 'photos.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Load existing photo data
async function loadPhotoData() {
  try {
    await ensureDataDirectory();
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
async function savePhotoData(photoData: any[]) {
  try {
    await ensureDataDirectory();
    await fs.writeFile(PHOTO_DATA_PATH, JSON.stringify(photoData, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving photo data:', error);
    return false;
  }
}

// Synchronize in-memory photos with stored photos
async function synchronizePhotos() {
  try {
    // Get the updated photo list from the JSON file
    const storedPhotos = await loadPhotoData();
    
    // Clear the in-memory array
    photos.length = 0;
    
    // Load the stored photos into the in-memory array
    storedPhotos.forEach((photo: Photo) => {
      photos.push(photo);
    });
    
    return true;
  } catch (error) {
    console.error('Error synchronizing photos:', error);
    return false;
  }
}

// Revalidate relevant pages
async function revalidatePages(baseUrl: string) {
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

// Helper function to convert File to base64
async function fileToBase64(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  const mimeType = file.type;
  return `data:${mimeType};base64,${base64}`;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse request body
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string || '';
    const location = formData.get('location') as string || '';
    const featuredStr = formData.get('featured') as string || 'false';
    const featured = featuredStr === 'true';

    // Validate required fields
    if (!imageFile || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure uploads folder exists
    await createUploadFolderIfNeeded();

    // Convert file to base64
    const base64Image = await fileToBase64(imageFile);

    // Save image to local storage
    const savedImagePath = await saveImageToLocal(base64Image);
    
    // Create new photo object
    const newPhoto = {
      id: uuidv4(),
      title,
      category,
      description,
      location,
      image: savedImagePath,
      featured,
      dateAdded: new Date().toISOString(),
    };

    // Load existing photos from file
    const existingPhotos = await loadPhotoData();
    
    // Add new photo and save back to file
    existingPhotos.push(newPhoto);
    await savePhotoData(existingPhotos);
    
    // Synchronize the in-memory photos array with the updated file
    await synchronizePhotos();
    
    // Revalidate all pages to ensure the new photo appears everywhere
    await revalidatePages(request.nextUrl.origin);

    return NextResponse.json({ 
      success: true, 
      photo: newPhoto,
      message: 'Photo uploaded and all pages revalidated'
    });
  } catch (error) {
    console.error('Error in photo upload:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
} 