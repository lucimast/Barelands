"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('githubToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    // Redirect to the admin tool
    router.push('/admin-tool');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}
