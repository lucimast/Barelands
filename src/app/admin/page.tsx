"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isStaticExport } from '@/lib/static-data';
import { FiLock, FiAlertTriangle } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [isStatic, setIsStatic] = useState(false);
  
  // Check if we're in static export environment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsStatic(isStaticExport());
    }
  }, []);
  
  // Redirect in development mode, but show access denied in static export
  useEffect(() => {
    if (!isStatic) {
      router.replace('/');
    }
  }, [router, isStatic]);
  
  // In static export, show an access denied message
  if (isStatic) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="w-full max-w-md p-8 bg-zinc-800 rounded-lg shadow-lg text-center">
          <FiLock className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <div className="h-1 w-20 bg-red-500 mx-auto mb-6"></div>
          
          <p className="text-zinc-300 mb-6">
            Admin functionality is not available in the static site deployment.
          </p>
          
          <div className="bg-zinc-700 p-4 rounded-lg mb-6">
            <FiAlertTriangle className="inline-block mr-2 text-yellow-400" />
            <span className="text-zinc-300 text-sm">
              Administrative features are only available in the development environment.
            </span>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }
  
  // This will only show briefly during redirect in development mode
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
