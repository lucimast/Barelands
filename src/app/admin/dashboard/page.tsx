"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FiImage,
  FiFileText,
  FiUsers,
  FiActivity,
  FiArrowRight
} from "react-icons/fi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPhotos: 6, // This would come from your database in a real app
    newMessages: 4,
    totalNews: 3,
    visits: 1254
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-zinc-400">Welcome back to your admin dashboard.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild className="bg-white text-zinc-900 hover:bg-zinc-200">
            <Link href="/admin/photos/upload">
              <FiImage className="mr-2 h-4 w-4" /> Upload New Photo
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Photos"
          value={stats.totalPhotos.toString()}
          icon={<FiImage />}
          description="Photos in your portfolio"
          color="bg-blue-500"
        />
        <StatCard
          title="New Messages"
          value={stats.newMessages.toString()}
          icon={<FiUsers />}
          description="Unread inquiries"
          color="bg-amber-500"
        />
        <StatCard
          title="News Articles"
          value={stats.totalNews.toString()}
          icon={<FiFileText />}
          description="Published news items"
          color="bg-emerald-500"
        />
        <StatCard
          title="Site Visits"
          value={stats.visits.toLocaleString()}
          icon={<FiActivity />}
          description="Visits this month"
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ActionCard
          title="Manage Portfolio"
          description="Add, edit, or remove photos from your portfolio"
          icon={<FiImage className="h-6 w-6" />}
          href="/admin/photos"
        />
        <ActionCard
          title="Manage News"
          description="Update your latest exhibitions and events"
          icon={<FiFileText className="h-6 w-6" />}
          href="/admin/news"
        />
        <ActionCard
          title="View Inquiries"
          description="Check and respond to customer inquiries"
          icon={<FiUsers className="h-6 w-6" />}
          href="/admin/inquiries"
        />
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-zinc-100">Latest Updates</CardTitle>
          <CardDescription className="text-zinc-400">
            Recent changes to your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem
              title="New Photo Uploaded"
              description="You uploaded 'Winter Reflections'"
              timestamp="2 hours ago"
            />
            <ActivityItem
              title="Print Inquiry"
              description="Sarah Johnson inquired about 'Mountain Twilight'"
              timestamp="Yesterday"
            />
            <ActivityItem
              title="News Item Published"
              description="Article 'New Exhibition: Elements of Earth' was published"
              timestamp="3 days ago"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
  color
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}) {
  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
            <p className="text-xs text-zinc-500 mt-1">{description}</p>
          </div>
          <div className={`${color} p-2 rounded-full`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionCard({
  title,
  description,
  icon,
  href
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Card className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors">
      <Link href={href} className="block h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="bg-zinc-700 rounded-full p-3 w-fit mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-sm text-zinc-400 mt-1 flex-grow">{description}</p>
          <div className="flex items-center text-sm text-zinc-300 mt-4 font-medium">
            <span>Go to {title.toLowerCase()}</span>
            <FiArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function ActivityItem({
  title,
  description,
  timestamp
}: {
  title: string;
  description: string;
  timestamp: string;
}) {
  return (
    <div className="flex justify-between items-start pb-4 border-b border-zinc-700 last:border-0 last:pb-0">
      <div>
        <h4 className="text-zinc-200 font-medium">{title}</h4>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
      <span className="text-xs text-zinc-500 whitespace-nowrap">{timestamp}</span>
    </div>
  );
}
