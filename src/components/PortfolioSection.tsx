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
  const initialLoadDoneRef = useRef(false);

  // Single useEffect for initial setup
  useEffect(() => {
    if (initialLoadDoneRef.current) return;
    initialLoadDoneRef.current = true;

    const init = async () => {
      if (typeof window !== 'undefined') {
        // Check environment
        const staticStatus = isStaticExport();
        setIsStatic(staticStatus);
        
        // Check homepage status
        const path = window.location.pathname;
        const isRootPath = path === '/' || path === '/index.html' || path === '';
        const isGitHubPagesRoot = path === '/Barelands/' || 
                                 path === '/Barelands/index.html' || 
                                 path === '/Barelands' ||
                                 path === '/Barelands/index';
        
        const homepageStatus = isRootPath || isGitHubPagesRoot;
        setIsHomepage(homepageStatus);
        
        // Check for photo ID in URL
        const urlParams = new URLSearchParams(window.location.search);
        const photoId = urlParams.get('photo');
        if (photoId) {
          setSelectedPhotoId(photoId);
        }

        // Load photos
        try {
          let validPhotos: Photo[] = [];
          
          if (staticStatus) {
            validPhotos = await getStaticPhotoData();
          } else {
            try {
              const response = await fetch('/api/photos');
              if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
              }
              const data = await response.json();
              validPhotos = Array.isArray(data) ? filterValidPhotos(data) : 
                           (data?.success && Array.isArray(data.photos)) ? filterValidPhotos(data.photos) : [];
            } catch (apiError) {
              console.error('API fetch failed, falling back to static data:', apiError);
              validPhotos = await getStaticPhotoData();
            }
          }

          if (!validPhotos || validPhotos.length === 0) {
            throw new Error("No photos could be loaded");
          }

          // Set all photos and apply initial filtering
          setAllPhotos(validPhotos);
          const initialFiltered = homepageStatus ? validPhotos.filter(photo => photo.featured) : validPhotos;
          setFilteredItems(initialFiltered);
          setError(null);
        } catch (err) {
          console.error('Error fetching photos:', err);
          setError('Failed to load photos. Please try again.');
        } finally {
          setIsLoading(false);
          setIsMounted(true);
        }
      }
    };

    init();
  }, []);

  // Handle category changes without fetching data again
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (allPhotos.length === 0) return;

    const basePhotos = isHomepage ? allPhotos.filter(photo => photo.featured) : allPhotos;
    const newFiltered = category === "All" ? basePhotos : basePhotos.filter(photo => photo.category === category);
    setFilteredItems(newFiltered);
    trackEvent('category_filter', { category });
  };

  // Manual retry function
  const retryFetch = () => {
    initialLoadDoneRef.current = false;
    setIsLoading(true);
    setError(null);
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
