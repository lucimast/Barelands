import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { photos, Photo } from '@/lib/data';
import { saveImageToLocal, createUploadFolderIfNeeded } from '@/lib/server-storage';
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
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = file.type;
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting file to base64:', error);
    throw new Error('Failed to process image file');
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    // Parse request body
    let formData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error('Error parsing form data:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid form data', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 400 });
    }

    const imageFile = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string || '';
    const location = formData.get('location') as string || '';
    const featuredStr = formData.get('featured') as string || 'false';
    const featured = featuredStr === 'true';

    // Validate required fields
    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!title || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (title or category)' },
        { status: 400 }
      );
    }

    // Log file info for debugging
    console.log('Image file details:', {
      name: imageFile.name,
      type: imageFile.type,
      size: imageFile.size,
    });

    // Ensure uploads folder exists
    try {
      await createUploadFolderIfNeeded();
    } catch (error) {
      console.error('Error creating uploads folder:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to prepare upload directory',
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }

    // Convert file to base64
    let base64Image;
    try {
      base64Image = await fileToBase64(imageFile);
    } catch (error) {
      console.error('Error converting file to base64:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to process image file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    // Save image to local storage
    let savedImagePath;
    try {
      savedImagePath = await saveImageToLocal(base64Image);
    } catch (error) {
      console.error('Error saving image to local storage:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to save image file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
    
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
    let existingPhotos;
    try {
      existingPhotos = await loadPhotoData();
    } catch (error) {
      console.error('Error loading existing photos:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to load existing photos',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
    
    // Add new photo and save back to file
    try {
      existingPhotos.push(newPhoto);
      await savePhotoData(existingPhotos);
    } catch (error) {
      console.error('Error saving photo data:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to save photo data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
    
    // Synchronize the in-memory photos array with the updated file
    try {
      await synchronizePhotos();
    } catch (error) {
      console.error('Error synchronizing photos:', error);
      // Continue anyway as the photo is already saved
    }
    
    // Revalidate all pages to ensure the new photo appears everywhere
    try {
      await revalidatePages(request.nextUrl.origin);
    } catch (error) {
      console.error('Error revalidating pages:', error);
      // Continue anyway as this shouldn't block the upload
    }

    return NextResponse.json({ 
      success: true, 
      photo: newPhoto,
      message: 'Photo uploaded successfully'
    });
  } catch (error) {
    console.error('Unhandled error in photo upload:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload photo',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 