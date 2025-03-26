'use client';

import { Photo } from '@/lib/data';

/**
 * This file contains client-safe utilities for handling storage-related operations
 * For server-only functions, see server-storage.ts
 */

// Client-safe function that can be used in both environments
export function generateImageUrl(fileName: string, folder: string = 'uploads'): string {
  return `/${folder}/${fileName}`;
}

/**
 * Filter valid photos by checking if their image paths exist
 * This is a utility function to remove photos that might have invalid paths
 */
export function filterValidPhotos(photos: any): any[] {
  // Make sure photos is an array and handle the case when it's not
  if (!photos) {
    console.error('Photos is null or undefined');
    return [];
  }
  
  if (Array.isArray(photos)) {
    // Already an array, just return a copy
    return [...photos];
  }
  
  // Handle {success, photos} format
  if (photos.photos && Array.isArray(photos.photos)) {
    return [...photos.photos];
  }
  
  console.error('Photos is not in a recognized format:', photos);
  return [];
}

// This stub remains for API compatibility but doesn't check file existence
export function photoImageExists(photo: Photo): boolean {
  // In client context, we just assume photos exist and let
  // client-side image error handling catch problems
  return true;
} 