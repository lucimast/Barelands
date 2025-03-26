import { NextRequest, NextResponse } from 'next/server';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';
import * as fsSync from 'fs';

// Add static export configuration
export const dynamic = 'force-static';

// Add generateStaticParams for static export
export function generateStaticParams() {
  return [];
}

// Path to stored photo data
const PHOTO_DATA_PATH = path.join(process.cwd(), 'data', 'photos.json');

// Load photos from JSON file
async function loadPhotoData(): Promise<Photo[]> {
  try {
    const data = await fs.readFile(PHOTO_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log('API: GET /api/photos request received');
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    // Load photos from JSON file first
    let photosData = await loadPhotosData();
    console.log(`API: Loaded ${photosData.length} photos from JSON file`);
    
    // If no photos from JSON, fall back to the static data
    if (!photosData || photosData.length === 0) {
      console.log('API: No photos in JSON file, falling back to static data');
      photosData = photos;
    }
    
    // Filter photos by category if provided
    let filteredPhotos = photosData;
    if (category && category !== 'All') {
      filteredPhotos = photosData.filter(photo => photo.category === category);
      console.log(`API: Filtered to ${filteredPhotos.length} photos in category: ${category}`);
    }
    
    // Sort photos by dateAdded (newest first)
    filteredPhotos = [...filteredPhotos].sort((a, b) => 
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
    
    console.log(`API: Returning ${filteredPhotos.length} photos`);
    
    // Return the photos array directly
    return NextResponse.json(filteredPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      [], 
      { status: 500 }
    );
  }
}

// Ensure the data directory exists
const ensureDataDir = () => {
  const dir = path.dirname(PHOTO_DATA_PATH);
  if (!fsSync.existsSync(dir)) {
    fsSync.mkdirSync(dir, { recursive: true });
  }
};

// Load photos from the JSON file
const loadPhotosData = async (): Promise<Photo[]> => {
  try {
    ensureDataDir();
    
    if (!fsSync.existsSync(PHOTO_DATA_PATH)) {
      console.log(`API: Data file not found at ${PHOTO_DATA_PATH}`);
      return [];
    }
    
    const data = fsSync.readFileSync(PHOTO_DATA_PATH, 'utf-8');
    console.log(`API: Successfully read data file, size: ${data.length} bytes`);
    
    if (!data || data.trim() === '') {
      console.log(`API: Data file is empty`);
      return [];
    }
    
    try {
      const parsedData = JSON.parse(data);
      console.log(`API: Successfully parsed JSON data, found ${parsedData.length} photos`);
      return parsedData;
    } catch (parseError) {
      console.error(`API: Error parsing JSON data:`, parseError);
      return [];
    }
  } catch (error) {
    console.error('API: Error loading photos data:', error);
    return [];
  }
};

// Save photos to the JSON file
const savePhotosData = async (photos: Photo[]): Promise<void> => {
  try {
    ensureDataDir();
    fsSync.writeFileSync(PHOTO_DATA_PATH, JSON.stringify(photos, null, 2));
  } catch (error) {
    console.error('Error saving photos data:', error);
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const photo = await request.json();
    
    console.log('Received photo data:', photo);
    
    // Validate the photo data
    if (!photo || !photo.id || !photo.image || !photo.title) {
      console.error('Invalid photo data received:', photo);
      return NextResponse.json(
        { error: 'Invalid photo data. Required fields: id, image, title' },
        { status: 400 }
      );
    }
    
    // Load existing photos
    const photos = await loadPhotosData();
    
    // Add the new photo
    photos.push(photo);
    
    // Save all photos
    await savePhotosData(photos);
    
    // Return the saved photo with a success status
    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error('Error saving photo:', error);
    return NextResponse.json(
      { error: 'Failed to save photo', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const photo = await request.json();
    
    console.log('Received photo update:', photo);
    
    // Validate the photo data
    if (!photo || !photo.id) {
      console.error('Invalid photo data for update:', photo);
      return NextResponse.json(
        { error: 'Invalid photo data. Required field: id' },
        { status: 400 }
      );
    }
    
    // Load existing photos
    const photos = await loadPhotosData();
    
    // Find the photo to update
    const index = photos.findIndex(p => p.id === photo.id);
    
    if (index !== -1) {
      // Update the photo
      photos[index] = photo;
      
      // Save all photos
      await savePhotosData(photos);
      
      // Return the updated photo
      return NextResponse.json(photo);
    }
    
    return NextResponse.json(
      { error: 'Photo not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json(
      { error: 'Failed to update photo', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('id');
    
    console.log('Attempting to delete photo with ID:', photoId);
    
    if (!photoId) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }
    
    // Load existing photos
    const photos = await loadPhotosData();
    
    // Filter out the photo to delete
    const filteredPhotos = photos.filter(p => p.id !== photoId);
    
    // Check if any photos were removed
    if (filteredPhotos.length === photos.length) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    // Save the filtered photos
    await savePhotosData(filteredPhotos);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo', details: String(error) },
      { status: 500 }
    );
  }
} 