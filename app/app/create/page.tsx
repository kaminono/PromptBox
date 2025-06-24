'use client';

import { motion } from 'framer-motion';
import { usePromptForm } from '../../../hooks/usePromptForm';
import { PromptForm } from '../../../components/PromptForm';
import { pageVariants, pageTransition } from '../../../lib/animations';
import { useToast } from '../../../components/providers/ToastProvider';

export default function CreatePromptPage() {
  const { showToast } = useToast();
  const {
    formData,
    isStarred,
    errors,
    isSubmitting,
    updateField,
    setIsStarred,
    savePrompt,
    navigateToHome,
  } = usePromptForm();

  const handleSubmit = async () => {
    const result = await savePrompt();
    
    if (result.success) {
      showToast('Prompt created successfully!', 'success');
      navigateToHome();
    } else {
      showToast(result.error || 'Failed to create prompt', 'error');
    }
  };

  const handleCancel = () => {
    navigateToHome();
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Create New Prompt
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new AI prompt to add to your collection
          </p>
        </motion.div>

        {/* Form */}
        <PromptForm
          formData={formData}
          isStarred={isStarred}
          errors={errors}
          isSubmitting={isSubmitting}
          isEdit={false}
          onFieldChange={updateField}
          onStarredChange={setIsStarred}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </motion.div>
  );
} 