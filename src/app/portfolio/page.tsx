"use client";

import { Metadata } from "next";
import PortfolioSection from "@/components/PortfolioSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Portfolio | Barelands Photography",
  description: "A collection of my finest landscape photographs from around the world, each capturing a unique moment in time"
};

export default function PortfolioPage() {
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
    <main className="min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-0">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>
        <PortfolioSection />
      </div>
    </main>
  );
} 