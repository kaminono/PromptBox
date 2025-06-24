'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp } from '../lib/animations';

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✨</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                PromptBox
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              Your AI Prompt Workspace, All Local
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-6">
              <Link
                href="https://github.com/kaminono/PromptBox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="/feedback"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Feedback
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
            
            <div className="text-gray-500 dark:text-gray-500 text-sm">
              © 2025 PromptBox. Built by independent devs.
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 dark:text-gray-500 text-sm text-center md:text-left">
              No data leaves your browser. No tracking. No ads.
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-500 text-sm">
                Made with
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❤️</span>
                <span className="text-gray-500 dark:text-gray-500 text-sm">
                  and Next.js
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 