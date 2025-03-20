import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import path from 'path';

export const metadata: Metadata = {
  title: "Barelands | Landscape Photography",
  description: "Capturing the breathtaking beauty of landscapes from around the world",
  icons: {
    icon: '/favicon.ico',
  },
};

// Initialize the photos data from the JSON file
async function initializePhotosData() {
  try {
    // Save current photos as default photos
    const defaultPhotos = [...photos];
    
    // Set to store unique photo IDs to avoid duplicates
    const uniquePhotoIds = new Set(defaultPhotos.map(photo => photo.id));
    
    // Check if photos.json exists
    const dataPath = path.join(process.cwd(), 'data', 'photos.json');
    const fileExists = await fs.access(dataPath).then(() => true).catch(() => false);
    
    if (fileExists) {
      const jsonData = await fs.readFile(dataPath, 'utf-8');
      const storedPhotos = JSON.parse(jsonData);
      
      // Clear the in-memory array to start fresh
      photos.length = 0;
      
      // First add all default photos from data.ts
      defaultPhotos.forEach(photo => {
        photos.push(photo);
      });
      
      // Then add any photos from JSON that aren't duplicates
      storedPhotos.forEach((photo: Photo) => {
        if (!uniquePhotoIds.has(photo.id)) {
          photos.push(photo);
          uniquePhotoIds.add(photo.id);
        }
      });
      
      // Save the complete merged collection back to json
      await fs.mkdir(path.dirname(dataPath), { recursive: true });
      await fs.writeFile(dataPath, JSON.stringify(photos, null, 2));
      
      console.log(`Initialized ${photos.length} photos (${defaultPhotos.length} default + ${storedPhotos.length} stored)`);
    } else {
      // If photos.json doesn't exist, create it with the default photos
      await fs.mkdir(path.dirname(dataPath), { recursive: true });
      await fs.writeFile(dataPath, JSON.stringify(defaultPhotos, null, 2));
      console.log(`Created photos.json with ${defaultPhotos.length} default photos`);
    }
  } catch (error) {
    console.error('Failed to initialize photos data:', error);
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize photos data on server render
  await initializePhotosData();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased bg-zinc-900 text-zinc-100`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
