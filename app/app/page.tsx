'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { PromptCard } from '../../components/PromptCard';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/ui/InputField';
import { PromptStorage, GroupStorage } from '../../lib/storage';
import { Prompt, PromptFilter } from '../../types';
import { pageVariants, pageTransition, listVariants } from '../../lib/animations';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '../../components/providers/ToastProvider';

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [filter, setFilter] = useState<PromptFilter>({
    search: '',
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });

  const [loading, setLoading] = useState(true);

  // Handle URL parameters
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'starred') {
      setFilter(prev => ({ ...prev, isStarred: true }));
    } else {
      setFilter(prev => ({ ...prev, isStarred: undefined }));
    }
  }, [searchParams]);

  useEffect(() => {
    loadPrompts();
  }, []);

  useEffect(() => {
    const filtered = PromptStorage.search(filter);
    setFilteredPrompts(filtered);
  }, [prompts, filter]);

  const loadPrompts = () => {
    try {
      const allPrompts = PromptStorage.getAll();
      setPrompts(allPrompts);
    } catch (error) {
      console.error('Failed to load prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStar = (promptId: string) => {
    const prompt = prompts.find(p => p.id === promptId);
    if (prompt) {
      PromptStorage.update(promptId, { isStarred: !prompt.isStarred });
      loadPrompts();
    }
  };

  const handleDeletePrompt = (promptId: string) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      const success = PromptStorage.delete(promptId);
      if (success) {
        showToast('Prompt deleted successfully', 'success');
        loadPrompts();
      } else {
        showToast('Failed to delete prompt', 'error');
      }
    }
  };

  const handleEditPrompt = (promptId: string) => {
    router.push(`/app/edit/${promptId}`);
  };

  const handleViewPrompt = (prompt: Prompt) => {
    router.push(`/app/prompt/${prompt.id}`);
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="py-8"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {filter.isStarred ? 'Starred Prompts' : 'My Prompts'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filter.isStarred 
                ? 'Your favorite AI prompts' 
                : 'Manage and organize your AI prompt collection'
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <Link href="/app/create">
              <Button
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Create Prompt
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <InputField
                type="search"
                placeholder="Search prompts..."
                value={filter.search || ''}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              />
            </div>
            
            <div>
                             <select
                 className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                 value={filter.sortBy || 'updatedAt'}
                 onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as any })}
               >
                <option value="title">Sort by Title</option>
                <option value="createdAt">Sort by Created</option>
                <option value="updatedAt">Sort by Updated</option>
              </select>
            </div>
            
            <div>
                             <select
                 className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                 value={filter.sortOrder || 'desc'}
                 onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value as any })}
               >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
                         <svg
               className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
               />
             </svg>
             <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
               {filter.isStarred ? 'No starred prompts found' : 'No prompts found'}
             </h3>
             <p className="text-gray-500 dark:text-gray-400 mb-6">
               {filter.isStarred 
                 ? 'Star your favorite prompts to see them here'
                 : filter.search 
                   ? 'Try adjusting your search criteria' 
                   : 'Create your first prompt to get started'
               }
             </p>
            <Link href="/app/create">
              <Button>Create Your First Prompt</Button>
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onClick={() => handleViewPrompt(prompt)}
                onEdit={() => handleEditPrompt(prompt.id)}
                onDelete={() => handleDeletePrompt(prompt.id)}
                onToggleStar={() => handleToggleStar(prompt.id)}
              />
            ))}
          </motion.div>
        )}
      </div>


    </motion.div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
} 