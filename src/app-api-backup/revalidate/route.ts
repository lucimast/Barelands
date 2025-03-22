import { NextResponse } from 'next/server';

// Simple placeholder route for static export
export async function GET() {
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: 'Static site does not support runtime revalidation',
  });
}
