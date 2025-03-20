"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { photos, Photo } from "@/lib/data";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { filterValidPhotos } from "@/lib/storage";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideshowPhotos, setSlideshowPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Initialize slideshow photos and handle updates
  useEffect(() => {
    // Function to get featured photos for the slideshow
    const getFeatureFeaturedPhotos = () => {
      // Since we're on the client side, we can't check file existence
      // Use client-safe filtering that will be handled in the filterValidPhotos function
      const validPhotos = filterValidPhotos(photos);
      
      // Filter out photos with failed images during runtime
      const usablePhotos = validPhotos.filter(photo => !failedImages.has(photo.image));
      
      if (usablePhotos.length === 0) {
        console.warn('No valid photos found for slideshow');
        return [];
      }
      
      // Primary preference: specific named photos if they exist
      const preferredPhotos = [
        // Find the Cuernos Del Paine Beach photo
        usablePhotos.find(photo => photo.title.includes("Cuernos Del Paine")),
        // Find the Iguazu Falls photo
        usablePhotos.find(photo => photo.title.includes("Iguazu")),
        // Find the Kallur Lighthouse photo with ducks
        usablePhotos.find(photo => photo.title.includes("Kallur") && photo.description?.includes("ducks"))
      ].filter(Boolean) as Photo[];
      
      // If we have at least 3 preferred photos, use them
      if (preferredPhotos.length >= 3) {
        return preferredPhotos;
      }
      
      // Otherwise, fall back to any featured photos
      const featuredPhotos = usablePhotos.filter(photo => photo.featured).slice(0, 3);
      if (featuredPhotos.length > 0) {
        return featuredPhotos;
      }
      
      // Final fallback: just use the first 3 valid photos
      return usablePhotos.slice(0, Math.min(3, usablePhotos.length));
    };
    
    // Set the slideshow photos
    const selectedPhotos = getFeatureFeaturedPhotos();
    setSlideshowPhotos(selectedPhotos);
    setIsLoading(false);
    
    // Reset current slide if it's now out of bounds
    if (currentSlide >= selectedPhotos.length) {
      setCurrentSlide(0);
    }
  }, [photos, currentSlide, failedImages]); // Re-run when photos array or failed images change

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slideshowPhotos.length === 0) return;
    
    // Auto-advance slides every 6 seconds
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowPhotos.length);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, isAutoPlaying, slideshowPhotos.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause autoplay when manually changing slides
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    if (slideshowPhotos.length === 0) return;
    goToSlide((currentSlide + 1) % slideshowPhotos.length);
  };

  const prevSlide = () => {
    if (slideshowPhotos.length === 0) return;
    goToSlide((currentSlide - 1 + slideshowPhotos.length) % slideshowPhotos.length);
  };

  const handleImageError = (imagePath: string) => {
    console.error("Failed to load slideshow image:", imagePath);
    
    // Add to failed images set
    setFailedImages(prev => {
      const updated = new Set(prev);
      updated.add(imagePath);
      return updated;
    });
    
    // If the current slide image fails, advance to the next slide
    if (slideshowPhotos.length > 1 && slideshowPhotos[currentSlide]?.image === imagePath) {
      console.log("Advancing slide due to image load failure");
      // Use setTimeout to avoid state update conflicts
      setTimeout(nextSlide, 100);
    }
  };

  // Safely get the current photo
  const getCurrentPhoto = (): Photo | null => {
    if (!slideshowPhotos.length || currentSlide >= slideshowPhotos.length) {
      return null;
    }
    return slideshowPhotos[currentSlide];
  };

  // For server-side rendering or loading state
  if (!isMounted || isLoading) {
    return (
      <section className="relative w-full h-screen bg-black">
        <div className="absolute inset-0 bg-zinc-900/70 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-white">Loading...</h2>
        </div>
      </section>
    );
  }

  // If no valid photos available
  if (slideshowPhotos.length === 0) {
    return (
      <section className="relative w-full h-screen bg-black">
        <div className="absolute inset-0 bg-zinc-900/70 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-white">Barelands</h2>
          <p className="text-xl text-white mt-4">Spectacular landscape photography</p>
        </div>
      </section>
    );
  }

  const currentPhoto = getCurrentPhoto();

  return (
    <section className="relative w-full h-screen bg-black">
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={currentPhoto.image}
              alt={currentPhoto.title}
              fill
              sizes="100vw"
              priority={currentSlide === 0}
              className="object-cover"
              onError={() => handleImageError(currentPhoto.image)}
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Barelands</h1>
          <p className="text-xl md:text-2xl mb-8">
            Breathtaking landscape photography from around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/prints">Buy a Print</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Slideshow controls */}
      {slideshowPhotos.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {slideshowPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
