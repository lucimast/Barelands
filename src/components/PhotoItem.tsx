import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type Photo } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { isStaticExport } from "@/lib/static-data";

// Extend the Photo type with optional fields that might not be in the type definition
type ExtendedPhoto = Photo & {
  date?: string;
  available?: boolean;
  dimensions?: string;
};

export default function PhotoItem({ item, selectedPhotoId }: { item: ExtendedPhoto, selectedPhotoId: string | null }) {
  const [imageError, setImageError] = useState(false);
  const [dialogImageError, setDialogImageError] = useState(false);
  const [imagePath, setImagePath] = useState<string>(item.image);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Reset dialog image error when dialog opens/closes
  useEffect(() => {
    if (!isDialogOpen) {
      setDialogImageError(false);
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Fix path for GitHub Pages if needed
    if ((window.location.hostname.includes('github.io') || 
         window.location.pathname.includes('/Barelands/')) && 
        item.image.startsWith('/') && 
        !item.image.startsWith('/Barelands/')) {
      
      const fixedPath = `/Barelands${item.image}`;
      console.log(`Setting GitHub Pages image path: ${fixedPath}`);
      setImagePath(fixedPath);
    }
    
    // Check if image is portrait
    const img = document.createElement('img');
    img.onload = () => {
      setIsPortrait(img.height > img.width);
    };
    img.onerror = () => {
      // Make sure we set the error state if preload fails
      setImageError(true);
    };
    img.src = item.image;
  }, [item.image]);
  
  useEffect(() => {
    if (isDialogOpen) {
      // Using a type assertion for the analytics event
      trackEvent('photo_viewed' as any, {
        photo_id: item.id,
        photo_title: item.title,
      });
    }
  }, [isDialogOpen, item.id, item.title]);

  return (
    <div className={`mb-4 ${selectedPhotoId === item.id ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}>
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
                  draggable="false"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg font-medium">{item.title}</h3>
              <p className="text-zinc-300 text-sm">{item.location}</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-auto">
          <div className={`relative ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'} w-full max-w-2xl mx-auto`}>
            {dialogImageError || imageError ? (
              <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                <p className="text-zinc-500">Image unavailable</p>
              </div>
            ) : (
              <Image
                src={imagePath}
                alt={item.title}
                fill
                className="object-contain"
                onError={() => setDialogImageError(true)}
                unoptimized
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                priority
              />
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-zinc-400 mt-1">{item.location}{item.date ? ` • ${item.date}` : ''}</p>
            {item.description && <p className="mt-3">{item.description}</p>}
            
            {item.available && (
              <div className="mt-4 flex items-center justify-between">
                <a 
                  href={`/prints?photo=${item.id}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-white transition-colors"
                  onClick={() => {
                    trackEvent('buy_print_click' as any, {
                      photo_id: item.id,
                      photo_title: item.title,
                    });
                  }}
                >
                  Buy a Print
                </a>
                {item.dimensions && <span className="text-sm text-zinc-400">Dimensions: {item.dimensions}</span>}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 