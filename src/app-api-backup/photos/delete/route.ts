import { NextResponse } from 'next/server';

// Simple placeholder route for static export
export async function POST() {
  return NextResponse.json({
    success: false,
    message: "Photo deletion not available in static export",
  });
}
