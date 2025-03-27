"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('githubToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-900">
      <main className="p-8">
        {children}
      </main>
    </div>
  );
} 