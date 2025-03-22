import { NextRequest, NextResponse } from 'next/server';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';

// Add static export configuration
export const dynamic = 'force-static';
export const revalidate = false;

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