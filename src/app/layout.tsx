import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { photos, Photo } from '@/lib/data';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    
    // Check if photos.json exists
    const dataPath = path.join(process.cwd(), 'data', 'photos.json');
    const fileExists = await fs.access(dataPath).then(() => true).catch(() => false);
    
    if (fileExists) {
      try {
        const jsonData = await fs.readFile(dataPath, 'utf-8');
        const storedPhotos = JSON.parse(jsonData);
        
        // Validate that we have an array of photos
        if (!Array.isArray(storedPhotos)) {
          throw new Error('Invalid photos.json format: not an array');
        }
        
        // Verify each photo has required fields
        storedPhotos.forEach((photo: any, index: number) => {
          if (!photo.id || !photo.title || !photo.image) {
            console.warn(`Warning: Photo at index ${index} missing required fields`);
          }
        });
        
        // Clear the in-memory array to start fresh
        photos.length = 0;
        
        // Create a map of IDs to ensure uniqueness
        const photoMap = new Map<string, Photo>();
        
        // First add default photos
        defaultPhotos.forEach(photo => {
          photoMap.set(photo.id, photo);
        });
        
        // Then add stored photos (will override defaults with same ID)
        storedPhotos.forEach((photo: Photo) => {
          photoMap.set(photo.id, photo);
        });
        
        // Convert the map back to an array 
        const mergedPhotos = Array.from(photoMap.values());
        
        // Verify each photo's image exists and filter out those with missing images
        const validPhotos = mergedPhotos.filter(photo => {
          const imagePath = path.join(process.cwd(), 'public', photo.image.replace(/^\//, ''));
          const exists = existsSync(imagePath);
          if (!exists) {
            console.warn(`Warning: Removing photo due to missing image file: ${imagePath} for photo: ${photo.title}`);
            return false;
          }
          return true;
        });
        
        // Update photos array with only valid photos
        validPhotos.forEach(photo => {
          photos.push(photo);
        });
        
        // Save the validated collection back to json
        await fs.mkdir(path.dirname(dataPath), { recursive: true });
        await fs.writeFile(dataPath, JSON.stringify(photos, null, 2));
        
        console.log(`Initialized ${photos.length} photos (filtered from ${mergedPhotos.length} total)`);
      } catch (error) {
        console.error('Error parsing photos.json, using default photos:', error);
        // Reset to defaults if JSON parsing fails
        photos.length = 0;
        defaultPhotos.forEach(photo => photos.push(photo));
        
        // Create a valid JSON file with defaults
        await fs.mkdir(path.dirname(dataPath), { recursive: true });
        await fs.writeFile(dataPath, JSON.stringify(defaultPhotos, null, 2));
      }
    } else {
      // If photos.json doesn't exist, create it with the default photos
      photos.length = 0;
      defaultPhotos.forEach(photo => photos.push(photo));
      
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
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
