'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp } from '../lib/animations';

export function AppFooter() {
  const quickLinks = [
    { name: 'All Prompts', href: '/app', icon: '📝' },
    { name: 'Create New', href: '/app/create', icon: '➕' },
    { name: 'Starred', href: '/app?filter=starred', icon: '⭐' },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">✨</span>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  PromptBox
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Workspace
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              Your AI Prompt Management Hub
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Quick Access
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  <span className="text-xs">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Resources
            </h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                <span className="text-xs">🏠</span>
                <span>Home</span>
              </Link>
              <Link
                href="https://github.com/kaminono/PromptBox"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                <span className="text-xs">💻</span>
                <span>GitHub</span>
              </Link>
              <Link
                href="/feedback"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                <span className="text-xs">💬</span>
                <span>Feedback</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="text-gray-500 dark:text-gray-500">
                © 2025 PromptBox. All local, all yours.
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/privacy"
                  className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
              <span>🛡️</span>
              <span>100% Browser-based • No Data Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 