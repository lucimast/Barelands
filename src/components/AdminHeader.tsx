'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FiHome, FiLogOut } from 'react-icons/fi';

export default function AdminHeader() {
  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div>
          <Link href="/admin" className="text-xl font-semibold text-gray-800">
            Barelands Admin
          </Link>
        </div>
        
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <FiHome className="w-4 h-4" />
                <span>View Site</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-gray-600 hover:text-red-600 flex items-center gap-1"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 