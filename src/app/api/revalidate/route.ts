import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Configure as a dynamic API route during runtime
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// A simplified version for static export
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    
    // Revalidate the path
    revalidatePath(path);
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      revalidated: false, 
      message: errorMessage
    }, { status: 500 });
  }
} 