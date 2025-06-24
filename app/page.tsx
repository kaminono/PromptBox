'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  heroVariants,
  staggerContainer,
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
} from '../lib/animations';

export default function LandingPage() {
  const features = [
    {
      icon: '🔒',
      title: 'Local-first Data',
      description: 'No cloud, no servers. Your data stays in your browser, always.',
    },
    {
      icon: '📚',
      title: 'Version History',
      description: 'Auto-saved edits with full version control. Revert anytime.',
    },
    {
      icon: '🏷️',
      title: 'Smart Organization',
      description: 'Intuitive groups and tags. Search, filter, and find instantly.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1
              variants={heroVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Your AI Prompt{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                Workspace
              </span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">All Local</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Collect, edit, and version your prompts with{' '}
              <span className="font-semibold text-gray-900 dark:text-white">no login</span>,{' '}
              <span className="font-semibold text-gray-900 dark:text-white">no cloud</span>,{' '}
              <span className="font-semibold text-gray-900 dark:text-white">100% browser-based</span>.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                href="/app"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🚀</span>
                Open App
              </Link>
              <Link
                href="https://github.com/kaminono/PromptBox"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Privacy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Versions</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Built for Privacy & Simplicity
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Everything you need to manage AI prompts, without the complexity or privacy concerns.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8"
            >
              See It In Action
            </motion.h2>

            <motion.div
              variants={scaleIn}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-indigo-600 to-emerald-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      PromptBox Interface
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Clean, intuitive design for managing your AI prompts
                    </p>
                    <Link
                      href="/app"
                      className="inline-flex items-center mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Try It Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              What's Coming Next
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              We're constantly improving PromptBox with new features and enhancements.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={slideInLeft}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🎨</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Custom Themes
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Personalize your workspace with custom color schemes and layouts.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📤</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Import/Export
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Backup your prompts or share them with others seamlessly.
              </p>
            </motion.div>

            <motion.div
              variants={slideInLeft}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🔍</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advanced Search
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Find prompts instantly with powerful search and filtering options.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🤖</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Suggestions
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get intelligent suggestions to improve your prompt effectiveness.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={heroVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Ready to Organize Your AI Prompts?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-indigo-100 mb-8"
            >
              Start managing your prompts like a pro. No signup required.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/app"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">✨</span>
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 