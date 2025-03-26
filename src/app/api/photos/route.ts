import { NextRequest, NextResponse } from 'next/server';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';
import * as fsSync from 'fs';

// Add static export configuration
export const dynamic = 'force-static';

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

// For static export, we need a version that doesn't use request.url
// We'll return all photos (unfiltered) for static export
export async function GET() {
  try {
    // Load photos from file
    let storedPhotos: Photo[] = [];
    try {
      storedPhotos = await loadPhotoData();
    } catch (error) {
      console.error('Error loading stored photos:', error);
      // Continue with just in-memory photos if there's an error
    }
    
    // Combine photos from both sources, avoiding duplicates by ID
    const photoMap = new Map<string, Photo>();
    
    // Add in-memory photos first
    photos.forEach(photo => {
      photoMap.set(photo.id, photo);
    });
    
    // Add stored photos, potentially overriding in-memory ones
    storedPhotos.forEach(photo => {
      photoMap.set(photo.id, photo);
    });
    
    // Convert back to array
    let allPhotos = Array.from(photoMap.values());
    
    // Sort by dateAdded, newest first
    allPhotos.sort((a, b) => 
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
    
    return NextResponse.json(allPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

const PHOTOS_DATA_PATH = path.join(process.cwd(), 'data', 'photos.json');

// Ensure the data directory exists
const ensureDataDir = () => {
  const dir = path.dirname(PHOTOS_DATA_PATH);
  if (!fsSync.existsSync(dir)) {
    fsSync.mkdirSync(dir, { recursive: true });
  }
};

// Load photos from the JSON file
const loadPhotosData = async (): Promise<Photo[]> => {
  try {
    ensureDataDir();
    if (!fsSync.existsSync(PHOTOS_DATA_PATH)) {
      return [];
    }
    const data = fsSync.readFileSync(PHOTOS_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading photos data:', error);
    return [];
  }
};

// Save photos to the JSON file
const savePhotosData = async (photos: Photo[]): Promise<void> => {
  try {
    ensureDataDir();
    fsSync.writeFileSync(PHOTOS_DATA_PATH, JSON.stringify(photos, null, 2));
  } catch (error) {
    console.error('Error saving photos data:', error);
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const photo = await request.json();
    const photos = await loadPhotosData();
    photos.push(photo);
    await savePhotosData(photos);
    return NextResponse.json(photo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const photo = await request.json();
    const photos = await loadPhotosData();
    const index = photos.findIndex(p => p.id === photo.id);
    if (index !== -1) {
      photos[index] = photo;
      await savePhotosData(photos);
      return NextResponse.json(photo);
    }
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('id');
    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID is required' }, { status: 400 });
    }
    const photos = await loadPhotosData();
    const filteredPhotos = photos.filter(p => p.id !== photoId);
    await savePhotosData(filteredPhotos);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
} 