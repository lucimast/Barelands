#!/usr/bin/env node

/**
 * Utility script to import photos from a local directory
 * Usage: node scripts/import-photos.js <directory>
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Define categories for categorizing photos
const categories = ["Mountains", "Deserts", "Forests", "Oceans", "Night Sky"];

// Source directory containing photos to import
const sourceDirectory = process.argv[2] || '/Users/luciomastrosimone/Pictures/Barelands';

// Destination directory in public folder
const destDirectory = path.join(process.cwd(), 'public', 'uploads');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destDirectory)) {
  fs.mkdirSync(destDirectory, { recursive: true });
  console.log(`Created directory: ${destDirectory}`);
}

// Get list of image files from the source directory
function getImageFiles(directory) {
  try {
    const files = fs.readdirSync(directory);
    return files.filter(file => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(extension);
    });
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error.message);
    return [];
  }
}

// Copy image file from source to destination
function copyImage(sourceFile, destFile) {
  try {
    fs.copyFileSync(sourceFile, destFile);
    return true;
  } catch (error) {
    console.error(`Error copying file ${sourceFile} to ${destFile}:`, error.message);
    return false;
  }
}

// Generate a photo object for the data file
function generatePhotoObject(fileName, destPath) {
  // Extract title from filename (remove extension and replace dashes/underscores with spaces)
  const title = path.basename(fileName, path.extname(fileName))
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word

  // Randomly assign a category
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  // Generate a random location
  const locations = [
    "Dolomites, Italy",
    "Faroe Islands, Denmark",
    "Patagonia, Chile",
    "Swiss Alps, Switzerland",
    "Iceland",
    "Norway",
    "Japan",
    "New Zealand",
    "Canada"
  ];
  const location = locations[Math.floor(Math.random() * locations.length)];

  return {
    id: uuidv4(),
    title,
    category,
    image: `/uploads/${path.basename(destPath)}`,
    description: `Beautiful landscape photograph of ${title}`,
    location,
    featured: Math.random() > 0.7, // 30% chance of being featured
    dateAdded: new Date().toISOString(),
  };
}

// Main function
async function importPhotos() {
  console.log(`Importing photos from ${sourceDirectory}...`);
  
  const imageFiles = getImageFiles(sourceDirectory);
  
  if (imageFiles.length === 0) {
    console.log('No image files found');
    return;
  }
  
  console.log(`Found ${imageFiles.length} image files`);

  // Generate data for data.ts file
  const photos = [];

  // Process each image file
  for (const file of imageFiles) {
    const sourceFile = path.join(sourceDirectory, file);
    
    // Generate a unique filename to avoid conflicts
    const uniqueFileName = `${uuidv4()}${path.extname(file)}`;
    const destFile = path.join(destDirectory, uniqueFileName);
    
    console.log(`Copying ${file} to ${uniqueFileName}...`);
    
    // Copy the file
    if (copyImage(sourceFile, destFile)) {
      // Generate a photo object for the data file
      const photoObj = generatePhotoObject(file, uniqueFileName);
      photos.push(photoObj);
    }
  }

  // Update data.ts with the new photos
  if (photos.length > 0) {
    console.log(`Successfully imported ${photos.length} photos`);
    
    // Output the photos data to a JSON file, which can be manually added to data.ts
    const outputFile = path.join(process.cwd(), 'imported-photos.json');
    fs.writeFileSync(outputFile, JSON.stringify(photos, null, 2));
    
    console.log(`Photos data saved to ${outputFile}`);
    console.log('You can now manually add this data to src/lib/data.ts');
  }
}

importPhotos().catch(error => {
  console.error('Error importing photos:', error);
  process.exit(1);
}); 