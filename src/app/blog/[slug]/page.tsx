"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state for better UX
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  return (
    <main className="pt-20 pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/news" 
            className="inline-flex items-center text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to News
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-zinc-500 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-zinc-900 rounded-lg p-8 shadow-lg"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">Blog Coming Soon</h1>
            <div className="h-1 w-24 bg-zinc-700 mx-auto mb-8"></div>
            
            <p className="text-zinc-300 text-lg mb-6 text-center">
              We're currently working on our blog feature. Please check back soon for exciting content about landscape photography!
            </p>
            
            <div className="text-center">
              <Link
                href="/news"
                className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
              >
                Return to News
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 