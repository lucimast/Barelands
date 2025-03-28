import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { photos } from '@/lib/data';

export const dynamic = 'force-static';

// Generate static params for all photo IDs
export function generateStaticParams() {
  return photos.map(photo => ({
    id: photo.id,
  }));
}

// Rest of the file unchanged... 