"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { type Photo } from "@/lib/data"; // Only import the type, not the static data
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiCalendar, FiMap, FiImage, FiHome } from "react-icons/fi";
import { filterValidPhotos } from "@/lib/storage";
import { isStaticExport, getStaticPhotoData } from "@/lib/static-data";

// Sample blog posts data
// In a real implementation, this would come from a CMS or API
const blogPosts = [
  {
    id: "blog-1",
    title: "The Art of Landscape Photography: Finding the Right Light",
    excerpt: "Light is perhaps the most crucial element in landscape photography. This post explores techniques for finding and working with different lighting conditions.",
    coverImage: "/uploads/c8715667-721a-465d-bedc-df749afbd870.jpg",
    date: "2024-03-15",
    author: "@mybarelands"
  },
  {
    id: "blog-2",
    title: "Iceland: A Photographer's Paradise",
    excerpt: "With its dramatic waterfalls, volcanic landscapes, and ethereal light, Iceland offers endless opportunities for landscape photographers.",
    coverImage: "/uploads/974baeb1-25ba-44f1-8da8-b134ab07f10c.jpeg",
    date: "2024-02-28",
    author: "@mybarelands"
  }
];

export default function NewsPage() {
  const [recentPhotos, setRecentPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatic, setIsStatic] = useState(false);
  
  // Check if we're in static export environment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsStatic(isStaticExport());
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
          
          // Fix for GitHub Pages: ensure image paths are correct with repo name
          if (typeof window !== 'undefined' && window.location.pathname.includes('/Barelands/')) {
            validPhotos = validPhotos.map(photo => ({
              ...photo,
              image: photo.image.startsWith('/') 
                ? `/Barelands${photo.image}` 
                : `/Barelands/${photo.image}`
            }));
          }
        } else {
          // Fetch photos from API instead of using static import
          const response = await fetch('/api/photos');
          
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          
          const data = await response.json();
          validPhotos = filterValidPhotos(data);
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
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
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
  const [isStatic, setIsStatic] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set image path and check if we're in static mode
    setImagePath(photo.image);
    setIsStatic(isStaticExport());
  }, [photo.image]);
  
  // Handle image error by trying fallback path for GitHub Pages
  const handleImageError = () => {
    console.error(`Failed to load image: ${imagePath}`);
    
    // Try fallback only if needed
    if (isStatic && !imagePath.includes('/Barelands/') && imagePath.startsWith('/')) {
      const fallbackPath = `/Barelands${imagePath}`;
      console.log(`Trying fallback path: ${fallbackPath}`);
      setImagePath(fallbackPath);
    } else {
      setImageError(true);
    }
  };
  
  // Don't render if image failed to load
  if (imageError) {
    return (
      <div className="bg-zinc-800 rounded-lg p-4 aspect-square flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Image unavailable</p>
      </div>
    );
  }
  
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg group">
      <Link href={`/portfolio?photo=${photo.id}`}>
        <Image
          src={imagePath}
          alt={photo.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-medium">{photo.title}</h3>
          <p className="text-zinc-300 text-sm">{photo.location}</p>
        </div>
      </Link>
    </div>
  );
}

// BlogPostCard component for displaying a blog post
function BlogPostCard({ post }: { post: any }) {
  const [imagePath, setImagePath] = useState<string>(post.coverImage);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial image path
    setImagePath(post.coverImage);
    
    // Add GitHub Pages prefix if needed
    if (window.location.pathname.includes('/Barelands/') && 
        post.coverImage.startsWith('/') && 
        !post.coverImage.startsWith('/Barelands/')) {
      setImagePath(`/Barelands${post.coverImage}`);
    }
  }, [post.coverImage]);
  
  // Handle image error by trying fallback path for GitHub Pages
  const handleImageError = () => {
    console.error(`Failed to load blog image: ${imagePath}`);
    
    // Only try fallback if not already tried
    if (!imagePath.includes('/Barelands/') && 
        imagePath.startsWith('/') && 
        window.location.pathname.includes('/Barelands/')) {
      const fallbackPath = `/Barelands${imagePath}`;
      console.log(`Trying fallback blog image path: ${fallbackPath}`);
      setImagePath(fallbackPath);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        {!imageError ? (
          <Image
            src={imagePath}
            alt={post.title}
            fill
            className="object-cover"
            onError={handleImageError}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <p className="text-zinc-500">Image unavailable</p>
          </div>
        )}
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
            href="#" 
            className="inline-flex items-center text-zinc-300 hover:text-white text-sm"
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