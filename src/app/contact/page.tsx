"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
          >
            <FiHome className="mr-2" /> Back to Home
          </Link>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Contact Barelands</h1>
            <p className="text-zinc-300 max-w-lg mx-auto">
              Have questions about my photographs or interested in collaborating? 
              Fill out the form below, and I'll get back to you as soon as possible.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900 rounded-lg border border-zinc-800 p-8"
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeS4ZPtstdpFcdDBeZfbcUJpTSnr8Ws7XY9cOpY5bg0JCnXjA/viewform?embedded=true"
              width="100%"
              height="800px"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
              title="Contact Form"
            >
              Loading…
            </iframe>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 