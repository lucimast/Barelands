"use client";

import { useState, useEffect } from 'react';
import { FiUsers, FiEye, FiMousePointer, FiClock } from 'react-icons/fi';

interface AnalyticsData {
  totalVisitors: number;
  pageViews: number;
  averageTimeOnSite: string;
  bounceRate: string;
}

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    totalVisitors: 0,
    pageViews: 0,
    averageTimeOnSite: '0:00',
    bounceRate: '0%'
  });

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setData({
        totalVisitors: 1234,
        pageViews: 5678,
        averageTimeOnSite: '2:30',
        bounceRate: '45%'
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Visitors */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 bg-opacity-10 rounded-full">
                <FiUsers className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Total Visitors</p>
                <p className="text-2xl font-semibold text-white">{data.totalVisitors}</p>
              </div>
            </div>
          </div>

          {/* Page Views */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 bg-opacity-10 rounded-full">
                <FiEye className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Page Views</p>
                <p className="text-2xl font-semibold text-white">{data.pageViews}</p>
              </div>
            </div>
          </div>

          {/* Average Time on Site */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500 bg-opacity-10 rounded-full">
                <FiClock className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Avg. Time on Site</p>
                <p className="text-2xl font-semibold text-white">{data.averageTimeOnSite}</p>
              </div>
            </div>
          </div>

          {/* Bounce Rate */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 bg-opacity-10 rounded-full">
                <FiMousePointer className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">Bounce Rate</p>
                <p className="text-2xl font-semibold text-white">{data.bounceRate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 