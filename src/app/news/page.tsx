"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { type Photo, type BlogPost } from "@/lib/data"; // Only import the type, not the static data
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiCalendar, FiMap, FiImage, FiHome } from "react-icons/fi";
import { filterValidPhotos } from "@/lib/storage";
import { isStaticExport, getStaticPhotoData, getStaticBlogPostData } from "@/lib/static-data";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function NewsPage() {
  const [recentPhotos, setRecentPhotos] = useState<Photo[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatic, setIsStatic] = useState(false);
  
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
  
  // Check if we're in static export environment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const staticStatus = isStaticExport();
      console.log("News page static mode:", staticStatus);
      setIsStatic(staticStatus);
    }
  }, []);
  
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        
        let validPhotos: Photo[] = [];
        
        // Check if we're in static export mode
        if (isStatic) {
          // Use static data in GitHub Pages environment
          console.log("News page: Using static photo data");
          validPhotos = await getStaticPhotoData();
          
          // Fix for GitHub Pages: ensure image paths are correct
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
              
              console.log("News page: Fixed GitHub Pages paths", validPhotos[0]?.image);
            }
          }
        } else {
          // Fetch photos from API instead of using static import
          try {
            const response = await fetch('/api/photos');
            
            if (!response.ok) {
              throw new Error('Failed to fetch photos');
            }
            
            const data = await response.json();
            validPhotos = filterValidPhotos(data);
          } catch (error) {
            console.error('API fetch failed, falling back to static data:', error);
            validPhotos = await getStaticPhotoData();
          }
        }
        
        console.log("News page: Loaded photos count:", validPhotos.length);
        
        // Sort photos by date added (descending) and take the 6 most recent
        const sortedPhotos = validPhotos.sort((a, b) => {
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }).slice(0, 6);
        
        setRecentPhotos(sortedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhotos();
  }, [isStatic]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        let posts: BlogPost[] = [];
        
        // Check if we're in static export mode
        if (isStatic) {
          console.log("News page: Using static blog data");
          posts = await getStaticBlogPostData();
        } else {
          // In a real implementation, we would fetch from API
          // For now, use the static data
          posts = await getStaticBlogPostData();
        }
        
        // Filter out the placeholder blog posts (they have specific IDs or titles)
        const placeholderTitles = [
          "Iceland: A Photographer's Paradise",
          "The Art of Landscape Photography: Finding the Right Light",
          "Patagonia: A Photographer's Journey to the End of the World"
        ];
        
        const userPosts = posts.filter(post => !placeholderTitles.includes(post.title));
        
        // Sort blog posts by date (newest first)
        const sortedPosts = userPosts.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    
    fetchBlogPosts();
  }, [isStatic]);

  return (
    <main className="pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
          >
            <FiHome className="mr-2" /> Back to Home
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">News & Updates</h1>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            Stay updated with the latest photographs, travel adventures, and behind-the-scenes stories.
          </p>
        </motion.div>

        <Tabs defaultValue="recent" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPhotos.map((photo) => (
                <RecentPhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="space-y-10">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center p-8 bg-zinc-800 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No Blog Posts Yet</h3>
                  <p className="text-zinc-400">Check back soon for updates and stories!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

// RecentPhotoCard component for displaying a recent photo in the grid
function RecentPhotoCard({ photo }: { photo: Photo }) {
  const [imagePath, setImagePath] = useState<string>(photo.image);
  const [imageError, setImageError] = useState(false);
  
  // Fix path for GitHub Pages if needed
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // If path doesn't have the GitHub Pages prefix but we're on GitHub Pages
    if ((window.location.hostname.includes('github.io') || 
         window.location.pathname.includes('/Barelands/')) && 
        photo.image.startsWith('/') && 
        !photo.image.startsWith('/Barelands/')) {
      
      const fixedPath = `/Barelands${photo.image}`;
      console.log(`RecentPhotoCard: Setting GitHub Pages path: ${fixedPath}`);
      setImagePath(fixedPath);
    }
  }, [photo.image]);
  
  // Handle image error
  const handleImageError = () => {
    console.error(`Failed to load image: ${imagePath}`);
    setImageError(true);
  };
  
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg group" onContextMenu={(e) => e.preventDefault()}>
      <Link 
        href={`/portfolio?photo=${photo.id}`}
        className="pointer-events-auto"
        onClick={(e) => {
          // Allow click but prevent default browser actions on right-click
          if (e.button === 2) {
            e.preventDefault();
            return false;
          }
        }}
      >
        {imageError ? (
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <p className="text-zinc-500 text-sm">Image unavailable</p>
          </div>
        ) : (
          <Image
            src={imagePath}
            alt={photo.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
            unoptimized
            onContextMenu={(e) => e.preventDefault()}
            draggable="false"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-medium">{photo.title}</h3>
          <p className="text-zinc-300 text-sm">{photo.location}</p>
        </div>
      </Link>
    </div>
  );
}

// BlogPostCard component for displaying a blog post
function BlogPostCard({ post }: { post: BlogPost }) {
  const [imagePath, setImagePath] = useState<string>(post.coverImage);
  const [imageError, setImageError] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Fix path for GitHub Pages if needed
    if ((window.location.hostname.includes('github.io') || 
         window.location.pathname.includes('/Barelands/')) && 
        post.coverImage.startsWith('/') && 
        !post.coverImage.startsWith('/Barelands/')) {
      
      const fixedPath = `/Barelands${post.coverImage}`;
      console.log(`BlogPostCard: Setting GitHub Pages path: ${fixedPath}`);
      setImagePath(fixedPath);
    }
    
    // Check if image is portrait
    const img = document.createElement('img');
    img.onload = () => {
      setIsPortrait(img.height > img.width);
    };
    img.src = post.coverImage;
  }, [post.coverImage]);
  
  // Handle image error
  const handleImageError = () => {
    console.error(`Failed to load blog image: ${imagePath}`);
    setImageError(true);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className={`relative rounded-lg overflow-hidden max-w-xs mx-auto w-full h-48 ${isPortrait ? 'aspect-[3/4]' : 'aspect-video'}`} onContextMenu={(e) => e.preventDefault()}>
        <Link
          href={`/blog/${post.id}`}
          className="pointer-events-auto"
          onClick={(e) => {
            // Allow click but prevent default browser actions on right-click
            if (e.button === 2) {
              e.preventDefault();
              return false;
            }
          }}
        >
          {imageError ? (
            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
              <p className="text-zinc-500">Image unavailable</p>
            </div>
          ) : (
            <Image
              src={imagePath}
              alt={post.title}
              fill
              className={`${isPortrait ? 'object-contain' : 'object-cover'}`}
              onError={handleImageError}
              unoptimized
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />
          )}
        </Link>
      </div>
      <div>
        <div className="flex items-center text-zinc-400 text-sm mb-2">
          <FiCalendar className="mr-2" />
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
        </div>
        <h3 className="text-xl font-medium mb-2">{post.title}</h3>
        <p className="text-zinc-400">{post.excerpt}</p>
        <div className="mt-4">
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center text-zinc-300 hover:text-white text-sm pointer-events-auto"
          >
            Read more
            <svg 
              className="w-4 h-4 ml-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 