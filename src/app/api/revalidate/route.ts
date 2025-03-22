import { NextResponse } from 'next/server';

// Add static export configuration
export const dynamic = 'force-static';
export const revalidate = false;

// A simplified version for static export
export async function GET() {
  return NextResponse.json({ 
    revalidated: true, 
    now: Date.now(),
    message: 'Revalidation not available in static export'
  });
} 