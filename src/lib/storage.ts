import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
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

export function generateImageUrl(fileName: string, folder: string = 'uploads'): string {
  return `/${folder}/${fileName}`;
}

export async function createUploadFolderIfNeeded(uploadDir?: string): Promise<void> {
  const dirPath = uploadDir || path.join(process.cwd(), 'public', 'uploads');
  
  if (!existsSync(dirPath)) {
    try {
      await mkdir(dirPath, { recursive: true });
      console.log(`Created uploads directory at ${dirPath}`);
    } catch (error) {
      console.error('Error creating uploads directory:', error);
      throw new Error('Failed to create uploads directory');
    }
  }
} 