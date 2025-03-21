"use client";

import Link from "next/link";
import { FiInstagram, FiLock } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025); // Default to current year

  useEffect(() => {
    // Update the year on the client side to avoid hydration mismatch
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-black py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Name */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-medium tracking-tight text-white flex items-center">
              <FiInstagram className="mr-2 h-5 w-5" />
              @mybarelands
              <span className="block text-xs text-zinc-400 mt-0.5 ml-2">
                Landscape Photographer
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
            <Link href="/#about" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Who I Am
            </Link>
            <Link href="/portfolio" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="/news" className="text-sm text-zinc-400 hover:text-white transition-colors">
              News
            </Link>
            <Link href="/prints" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Buy a Print
            </Link>
            <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Social Links - Only Instagram */}
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/mybarelands"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">
            &copy; {currentYear} Barelands Photography. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/admin"
              className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors flex items-center"
            >
              <FiLock className="mr-1 h-3 w-3" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
