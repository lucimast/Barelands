"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FiImage,
  FiUsers,
  FiBarChart2,
  FiTrendingUp,
  FiDownload,
  FiEye,
  FiHeart,
  FiShare2
} from "react-icons/fi";

// Mock data for the analytics
const mockPhotoEngagement = [
  { id: 1, title: "Mountain Twilight", views: 1284, likes: 342, shares: 87, category: "Mountains" },
  { id: 2, title: "Alpine Majesty", views: 976, likes: 231, shares: 64, category: "Mountains" },
  { id: 3, title: "Desert Dunes", views: 842, likes: 198, shares: 52, category: "Deserts" },
  { id: 4, title: "Winter Reflections", views: 1105, likes: 289, shares: 73, category: "Mountains" },
  { id: 5, title: "Cosmic Mountains", views: 1432, likes: 378, shares: 96, category: "Night Sky" },
  { id: 6, title: "Tuscan Dreams", views: 892, likes: 205, shares: 61, category: "Forests" },
];

// Define the type for engagement items
type EngagementItem = typeof mockPhotoEngagement[0];
type SortableField = 'views' | 'likes' | 'shares';

const mockTimeData = {
  daily: [423, 386, 512, 478, 542, 590, 621],
  weekly: [1890, 2150, 2340, 2520, 2780, 2950, 3120],
  monthly: [9870, 10450, 12340, 13520, 14650, 15980, 16780],
};

const mockCategoryData = [
  { name: "Mountains", views: 3365, percentage: 42 },
  { name: "Night Sky", views: 1432, percentage: 18 },
  { name: "Deserts", views: 842, percentage: 11 },
  { name: "Forests", views: 892, percentage: 11 },
  { name: "Oceans", views: 756, percentage: 9 },
  { name: "Wildlife", views: 724, percentage: 9 },
];

const mockDeviceData = [
  { name: "Mobile", value: 52 },
  { name: "Desktop", value: 38 },
  { name: "Tablet", value: 10 },
];

