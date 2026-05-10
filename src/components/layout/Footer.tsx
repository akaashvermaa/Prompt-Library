import { ExternalLink, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">PV</span>
              </div>
              <span className="text-xl font-bold text-white">PromptVault</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              A curated prompt library for AI enthusiasts. Discover, copy, and enhance your prompting skills.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/browse"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Browse All Prompts
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/featured"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Featured Prompts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  About Prompt Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Best Practices
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 PromptVault. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}