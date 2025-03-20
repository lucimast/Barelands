import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// A simple secret to add minimal security
const REVALIDATION_SECRET = 'barelands_secret_key';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');
  const tag = request.nextUrl.searchParams.get('tag');

  // Check the secret
  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }

  // Check if either path or tag is provided
  if (!path && !tag) {
    return NextResponse.json(
      { message: 'Path or tag parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Revalidate the path if provided
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    // Revalidate the tag if provided
    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path: path || null,
      tag: tag || null
    });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
} 