// For a bar chart using divs
const BarChart = ({ data, maxValue }: { data: number[], maxValue: number }) => {
  return (
    <div className="flex items-end h-40 gap-2">
      {data.map((value, index) => (
        <div key={index} className="relative flex-1 group">
          <div
            className="bg-blue-500 rounded-t-sm transition-all duration-300 group-hover:bg-blue-400"
            style={{ height: `${(value / maxValue) * 100}%` }}
          ></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-zinc-400">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

// For a horizontal bar chart
const HorizontalBarChart = ({ data }: { data: { name: string, percentage: number }[] }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>{item.percentage}%</span>
          </div>
          <div className="w-full bg-zinc-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// For a simple donut chart
const DonutChart = ({ data }: { data: { name: string, value: number }[] }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let startAngle = 0;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        {data.map((item, index) => {
          const angle = (item.value / total) * 360;
          const endAngle = startAngle + angle;

          // Calculate the SVG arc path
          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

          // Determine if the arc should take the long path or not
          const largeArcFlag = angle > 180 ? 1 : 0;

          // Create the path
          const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          // Set the start angle for the next segment
          startAngle += angle;

          // Colors for the different segments
          const colors = ["#3b82f6", "#4f46e5", "#8b5cf6"];

          return (
            <path
              key={index}
              d={path}
              fill={colors[index % colors.length]}
              stroke="none"
              className="transition-all duration-300 hover:opacity-80"
            />
          );
        })}
        {/* Add a center circle to create the donut hole */}
        <circle cx="50" cy="50" r="25" fill="#27272a" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold">{total}%</span>
        <span className="text-xs text-zinc-400">Total</span>
      </div>
    </div>
  );
};

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("weekly"); // daily, weekly, monthly
  const [sortOrder, setSortOrder] = useState<{field: SortableField, direction: 'asc' | 'desc'}>({
    field: "views",
    direction: "desc"
  });

  // Get the max value for the bar chart based on selected time range
  const maxValue = Math.max(...mockTimeData[timeRange as keyof typeof mockTimeData]);

  // Get the day labels based on selected time range
  const getDayLabels = () => {
    const today = new Date();
    const days = [];

    if (timeRange === "daily") {
      // Get last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString("en-US", { weekday: "short" }));
      }
    } else if (timeRange === "weekly") {
      // Get last 7 weeks
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7));
        days.push(`W${Math.ceil((date.getDate() + date.getDay()) / 7)}`);
      }
    } else {
      // Get last 7 months
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(date.getMonth() - i);
        days.push(date.toLocaleDateString("en-US", { month: "short" }));
      }
    }

    return days;
  };

  // Sort the photo engagement data
  const sortedPhotoEngagement = [...mockPhotoEngagement].sort((a, b) => {
    if (sortOrder.direction === "asc") {
      return a[sortOrder.field] - b[sortOrder.field];
    } else {
      return b[sortOrder.field] - a[sortOrder.field];
    }
  });

  // Handle sort change
  const handleSort = (field: SortableField) => {
    setSortOrder(prev => ({
      field,
      direction: prev.field === field && prev.direction === "desc" ? "asc" : "desc"
    }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gallery Analytics</h1>
          <p className="text-zinc-400">
            Track engagement with your photography portfolio
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-300">
            <FiDownload className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-zinc-400">Total Views</p>
                <h3 className="text-2xl font-bold mt-1 text-white">31,542</h3>
                <div className="flex items-center mt-1 text-emerald-500 text-xs">
                  <FiTrendingUp className="h-3 w-3 mr-1" />
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-full text-blue-500">
                <FiEye className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-zinc-400">Engagement</p>
                <h3 className="text-2xl font-bold mt-1 text-white">24.8%</h3>
                <div className="flex items-center mt-1 text-emerald-500 text-xs">
                  <FiTrendingUp className="h-3 w-3 mr-1" />
                  <span>+3.2%</span>
                </div>
              </div>
              <div className="bg-purple-500/20 p-2 rounded-full text-purple-500">
                <FiHeart className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-zinc-400">Most Popular</p>
                <h3 className="text-md font-medium mt-1 text-white truncate">Cosmic Mountains</h3>
                <div className="flex items-center mt-1 text-zinc-400 text-xs">
                  <span>1,432 views</span>
                </div>
              </div>
              <div className="bg-amber-500/20 p-2 rounded-full text-amber-500">
                <FiImage className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-zinc-400">Active Visitors</p>
                <h3 className="text-2xl font-bold mt-1 text-white">24</h3>
                <div className="flex items-center mt-1 text-blue-500 text-xs">
                  <span>Last 15 minutes</span>
                </div>
              </div>
              <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-500">
                <FiUsers className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-zinc-800 border-zinc-700 lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-zinc-100">Visitor Trends</CardTitle>
                <CardDescription className="text-zinc-400">
                  Gallery views over time
                </CardDescription>
              </div>
              <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                <TabsList className="bg-zinc-700">
                  <TabsTrigger value="daily" className="data-[state=active]:bg-zinc-600">
                    Day
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="data-[state=active]:bg-zinc-600">
                    Week
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="data-[state=active]:bg-zinc-600">
                    Month
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <BarChart
              data={mockTimeData[timeRange as keyof typeof mockTimeData]}
              maxValue={maxValue}
            />
            <div className="flex justify-between mt-8 px-1 text-xs text-zinc-500">
              {getDayLabels().map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Device Breakdown</CardTitle>
            <CardDescription className="text-zinc-400">
              Visits by device type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={mockDeviceData} />
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {mockDeviceData.map((item, index) => (
                <div key={index}>
                  <div className="text-sm font-medium text-zinc-300">{item.name}</div>
                  <div className="text-lg font-bold text-white">{item.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories & Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Popular Categories</CardTitle>
            <CardDescription className="text-zinc-400">
              Views by photo category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart
              data={mockCategoryData.map(item => ({
                name: item.name,
                percentage: item.percentage
              }))}
            />
            <div className="mt-6 pt-4 border-t border-zinc-700">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Most popular category</span>
                <span className="font-medium text-white">Mountains</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-zinc-400">Least popular category</span>
                <span className="font-medium text-white">Wildlife</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-zinc-100">Photo Performance</CardTitle>
                <CardDescription className="text-zinc-400">
                  Engagement metrics for individual photos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium text-sm">Photo</th>
                    <th
                      className="text-right py-3 px-4 text-zinc-400 font-medium text-sm cursor-pointer"
                      onClick={() => handleSort("views")}
                    >
                      <div className="flex items-center justify-end">
                        Views
                        {sortOrder.field === "views" && (
                          <span className="ml-1">
                            {sortOrder.direction === "desc" ? "↓" : "↑"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="text-right py-3 px-4 text-zinc-400 font-medium text-sm cursor-pointer"
                      onClick={() => handleSort("likes")}
                    >
                      <div className="flex items-center justify-end">
                        Likes
                        {sortOrder.field === "likes" && (
                          <span className="ml-1">
                            {sortOrder.direction === "desc" ? "↓" : "↑"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="text-right py-3 px-4 text-zinc-400 font-medium text-sm cursor-pointer"
                      onClick={() => handleSort("shares")}
                    >
                      <div className="flex items-center justify-end">
                        Shares
                        {sortOrder.field === "shares" && (
                          <span className="ml-1">
                            {sortOrder.direction === "desc" ? "↓" : "↑"}
                          </span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPhotoEngagement.map((photo) => (
                    <tr key={photo.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/20">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="font-medium text-zinc-200">{photo.title}</span>
                          <span className="ml-2 text-xs bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-300">
                            {photo.category}
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-zinc-300">{photo.views.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 text-zinc-300">{photo.likes.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 text-zinc-300">{photo.shares.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
