// Static data utility functions for static export (GitHub Pages)
// This file is used for static export environments to load data without API calls

import { photos as defaultPhotos, Photo } from '@/lib/data';

/**
 * Returns a promise that resolves to the photos from the static data
 * This function mimics the API behavior but works in static exports
 */
export async function getStaticPhotoData(): Promise<Photo[]> {
  return fixImagePathsForGitHubPages([...defaultPhotos]); // Return a copy with fixed paths
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
    return fixImagePathsForGitHubPages([...specificPhotos]);
  }
  
  // Fallback: use featured photos
  const featuredPhotos = defaultPhotos
    .filter(photo => photo.featured)
    .slice(0, 3);
  
  if (featuredPhotos.length > 0) {
    return fixImagePathsForGitHubPages([...featuredPhotos]);
  }
  
  // Final fallback: first 3 photos
  return fixImagePathsForGitHubPages([...defaultPhotos.slice(0, Math.min(3, defaultPhotos.length))]);
}

/**
 * Fix image paths for GitHub Pages
 */
export function fixImagePathsForGitHubPages(photos: Photo[]): Photo[] {
  // Only run in client-side code
  if (typeof window === 'undefined') {
    return photos;
  }
  
  // Check if we're on GitHub Pages
  const isGitHubPages = isStaticExport();
  
  // Only fix paths if we're on GitHub Pages
  if (!isGitHubPages) {
    return photos;
  }
  
  // Fix image paths
  return photos.map(photo => {
    if (!photo.image) return photo; // Skip if no image
    
    // Skip if already has http/https or already has /Barelands/ prefix
    if (photo.image.startsWith('http') || photo.image.includes('/Barelands/')) {
      return photo;
    }
    
    // Add /Barelands prefix to relative paths
    if (photo.image.startsWith('/')) {
      return {
        ...photo,
        image: `/Barelands${photo.image}`
      };
    }
    
    return photo;
  });
}

/**
 * Detects if we're in a static export environment
 */
export function isStaticExport(): boolean {
  // In client-side code, we check if window exists and if we're on GitHub Pages
  if (typeof window !== 'undefined') {
    // Check if we're on GitHub Pages (hostname includes github.io or our custom domain)
    const isGitHubPages = window.location.hostname.includes('github.io') || 
                          window.location.hostname.includes('barelands') ||
                          window.location.hostname.includes('lucimast');
    
    // Also check for the hostname in the URL path (for GitHub Pages with repository name in URL path)
    const isRepositoryPath = window.location.pathname.includes('/Barelands/');
    
    return isGitHubPages || isRepositoryPath;
  }
  
  // Server-side: If we're statically exporting, we'll default to true
  return true;
} 