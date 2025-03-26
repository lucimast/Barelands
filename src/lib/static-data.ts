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
 * Utility function to fix image paths for GitHub Pages
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
    console.log("Not on GitHub Pages, keeping original paths");
    return photos;
  }
  
  // Get the base path (repository name) from the URL
  const path = window.location.pathname;
  let basePath = '';
  
  // Check for various GitHub Pages URL patterns
  if (path.includes('/Barelands/')) {
    basePath = '/Barelands';
  } else if (path.startsWith('/Barelands')) {
    basePath = '/Barelands';
  } else if (window.location.hostname.includes('github.io') || 
             window.location.hostname.includes('barelands') ||
             window.location.hostname.includes('lucimast')) {
    // We're on a custom domain or github.io domain, but without the repo name in path
    // For project sites on custom domains
    basePath = '/Barelands';
  }
  
  console.log(`GitHub Pages path fixing - Base path: "${basePath}"`);
  
  // No need to fix if we're not on a path with a base
  if (!basePath) {
    return photos;
  }
  
  // Fix image paths by adding the base path if needed
  const fixedPhotos = photos.map(photo => {
    if (!photo.image) return photo; // Skip if no image
    
    // If already has http or https, don't modify
    if (photo.image.startsWith('http')) {
      return photo;
    }
    
    // Only fix relative paths that don't already have the basePath
    if (photo.image.startsWith('/') && !photo.image.startsWith(basePath)) {
      const fixedPath = `${basePath}${photo.image}`;
      console.log(`Fixed path: "${photo.image}" → "${fixedPath}"`);
      
      return {
        ...photo,
        image: fixedPath
      };
    }
    
    return photo;
  });
  
  return fixedPhotos;
}

/**
 * Detects if we're in a static export environment
 */
export function isStaticExport(): boolean {
  // In development mode, always return false to use the API
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode, using API');
    return false;
  }
  
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