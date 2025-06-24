'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TagSelectorProps {
  availableTags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  maxTags?: number;
  allowCustomTags?: boolean;
}

export function TagSelector({
  availableTags,
  selectedTags,
  onChange,
  label,
  placeholder = 'Add tags...',
  maxTags = 10,
  allowCustomTags = true,
}: TagSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredTags = availableTags.filter(tag =>
    !selectedTags.includes(tag) && 
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddTag = (tag: string) => {
    if (selectedTags.length >= maxTags) return;
    if (!selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
    }
    setInputValue('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (allowCustomTags) {
        handleAddTag(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      handleRemoveTag(selectedTags[selectedTags.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-background-700 dark:text-background-300">
          {label}
        </label>
      )}

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </motion.span>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 150)}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-background-300 bg-white px-3 py-2 text-sm text-background-900 placeholder-background-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-background-600 dark:bg-background-800 dark:text-background-100 dark:placeholder-background-400 dark:focus:border-primary-400"
          disabled={selectedTags.length >= maxTags}
        />

        {/* Tag Suggestions */}
        {isInputFocused && inputValue && filteredTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-background-800 border border-background-200 dark:border-background-700 rounded-lg shadow-lg max-h-40 overflow-auto"
          >
            {filteredTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                type="button"
                className="w-full px-3 py-2 text-left text-sm hover:bg-background-50 dark:hover:bg-background-700 text-background-900 dark:text-background-100"
                onMouseDown={() => handleAddTag(tag)}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Popular Tags */}
      {!isInputFocused && inputValue === '' && (
        <div className="flex flex-wrap gap-2">
          {availableTags
            .filter(tag => !selectedTags.includes(tag))
            .slice(0, 8)
            .map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background-100 text-background-700 hover:bg-background-200 dark:bg-background-700 dark:text-background-300 dark:hover:bg-background-600 transition-colors"
                disabled={selectedTags.length >= maxTags}
              >
                {tag}
              </button>
            ))}
        </div>
      )}

      {selectedTags.length >= maxTags && (
        <p className="text-sm text-background-500 dark:text-background-400">
          Maximum {maxTags} tags allowed
        </p>
      )}
    </div>
  );
} 