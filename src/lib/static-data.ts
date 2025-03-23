// Static data utility functions for static export (GitHub Pages)
// This file is used for static export environments to load data without API calls

import { photos as defaultPhotos, Photo } from '@/lib/data';

/**
 * Returns a promise that resolves to the photos from the static data
 * This function mimics the API behavior but works in static exports
 */
export async function getStaticPhotoData(): Promise<Photo[]> {
  return [...defaultPhotos]; // Return a copy of the photos array
}

/**
 * Gets featured photos for slideshow without API calls
 */
export async function getStaticSlideshowPhotos(): Promise<Photo[]> {
  // Look for specific photos the user wants in the slideshow
  const specificPhotos = [
    // Find the Kallur Lighthouse photo
    defaultPhotos.find(photo => photo.title.includes("Kallur")),
    // Find the Cuernos Del Paine (Patagonia) photo
    defaultPhotos.find(photo => photo.title.includes("Cuernos Del Paine")),
    // Find the Iguazu Falls photo
    defaultPhotos.find(photo => photo.title.includes("Iguazu")),
  ].filter(Boolean) as Photo[];
  
  // If we have specific photos, return them
  if (specificPhotos.length > 0) {
    return specificPhotos;
  }
  
  // Fallback: use featured photos
  const featuredPhotos = defaultPhotos
    .filter(photo => photo.featured)
    .slice(0, 3);
  
  if (featuredPhotos.length > 0) {
    return featuredPhotos;
  }
  
  // Final fallback: first 3 photos
  return defaultPhotos.slice(0, Math.min(3, defaultPhotos.length));
}

/**
 * Detects if we're in a static export environment
 */
export function isStaticExport(): boolean {
  // In client-side code, we check if window exists and if we're on GitHub Pages
  if (typeof window !== 'undefined') {
    // Check if we're on GitHub Pages (hostname includes github.io or our custom domain)
    const isGitHubPages = window.location.hostname.includes('github.io') || 
                          window.location.hostname.includes('barelands');
    
    // Also check for the hostname in the URL path (for GitHub Pages with repository name in URL path)
    const isRepositoryPath = window.location.pathname.includes('/Barelands/');
    
    return isGitHubPages || isRepositoryPath;
  }
  
  // Server-side: If we're statically exporting, we'll default to true
  return true;
} 