import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { saveImageToLocal, createUploadFolderIfNeeded } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';
import { photos } from '@/lib/data';
import { Photo } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the request body
    const data = await req.json();
    const { image, title, category, description, location } = data;

    if (!image || !title || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure the uploads folder exists
    await createUploadFolderIfNeeded();

    // Save the image to the uploads folder
    const imagePath = await saveImageToLocal(image);

    // Create a new photo object
    const newPhoto: Photo = {
      id: uuidv4(),
      title,
      category,
      description,
      location,
      image: imagePath,
      dateAdded: new Date().toISOString(),
    };

    // In a real application, you would add this to a database
    // For this demo, we'll just return the new photo data
    // In a real application, you might use a database like MongoDB, PostgreSQL, or even 
    // a simple JSON file for persistence

    return NextResponse.json({ 
      success: true, 
      photo: newPhoto 
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
} 