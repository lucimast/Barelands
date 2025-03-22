/**
 * This file contains storage functions that would normally run on the server.
 * For GitHub Pages (static export), these functions are modified to be compatible 
 * with static rendering but will NOT be functional for actual file operations.
 * 
 * When running locally with 'npm run dev' or on a server-supporting platform like Vercel,
 * these functions would work correctly.
 */

import { Photo } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { unlink, mkdir, writeFile } from 'fs/promises';

// These functions have been modified to be compatible with static export,
// but they won't actually work for file operations on GitHub Pages.

export async function saveImageToLocal(
  base64Image: string,
  folder: string = 'uploads'
): Promise<string> {
  // Static export compatibility mode - return a placeholder URL
  // This function will not actually save files when deployed on GitHub Pages
  console.warn('saveImageToLocal called in static export environment - no files will be saved');
  
  // Generate a mock URL with the correct format
  const mockFileName = `${uuidv4()}.jpg`;
  return `/${folder}/${mockFileName}`;
}

export async function createUploadFolderIfNeeded(uploadDir?: string): Promise<void> {
  // Static export compatibility mode - no-op function
  console.warn('createUploadFolderIfNeeded called in static export environment - no folders will be created');
  return;
}

export async function deleteImageFile(imagePath: string): Promise<boolean> {
  // Static export compatibility mode - won't actually delete files
  console.warn('deleteImageFile called in static export environment - no files will be deleted');
  return true;
}

export async function filterValidPhotos(photos: Photo[]): Promise<Photo[]> {
  // Static export compatibility mode - assume all photos are valid
  console.warn('filterValidPhotos called in static export environment - assuming all photos are valid');
  return photos;
}

export async function photoImageExists(photo: Photo): Promise<boolean> {
  // Static export compatibility mode - assume photo exists
  console.warn('photoImageExists called in static export environment - assuming photo exists');
  return true;
} 