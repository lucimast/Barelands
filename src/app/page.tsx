"use client";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import { useEffect } from "react";

export default function Home() {
  // Disable right click globally on this page
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => {
      // Only prevent right-clicks (button 2), allow left clicks
      if (e.button === 2) {
        e.preventDefault();
        return false;
      }
    };
    
    document.addEventListener('contextmenu', disableRightClick);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);
  
  // Prevent image dragging
  useEffect(() => {
    const preventImageDrag = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Prevent drag start
    document.addEventListener('dragstart', preventImageDrag);
    // Prevent drop
    document.addEventListener('drop', preventImageDrag);
    
    // Clean up
    return () => {
      document.removeEventListener('dragstart', preventImageDrag);
      document.removeEventListener('drop', preventImageDrag);
    };
  }, []);
  
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
    </main>
  );
}
