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
  
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        // Fetch photos from API instead of using static import
        const response = await fetch('/api/photos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        const validPhotos = filterValidPhotos(data);
        
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
  }, []);

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

function RecentPhotoCard({ photo }: { photo: Photo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 rounded-lg overflow-hidden shadow-md flex flex-col h-full"
    >
      <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          className="object-cover"
        />
        {photo.featured && (
          <span className="absolute top-3 right-3 bg-white text-zinc-900 text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
        
        <div className="flex items-center text-zinc-400 text-sm mb-3">
          <FiMap className="mr-1" />
          <span>{photo.location}</span>
        </div>
        
        <p className="text-zinc-300 mb-4 line-clamp-2">{photo.description}</p>
        
        <div className="mt-auto pt-3 border-t border-zinc-800 flex justify-between items-center">
          <div className="flex items-center text-zinc-400 text-sm">
            <FiCalendar className="mr-1" />
            <span>{format(new Date(photo.dateAdded), 'MMM d, yyyy')}</span>
          </div>
          <Link 
            href={`/#portfolio?photo=${photo.id}`} 
            className="text-white font-medium text-sm flex items-center hover:underline"
          >
            View Photo <FiImage className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function BlogPostCard({ post }: { post: any }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row gap-6 bg-zinc-900 rounded-lg overflow-hidden shadow-md"
    >
      <div className="md:w-1/3 relative aspect-[16/9] md:aspect-auto md:min-h-[240px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 md:w-2/3">
        <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
        <div className="flex items-center gap-3 text-zinc-400 text-sm mb-4">
          <div className="flex items-center">
            <FiCalendar className="mr-1" />
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        <p className="text-zinc-300 mb-5">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.id}`}
          className="inline-flex items-center px-4 py-2 bg-white text-zinc-900 rounded-md hover:bg-zinc-200 transition-colors font-medium text-sm"
        >
          Read More
        </Link>
      </div>
    </motion.article>
  );
} 