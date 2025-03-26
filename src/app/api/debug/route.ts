import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Add static export configuration
export const dynamic = 'force-static';

// Add generateStaticParams for static export
export function generateStaticParams() {
  return [];
}

export async function GET(req: NextRequest) {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'photos.json');
    let fileContents = 'File does not exist';
    let fileStats = null;
    
    if (fs.existsSync(dataPath)) {
      fileContents = fs.readFileSync(dataPath, 'utf-8');
      fileStats = fs.statSync(dataPath);
    }
    
    // Get a list of all files in the data directory
    const dataDir = path.join(process.cwd(), 'data');
    let dirContents: string[] = [];
    
    if (fs.existsSync(dataDir)) {
      dirContents = fs.readdirSync(dataDir);
    }
    
    return NextResponse.json({
      dataPath,
      fileExists: fs.existsSync(dataPath),
      fileSize: fileStats ? fileStats.size : 0,
      fileContents,
      dirContents,
      dirExists: fs.existsSync(dataDir)
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
} 