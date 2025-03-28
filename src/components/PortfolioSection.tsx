"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { photoCategories, type Photo } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { filterValidPhotos } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { FiMaximize, FiMinimize, FiX } from "react-icons/fi";
import { isStaticExport, getStaticPhotoData } from "@/lib/static-data";
import PhotoItem from "@/components/PhotoItem";

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMounted, setIsMounted] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Photo[]>([]);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHomepage, setIsHomepage] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [isStatic, setIsStatic] = useState(false);
  const photosLoadedRef = useRef(false);

  // Check if we're on the homepage and if we're in static export
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // More comprehensive check for URL structure
      const path = window.location.pathname;
      
      // All possible homepage URL patterns
      const isRootPath = path === '/' || 
                         path === '/index.html' || 
                         path === '';
      const isGitHubPagesRoot = path === '/Barelands/' || 
                                path === '/Barelands/index.html' || 
                                path === '/Barelands' ||
                                path === '/Barelands/index';
      
      console.log(`Current path: ${path}, hostname: ${window.location.hostname}`);
      
      // Set homepage flag - applies to both GitHub Pages and custom domain
      const homepageStatus = isRootPath || isGitHubPagesRoot;
      setIsHomepage(homepageStatus);
      
      // Check the static environment
      const staticStatus = isStaticExport();
      setIsStatic(staticStatus);
      
      // Check for photo ID in URL
      const urlParams = new URLSearchParams(window.location.search);
      const photoId = urlParams.get('photo');
      if (photoId) {
        setSelectedPhotoId(photoId);
      }
      
      console.log(`PortfolioSection init - Path: ${path}, isHomepage: ${homepageStatus}, isStatic: ${staticStatus}`);
    }
  }, []);

  // Fetch photos from API or static data - separated from category change
  useEffect(() => {
    // Only fetch once on component mount
    if (photosLoadedRef.current) {
      console.log("Photos already loaded, skipping fetch");
      return;
    }
    
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        
        let validPhotos: Photo[] = [];
        
        // Check if we're in static export mode
        if (isStatic) {
          // Use static data instead of API
          console.log("Using static photo data");
          validPhotos = await getStaticPhotoData();
          
          // Fix paths for GitHub Pages directly if needed
          if (typeof window !== 'undefined') {
            const needsPathFix = window.location.hostname.includes('github.io') || 
                window.location.pathname.includes('/Barelands/');
            
            if (needsPathFix) {
              validPhotos = validPhotos.map(photo => {
                if (photo.image && photo.image.startsWith('/') && !photo.image.startsWith('/Barelands/')) {
                  return {
                    ...photo,
                    image: `/Barelands${photo.image}`
                  };
                }
                return photo;
              });
              
              console.log("Portfolio: Fixed GitHub Pages paths");
            }
          }
        } else {
          // Use API in development mode
          try {
            const response = await fetch('/api/photos');
            
            if (!response.ok) {
              throw new Error(`API responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Handle both direct array response and object with photos property
            if (Array.isArray(data)) {
              console.log("API returned a direct array");
              validPhotos = filterValidPhotos(data);
            } else if (data && data.success === true && Array.isArray(data.photos)) {
              console.log("API returned an object with photos property");
              validPhotos = filterValidPhotos(data.photos);
            } else {
              console.error("API returned invalid data format:", data);
              throw new Error("API returned invalid data format");
            }
          } catch (apiError) {
            console.error('API fetch failed, falling back to static data:', apiError);
            // Fallback to static data even in development if API fails
            validPhotos = await getStaticPhotoData();
          }
        }
        
        if (!validPhotos || validPhotos.length === 0) {
          console.error("No photos loaded, throwing error");
          throw new Error("No photos could be loaded");
        }
        
        console.log(`Loaded ${validPhotos.length} photos`);
        
        // On homepage, filter to only show featured photos
        // On portfolio page, show all photos
        const photosToDisplay = isHomepage 
          ? validPhotos.filter(photo => photo.featured) 
          : validPhotos;
        
        console.log(`Photos to display: ${photosToDisplay.length}, isHomepage: ${isHomepage}`);
        
        // Set allPhotos first - store ALL photos for client-side filtering
        setAllPhotos(validPhotos);
        
        // Then apply filtering based on homepage status and category
        applyFilters(validPhotos, isHomepage, activeCategory);
        
        setError(null);
        photosLoadedRef.current = true;
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos. Please try again.');
      } finally {
        setIsLoading(false);
        setIsMounted(true);
      }
    };

    fetchPhotos();
  }, [isStatic, activeCategory]);

  // Separate effect to handle homepage status changes
  useEffect(() => {
    if (allPhotos.length > 0) {
      console.log(`Homepage status changed to: ${isHomepage}, refiltering photos`);
      applyFilters(allPhotos, isHomepage, activeCategory);
    }
  }, [isHomepage, activeCategory]);

  // Helper function to apply filters consistently
  const applyFilters = (photos: Photo[], onHomepage: boolean, category: string) => {
    // First filter by homepage status
    console.log("FILTERING - All photos:", photos);
    const filteredByFeatured = onHomepage 
      ? photos.filter(photo => {
          // Extra safety: make sure we strictly check for true to avoid any falsy/truthy issues
          const isIncluded = photo.featured === true;
          console.log(`Photo ${photo.title} - featured: ${photo.featured} (${typeof photo.featured}) - included: ${isIncluded}`);
          return isIncluded;
        })
      : photos;
    console.log("FILTERING - Featured photos:", filteredByFeatured);
    
    console.log(`Filtered by featured: ${filteredByFeatured.length} photos`);
    
    // Then filter by category
    if (category === "All") {
      setFilteredItems(filteredByFeatured);
    } else {
      const filtered = filteredByFeatured.filter(photo => photo.category === category);
      console.log(`Filtered by category "${category}": ${filtered.length} photos`);
      setFilteredItems(filtered);
    }
  };

  // Effect to log filteredItems when they change
  useEffect(() => {
    if (filteredItems.length > 0) {
      console.log("RENDERING - Photos that will be displayed:", filteredItems.map(item => ({
        id: item.id,
        title: item.title,
        featured: item.featured
      })));
    }
  }, [filteredItems]);

  // Handle category change without fetching data again
  const handleCategoryChange = (category: string) => {
    console.log(`Category changed to: ${category}, refiltering photos from ${allPhotos.length} items`);
    setActiveCategory(category);
    
    // Only filter if we have photos to filter
    if (allPhotos.length === 0) {
      console.log("No photos to filter");
      return;
    }
    
    // Apply filters
    applyFilters(allPhotos, isHomepage, category);
    
    // Track category filter event
    trackEvent('category_filter', { category });
  };

  // Manual retry function
  const retryFetch = () => {
    console.log("Manual retry initiated");
    setIsLoading(true);
    setError(null);
    photosLoadedRef.current = false; // Reset the loaded flag
  };

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  // Render the portfolio section
  return (
    <section id="portfolio" className="py-24 bg-zinc-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">{isHomepage ? "A selection of my works" : "Portfolio"}</h2>
          <div className="w-20 h-1 bg-zinc-400 mx-auto mb-6"></div>
          <p className="text-zinc-400 max-w-3xl mx-auto mb-12">
            A collection of my finest landscape photographs from around the world, each capturing a unique moment in time
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {photoCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category
                  ? "bg-white text-zinc-900 font-medium"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-zinc-500 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading photos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={retryFetch}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Masonry Grid - Only render when loaded and mounted */}
        {!isLoading && !error && isMounted && filteredItems.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <PhotoItem item={item} selectedPhotoId={selectedPhotoId} />
              </motion.div>
            ))}
          </Masonry>
        )}

        {/* No Photos State */}
        {!isLoading && !error && isMounted && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400">No photos found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
