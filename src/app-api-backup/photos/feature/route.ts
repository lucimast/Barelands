import { NextResponse } from 'next/server';

// Simple placeholder route for static export
export async function POST() {
  return NextResponse.json({
    success: false,
    message: "Featuring photos not available in static export",
  }, { status: 403 });
}
