import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Add static export configuration
export const dynamic = 'force-static';

// Add generateStaticParams for static export
export function generateStaticParams() {
  return [];
}

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    
    if (!path) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      );
    }

    // Revalidate the specified path
    revalidatePath(path);

    return NextResponse.json({
      success: true,
      message: `Revalidated path: ${path}`
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
} 