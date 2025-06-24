'use client';

import { motion } from 'framer-motion';
import { Prompt } from '../types';
import { cardVariants } from '../lib/animations';

interface PromptCardProps {
  prompt: Prompt;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStar?: () => void;
}

export function PromptCard({ prompt, onClick, onEdit, onDelete, onToggleStar }: PromptCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-button')) {
      return;
    }
    onClick?.();
  };

  return (
    <motion.div
      className="bg-white dark:bg-background-800 rounded-lg border border-background-200 dark:border-background-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-background-900 dark:text-background-100 line-clamp-2">
          {prompt.title}
        </h3>
        <button
          className="action-button text-background-400 hover:text-accent-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar?.();
          }}
        >
          <svg
            className={`w-5 h-5 ${prompt.isStarred ? 'fill-current text-accent-500' : ''}`}
            fill={prompt.isStarred ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>

      {prompt.description && (
        <p className="text-background-600 dark:text-background-400 text-sm mb-3 line-clamp-2">
          {prompt.description}
        </p>
      )}

      <div className="text-background-700 dark:text-background-300 text-sm mb-4 line-clamp-3">
        {prompt.content}
      </div>

      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
            >
              {tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background-100 text-background-600 dark:bg-background-700 dark:text-background-400">
              +{prompt.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-background-500 dark:text-background-400">
          Updated {new Date(prompt.updatedAt).toLocaleDateString()}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="action-button text-background-400 hover:text-primary-600 transition-colors p-1"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            className="action-button text-background-400 hover:text-red-600 transition-colors p-1"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 