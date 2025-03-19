import { NextRequest, NextResponse } from 'next/server';
import { photos } from '@/lib/data';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    // Filter photos by category if provided
    let filteredPhotos = photos;
    if (category && category !== 'All') {
      filteredPhotos = photos.filter(photo => photo.category === category);
    }
    
    // In a real application, these would be fetched from a database
    return NextResponse.json({
      success: true,
      photos: filteredPhotos,
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
} 