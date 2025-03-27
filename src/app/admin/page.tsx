"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiImage, FiSettings, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Handle authentication redirect
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin/login');
    }
  }, [status, router]);
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="p-4 text-center">
          <p className="text-zinc-300">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Show admin dashboard
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Photos Management Card */}
          <Link 
            href="/admin/dashboard/photos"
            className="block p-6 bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors"
          >
            <div className="flex items-center">
              <FiImage className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-white">Photos</h2>
                <p className="text-zinc-400">Manage your photo collection</p>
              </div>
            </div>
          </Link>
          
          {/* Settings Card */}
          <Link 
            href="/admin/dashboard/settings"
            className="block p-6 bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors"
          >
            <div className="flex items-center">
              <FiSettings className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-white">Settings</h2>
                <p className="text-zinc-400">Configure site settings</p>
              </div>
            </div>
          </Link>
          
          {/* Users Card */}
          <Link 
            href="/admin/dashboard/users"
            className="block p-6 bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors"
          >
            <div className="flex items-center">
              <FiUsers className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-white">Users</h2>
                <p className="text-zinc-400">Manage user accounts</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
