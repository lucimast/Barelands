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

// Client-safe version of filterValidPhotos that doesn't check file existence
export function filterValidPhotos(photos: Photo[]): Photo[] {
  // In client context, we just return all photos and let client-side 
  // error handling catch loading problems
  return [...photos]; // Return a copy to avoid modifying the original
}

// This stub remains for API compatibility but doesn't check file existence
export function photoImageExists(photo: Photo): boolean {
  // In client context, we just assume photos exist and let
  // client-side image error handling catch problems
  return true;
} 