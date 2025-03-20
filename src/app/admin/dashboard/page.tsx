"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the new admin page
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to admin dashboard...</p>
    </div>
  );
}
