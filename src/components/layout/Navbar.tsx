"use client";

import Link from "next/link";
import { Search, Copy } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">PromptVault</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/browse"
              className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
            >
              Browse
            </Link>
          </div>

          {/* Search Icon - Mobile */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}