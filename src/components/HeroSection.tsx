"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { photos, Photo } from "@/lib/data";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideshowPhotos, setSlideshowPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize slideshow photos and handle updates
  useEffect(() => {
    // Function to get featured photos for the slideshow
    const getFeatureFeaturedPhotos = () => {
      // Primary preference: specific named photos if they exist
      const preferredPhotos = [
        // Find the Cuernos Del Paine Beach photo
        photos.find(photo => photo.title.includes("Cuernos Del Paine")),
        // Find the Iguazu Falls photo
        photos.find(photo => photo.title.includes("Iguazu")),
        // Find the Kallur Lighthouse photo with ducks
        photos.find(photo => photo.title.includes("Kallur") && photo.description.includes("ducks"))
      ].filter(Boolean) as Photo[];
      
      // If we have at least 3 preferred photos, use them
      if (preferredPhotos.length >= 3) {
        return preferredPhotos;
      }
      
      // Otherwise, fall back to any featured photos
      const featuredPhotos = photos.filter(photo => photo.featured).slice(0, 3);
      if (featuredPhotos.length > 0) {
        return featuredPhotos;
      }
      
      // Final fallback: just use the first 3 photos
      return photos.slice(0, Math.min(3, photos.length));
    };
    
    // Set the slideshow photos
    const selectedPhotos = getFeatureFeaturedPhotos();
    setSlideshowPhotos(selectedPhotos);
    setIsLoading(false);
    
    // Reset current slide if it's now out of bounds
    if (currentSlide >= selectedPhotos.length) {
      setCurrentSlide(0);
    }
  }, [photos, currentSlide]); // Re-run when photos array changes

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

  if (!isMounted || isLoading || slideshowPhotos.length === 0) {
    // Return a placeholder with the same dimensions during SSR or loading
    return (
      <div className="relative h-screen w-full bg-zinc-900 overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Exploring Barelands
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Looking Farther to Look Deeper
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-zinc-200 text-zinc-900"
              >
                <Link href="/#portfolio">Explore Portfolio</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/prints">Buy a Print</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {slideshowPhotos[currentSlide] && (
            <>
              <Image
                src={slideshowPhotos[currentSlide].image}
                alt={slideshowPhotos[currentSlide].title}
                fill
                priority
                className="object-cover"
                onError={(e) => {
                  // If image fails to load, go to next slide
                  console.error("Failed to load slideshow image:", slideshowPhotos[currentSlide].image);
                  nextSlide();
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-8 right-8 text-white text-lg font-semibold drop-shadow-lg z-10">
                {slideshowPhotos[currentSlide].title}, {slideshowPhotos[currentSlide].location}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slideshow Controls - Only show if we have more than one photo */}
      {slideshowPhotos.length > 1 && (
        <>
          <div className="absolute top-1/2 left-4 right-4 flex justify-between z-10 transform -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="bg-black/20 hover:bg-black/40 p-2 rounded-full text-white backdrop-blur-sm transition-colors"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-black/20 hover:bg-black/40 p-2 rounded-full text-white backdrop-blur-sm transition-colors"
              aria-label="Next slide"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {slideshowPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-white/40"
                } transition-colors`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Exploring Barelands
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Looking Farther to Look Deeper
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-zinc-200 text-zinc-900"
            >
              <Link href="/#portfolio">Explore Portfolio</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/prints">Buy a Print</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-sm text-zinc-300 mb-2 drop-shadow-md">Scroll to explore</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-6 h-9 border-2 border-zinc-300 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2 bg-white rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
}
