"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { photoCategories, type Photo } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { filterValidPhotos } from "@/lib/storage";

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMounted, setIsMounted] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Photo[]>([]);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch photos from API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/photos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        const validPhotos = filterValidPhotos(data);
        setAllPhotos(validPhotos);
        
        // Apply category filter
        if (activeCategory === "All") {
          setFilteredItems(validPhotos);
        } else {
          setFilteredItems(validPhotos.filter((photo) => photo.category === activeCategory));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos. Please try again.');
      } finally {
        setIsLoading(false);
        setIsMounted(true);
      }
    };

    fetchPhotos();
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Apply new category filter
    if (category === "All") {
      setFilteredItems(allPhotos);
    } else {
      setFilteredItems(allPhotos.filter(item => item.category === category));
    }
    
    // Track category filter event
    trackEvent('category_filter', { category });
  };

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    640: 1
  };

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
          <h2 className="text-3xl font-bold mb-2">Portfolio</h2>
          <div className="w-20 h-1 bg-zinc-400 mx-auto mb-6"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            A collection of my finest landscape photographs from around the world,
            each capturing a unique moment in time and nature&apos;s spectacular beauty.
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
              onClick={() => window.location.reload()}
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
                <PhotoItem item={item} />
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

function PhotoItem({ item }: { item: Photo }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Default to assuming landscape orientation
  const [isPortrait, setIsPortrait] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if the image is portrait-oriented
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use a safer approach without direct Image constructor
      const checkImageOrientation = () => {
        const img = document.createElement('img');
        img.onload = () => {
          setIsPortrait(img.height > img.width);
        };
        img.onerror = () => {
          setImageError(true);
        };
        img.src = item.image;
      };
      
      checkImageOrientation();
    }
  }, [item.image]);

  // Track photo view event when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      trackEvent('photo_view', { 
        photo_id: item.id,
        photo_title: item.title,
        photo_category: item.category 
      });
    }
  }, [isDialogOpen, item]);

  // Don't render if image failed to load
  if (imageError) {
    return null;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg">
          {/* Use auto aspect ratio to adapt to image orientation */}
          <div className={`${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'} w-full relative`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white text-lg font-medium">{item.title}</h3>
            <p className="text-zinc-300 text-sm">{item.location}</p>
          </div>
        </div>
      </DialogTrigger>
      {isDialogOpen && (
        <DialogContent className="sm:max-w-4xl bg-zinc-900 border-zinc-800">
          <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <div className={`grid ${isPortrait ? 'md:grid-cols-[40%_60%]' : 'md:grid-cols-[60%_40%]'} gap-6`}>
            <div className={`relative ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'} w-full`}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-md"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-zinc-400 mb-4">{item.location}</p>
              <p className="text-zinc-300">{item.description}</p>
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <h4 className="text-sm font-medium text-zinc-400 mb-2">Category</h4>
                <span className="inline-block px-3 py-1 bg-zinc-800 rounded-full text-xs">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
