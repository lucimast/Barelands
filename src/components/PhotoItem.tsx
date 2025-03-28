import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiMaximize, FiMinimize, FiX } from "react-icons/fi";
import { Photo } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { isStaticExport } from "@/lib/static-data";

export default function PhotoItem({ item, selectedPhotoId }: { item: Photo, selectedPhotoId: string | null }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [imagePath, setImagePath] = useState<string>(item.image);

  // Set the image path based on the environment
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let path = item.image;
    // If we're on GitHub Pages and need to fix the path
    if (window.location.hostname.includes('github.io') || 
        window.location.pathname.includes('/Barelands/')) {
      if (path.startsWith('/') && !path.startsWith('/Barelands/')) {
        path = `/Barelands${path}`;
      }
    }
    
    setImagePath(path);

    // Detect if image is portrait
    const checkOrientation = () => {
      // Use document.createElement instead of new Image() to avoid TypeScript errors
      const img = document.createElement('img');
      img.onload = () => {
        setIsPortrait(img.height > img.width);
        setImageError(false);
      };
      img.onerror = () => {
        setImageError(true);
      };
      img.src = path;
    };
    
    checkOrientation();
  }, [item.image]);

  // Auto-open dialog if this item matches the selected photo ID
  useEffect(() => {
    if (selectedPhotoId && selectedPhotoId === item.id) {
      setIsDialogOpen(true);
    }
  }, [selectedPhotoId, item.id]);

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

  // Add protections for the fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      // Prevent screenshots and right-clicks
      const handleKeyDown = (e: KeyboardEvent) => {
        // Prevent print screen and other screenshot shortcuts
        if (
          (e.key === 'PrintScreen') || 
          (e.ctrlKey && e.key === 'P') || 
          (e.ctrlKey && e.key === 'p') ||
          (e.metaKey && e.key === 'P') || 
          (e.metaKey && e.key === 'p') ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'i') ||
          (e.metaKey && e.shiftKey && e.key === 'I') ||
          (e.metaKey && e.shiftKey && e.key === 'i')
        ) {
          e.preventDefault();
          return false;
        }
        
        // Close fullscreen on Escape
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        }
      };
      
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };
      
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('contextmenu', handleContextMenu);
      
      // Disable selection
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('contextmenu', handleContextMenu);
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
      };
    }
  }, [isFullscreen]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="group relative cursor-pointer overflow-hidden rounded-lg">
            {/* Use auto aspect ratio to adapt to image orientation */}
            <div className={`${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'} w-full relative`}>
              {imageError ? (
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-500">Image unavailable</p>
                </div>
              ) : (
                <Image
                  src={imagePath}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImageError(true)}
                  unoptimized
                  onContextMenu={(e) => e.preventDefault()}
                />
              )}
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
                {imageError ? (
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center rounded-md">
                    <p className="text-zinc-500">Image unavailable</p>
                  </div>
                ) : (
                  <Image
                    src={imagePath}
                    alt={item.title}
                    fill
                    className="object-cover rounded-md"
                    onError={() => setImageError(true)}
                    unoptimized
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
                {!imageError && (
                  <Button 
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/70 hover:bg-black/90"
                    size="icon"
                    variant="ghost"
                    onClick={toggleFullscreen}
                    title="View fullscreen"
                  >
                    <FiMaximize className="h-4 w-4" />
                  </Button>
                )}
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

      {/* Fullscreen Overlay */}
      {isFullscreen && !imageError && (
        <div 
          ref={fullscreenRef}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center p-4"
          >
            <Image
              src={imagePath}
              alt={item.title}
              fill
              className="object-contain"
              onError={() => setImageError(true)}
              unoptimized
              draggable={false}
              priority
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button 
                className="p-2 rounded-full bg-black/70 hover:bg-black/90 border border-zinc-700"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                }}
                title="Exit fullscreen"
              >
                <FiMinimize className="h-5 w-5" />
              </Button>
              <Button 
                className="p-2 rounded-full bg-black/70 hover:bg-black/90 border border-zinc-700"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                  setIsDialogOpen(false);
                }}
                title="Close"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center bg-black/50 p-2 rounded-md backdrop-blur-sm">
              <h3 className="text-white font-medium">{item.title}</h3>
              <p className="text-zinc-300 text-sm">{item.location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 