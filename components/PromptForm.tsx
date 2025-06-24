'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { InputField, TextareaField } from './ui/InputField';
import { Dropdown, DropdownOption } from './ui/Dropdown';
import { TagSelector } from './ui/TagSelector';
import { GroupStorage } from '../lib/storage';
import { DEFAULT_TAGS, PROMPT_LANGUAGES } from '../lib/constants';
import { CreatePromptRequest } from '../types';

interface PromptFormProps {
  formData: CreatePromptRequest;
  isStarred: boolean;
  errors: { [key: string]: string | undefined };
  isSubmitting: boolean;
  isEdit?: boolean;
  versionDescription?: string;
  onFieldChange: (field: keyof CreatePromptRequest, value: any) => void;
  onStarredChange: (starred: boolean) => void;
  onVersionDescriptionChange?: (description: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function PromptForm({
  formData,
  isStarred,
  errors,
  isSubmitting,
  isEdit = false,
  versionDescription = '',
  onFieldChange,
  onStarredChange,
  onVersionDescriptionChange,
  onSubmit,
  onCancel,
  onDelete,
}: PromptFormProps) {
  const groups = GroupStorage.getAll();
  
  const groupOptions: DropdownOption[] = [
    { value: '', label: 'No Group', icon: '📝' },
    ...groups.map(group => ({
      value: group.id,
      label: group.name,
      icon: group.icon,
      color: group.color,
    })),
  ];

  const languageOptions: DropdownOption[] = PROMPT_LANGUAGES.map(lang => ({
    value: lang.value,
    label: lang.label,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-background-800 rounded-xl shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-background-900 dark:text-background-100">
          {isEdit ? 'Edit Prompt' : 'Create New Prompt'}
        </h1>
        
        {isEdit && onDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title and Star */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <div className="flex-1">
            <InputField
              label="Title"
              value={formData.title}
              onChange={(e) => onFieldChange('title', e.target.value)}
              placeholder="Enter prompt title..."
              required
              error={errors.title}
            />
          </div>
          
          <div className="flex items-end pb-2">
            <button
              type="button"
              onClick={() => onStarredChange(!isStarred)}
              className={`p-2 rounded-lg transition-colors ${
                isStarred
                  ? 'text-yellow-500 hover:text-yellow-600'
                  : 'text-background-400 hover:text-yellow-500'
              }`}
              title={isStarred ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className="w-6 h-6" fill={isStarred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TextareaField
            label="Content"
            value={formData.content}
            onChange={(e) => onFieldChange('content', e.target.value)}
            placeholder="Enter your prompt content..."
            required
            rows={6}
            error={errors.content}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextareaField
            label="Description (Optional)"
            value={formData.description || ''}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Brief description of what this prompt does..."
            rows={2}
          />
        </motion.div>

        {/* Version Description (Edit mode only) */}
        {isEdit && onVersionDescriptionChange && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <TextareaField
              label="Version Notes (Optional)"
              value={versionDescription}
              onChange={(e) => onVersionDescriptionChange(e.target.value)}
              placeholder="Describe what changed in this version..."
              rows={2}
            />
            <p className="text-xs text-background-500 dark:text-background-400 mt-1">
              This will be saved as a note for this version in the history.
            </p>
          </motion.div>
        )}

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TagSelector
            label="Tags"
            availableTags={DEFAULT_TAGS}
            selectedTags={formData.tags || []}
            onChange={(tags) => onFieldChange('tags', tags)}
            placeholder="Add tags to organize your prompt..."
          />
        </motion.div>

        {/* Group and Language */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Dropdown
            label="Group"
            options={groupOptions}
            value={formData.groupId || ''}
            onChange={(value) => onFieldChange('groupId', value)}
            placeholder="Select a group..."
          />
          
          <Dropdown
            label="Language"
            options={languageOptions}
            value={formData.language || 'en'}
            onChange={(value) => onFieldChange('language', value)}
            placeholder="Select language..."
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3 pt-4"
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              isEdit ? 'Update Prompt' : 'Create Prompt'
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
} 