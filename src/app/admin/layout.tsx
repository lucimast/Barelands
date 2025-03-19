"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signOut } from "next-auth/react";

const adminNavItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Photos", path: "/admin/photos" },
  { name: "Analytics", path: "/admin/analytics" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not logged in and not on login page
  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [status, pathname, router]);

  // Don't apply layout to login page
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // Set active tab based on pathname
  useEffect(() => {
    const currentTab = adminNavItems.find((item) => 
      pathname.startsWith(item.path)
    )?.path;
    
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname]);

  // Show loading or redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // We'll redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">
      {/* Admin Header */}
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-4 px-4">
          <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0">
            <div className="flex items-center gap-2">
              <Link href="/">
                <h1 className="text-xl font-medium text-white">
                  Barelands
                  <span className="text-xs text-zinc-400 font-normal block">Admin Panel</span>
                </h1>
              </Link>
            </div>
            
            <button 
              className="lg:hidden rounded-md p-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
              onClick={() => window.document.getElementById("mobile-menu")?.classList.toggle("hidden")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Tabs 
              value={activeTab}
              className="w-full" 
              onValueChange={(value) => {
                setActiveTab(value);
                router.push(value);
              }}
            >
              <TabsList className="bg-zinc-800">
                {adminNavItems.map((item) => (
                  <TabsTrigger 
                    key={item.path} 
                    value={item.path}
                    className="data-[state=active]:bg-white data-[state=active]:text-zinc-900"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-sm text-zinc-400">
              Logged in as <span className="text-white">{session?.user?.email}</span>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/admin' })}
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div id="mobile-menu" className="hidden lg:hidden border-t border-zinc-800 pb-4">
          <div className="container mx-auto px-4 pt-4">
            <Tabs 
              value={activeTab}
              className="w-full" 
              onValueChange={(value) => {
                setActiveTab(value);
                router.push(value);
              }}
            >
              <TabsList className="bg-zinc-800 w-full grid grid-cols-3">
                {adminNavItems.map((item) => (
                  <TabsTrigger 
                    key={item.path} 
                    value={item.path}
                    className="data-[state=active]:bg-white data-[state=active]:text-zinc-900"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
              <div className="text-sm text-zinc-400">
                Logged in as <span className="text-white">{session?.user?.email}</span>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: '/admin' })}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Admin Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
