"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-900/80 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl md:text-2xl font-medium tracking-tight">
            Alex Morgan
            <span className="block text-xs text-zinc-400 mt-0.5">
              Landscape Photographer
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <NavLink href="/#about">Who I Am</NavLink>
          <NavLink href="/#portfolio">Portfolio</NavLink>
          <NavLink href="/#news">News</NavLink>
          <NavLink href="/#prints">Buy a Print</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-zinc-100"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <IoCloseOutline className="h-6 w-6" />
          ) : (
            <IoMenuOutline className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-900/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <MobileNavLink
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Who I Am
              </MobileNavLink>
              <MobileNavLink
                href="/#portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </MobileNavLink>
              <MobileNavLink
                href="/#news"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News
              </MobileNavLink>
              <MobileNavLink
                href="/#prints"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Buy a Print
              </MobileNavLink>
              <MobileNavLink
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium hover:text-white transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-medium py-2 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
