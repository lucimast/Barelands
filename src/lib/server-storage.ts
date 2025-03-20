'use server';

import { Photo } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { unlink, mkdir, writeFile } from 'fs/promises';

/**
 * This file contains server-only storage functions.
 * These functions can only be imported and used in Server Components or Route Handlers.
 */

export async function saveImageToLocal(
  base64Image: string,
  folder: string = 'uploads'
): Promise<string> {
  try {
    // Extract the file data and type from the base64 string
    const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }
    
    const type = matches[1];
    const data = Buffer.from(matches[2], 'base64');
    
    // Get file extension - handle special cases
    let fileExtension = 'jpg'; // Default extension
    if (type.includes('/')) {
      const mimeType = type.split('/')[1];
      // Map common mime types to file extensions
      if (mimeType === 'jpeg' || mimeType === 'jpg') fileExtension = 'jpg';
      else if (mimeType === 'png') fileExtension = 'png';
      else if (mimeType === 'gif') fileExtension = 'gif';
      else if (mimeType === 'webp') fileExtension = 'webp';
      else if (mimeType === 'svg+xml') fileExtension = 'svg';
      else fileExtension = mimeType; // Use mime subtype as extension
    }
    
    // Generate a unique filename
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Determine the folder path
    const publicDir = path.join(process.cwd(), 'public');
    const uploadDir = path.join(publicDir, folder);
    
    // Ensure the upload directory exists
    await createUploadFolderIfNeeded(uploadDir);
    
    const filePath = path.join(uploadDir, fileName);
    
    // Write the file
    await writeFile(filePath, data);
    
    // Return the public URL to the file
    return `/${folder}/${fileName}`;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
}

export async function createUploadFolderIfNeeded(uploadDir?: string): Promise<void> {
  const dirPath = uploadDir || path.join(process.cwd(), 'public', 'uploads');
  
  if (!fs.existsSync(dirPath)) {
    try {
      await mkdir(dirPath, { recursive: true });
      console.log(`Created uploads directory at ${dirPath}`);
    } catch (error) {
      console.error('Error creating uploads directory:', error);
      throw new Error('Failed to create uploads directory');
    }
  }
}

export async function deleteImageFile(imagePath: string): Promise<boolean> {
  try {
    if (!imagePath.startsWith('/uploads/')) {
      return false; // Only delete from uploads folder for safety
    }
    
    // Remove leading slash and get full file path
    const relativePath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const filePath = path.join(process.cwd(), 'public', relativePath);
    
    // Check if file exists before attempting deletion
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      console.log(`File ${filePath} does not exist, skipping deletion`);
      return false;
    }
    
    // Delete the file
    await unlink(filePath);
    console.log(`Deleted image file: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error deleting image file: ${imagePath}`, error);
    return false;
  }
}

export async function filterValidPhotos(photos: Photo[]): Promise<Photo[]> {
  // Use Promise.all to handle async filtering
  const validationResults = await Promise.all(
    photos.map(async photo => {
      const isValid = await photoImageExists(photo);
      return { photo, isValid };
    })
  );
  
  return validationResults
    .filter(result => result.isValid)
    .map(result => result.photo);
}

export async function photoImageExists(photo: Photo): Promise<boolean> {
  if (!photo || !photo.image) return false;
  
  // Handle built-in images that aren't in uploads folder
  if (!photo.image.startsWith('/uploads/')) return true;
  
  // Remove leading slash and get full file path
  const relativePath = photo.image.startsWith('/') ? photo.image.substring(1) : photo.image;
  const filePath = path.join(process.cwd(), 'public', relativePath);
  
  // Check if file exists - use try/catch for async safety
  try {
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      console.warn(`Warning: Image file not found: ${filePath} for photo: ${photo.title}`);
    }
    return fileExists;
  } catch (error) {
    console.error(`Error checking if file exists: ${filePath}`, error);
    return false;
  }
} 