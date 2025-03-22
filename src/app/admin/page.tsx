"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  
  // Immediately redirect to home page
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  // This will only show very briefly during redirect
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
