"use client";

import { FiImage, FiSettings, FiUsers, FiBarChart2, FiEdit3, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Photos Card */}
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
          
          {/* Blog Posts Card */}
          <Link 
            href="/admin/dashboard/blog"
            className="block p-6 bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors"
          >
            <div className="flex items-center">
              <FiEdit3 className="h-8 w-8 text-amber-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
                <p className="text-zinc-400">Create and manage blog content</p>
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
          
          {/* Analytics Card */}
          <Link 
            href="/admin/dashboard/analytics"
            className="block p-6 bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors"
          >
            <div className="flex items-center">
              <FiBarChart2 className="h-8 w-8 text-yellow-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-white">Analytics</h2>
                <p className="text-zinc-400">View site analytics</p>
              </div>
            </div>
          </Link>

          {/* Debug Card */}
          <Link 
            href="/admin/dashboard/debug"
            className="block p-6 bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors"
          >
            <div className="flex items-center">
              <FiCheckCircle className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-white">Debug</h2>
                <p className="text-zinc-400">Check data files and system status</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
