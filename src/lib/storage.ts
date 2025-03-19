import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * This is a simplified storage implementation for demonstration purposes.
 * In production, you would use a cloud storage service like AWS S3, Google Cloud Storage,
 * or a specialized service like Cloudinary or Uploadcare.
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
    
    // Generate a unique filename
    const fileExtension = type.split('/')[1];
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Determine the folder path
    const publicDir = path.join(process.cwd(), 'public');
    const uploadDir = path.join(publicDir, folder);
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

export function generateImageUrl(fileName: string, folder: string = 'uploads'): string {
  return `/${folder}/${fileName}`;
}

export async function createUploadFolderIfNeeded(): Promise<void> {
  // This would create the uploads folder if it doesn't exist
  // For simplicity, we'll assume it exists in this demo
  // In production, you would check if the folder exists and create it if needed
  
  // const fs = require('fs');
  // const publicDir = path.join(process.cwd(), 'public');
  // const uploadDir = path.join(publicDir, 'uploads');
  
  // if (!fs.existsSync(uploadDir)) {
  //   fs.mkdirSync(uploadDir, { recursive: true });
  // }
} 