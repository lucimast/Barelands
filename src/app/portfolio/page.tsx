import { Metadata } from "next";
import PortfolioSection from "@/components/PortfolioSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Barelands Photography",
  description: "Explore our collection of landscape photographs from around the world."
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-0">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>
        <PortfolioSection />
      </div>
    </main>
  );
} 