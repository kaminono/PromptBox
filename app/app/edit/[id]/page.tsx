'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { usePromptForm } from '../../../../hooks/usePromptForm';
import { PromptForm } from '../../../../components/PromptForm';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { PromptStorage } from '../../../../lib/storage';
import { pageVariants, pageTransition } from '../../../../lib/animations';
import { useToast } from '../../../../components/providers/ToastProvider';
import { Prompt } from '../../../../types';

export default function EditPromptPage() {
  const params = useParams();
  const { showToast } = useToast();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    formData,
    isStarred,
    versionDescription,
    errors,
    isSubmitting,
    updateField,
    setIsStarred,
    setVersionDescription,
    savePrompt,
    deletePrompt,
    navigateToHome,
    initializeForm,
  } = usePromptForm({ 
    initialData: prompt || undefined, 
    isEdit: true 
  });

  useEffect(() => {
    const loadPrompt = () => {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      if (id) {
        const foundPrompt = PromptStorage.getById(id);
        if (foundPrompt) {
          setPrompt(foundPrompt);
        } else {
          showToast('Prompt not found', 'error');
          navigateToHome();
        }
      }
      setLoading(false);
    };

    loadPrompt();
  }, [params.id, showToast, navigateToHome]);

  // Initialize form data when prompt is loaded
  useEffect(() => {
    if (prompt && initializeForm) {
      initializeForm(prompt);
    }
  }, [prompt, initializeForm]);

  const handleSubmit = async () => {
    const result = await savePrompt();
    
    if (result.success) {
      showToast('Prompt updated successfully!', 'success');
      navigateToHome();
    } else {
      showToast(result.error || 'Failed to update prompt', 'error');
    }
  };

  const handleCancel = () => {
    navigateToHome();
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    const result = await deletePrompt();
    
    if (result.success) {
      // Delete animation
      showToast('Prompt deleted successfully!', 'success');
      
      // Fade out content before navigation
      setTimeout(() => {
        navigateToHome();
      }, 300);
    } else {
      showToast(result.error || 'Failed to delete prompt', 'error');
      setIsDeleting(false);
    }
    
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600 dark:text-gray-400">Loading prompt...</span>
        </div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Prompt Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The prompt you're looking for doesn't exist.
          </p>
          <Button onClick={navigateToHome}>
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className={`py-8 px-4 sm:px-6 lg:px-8 transition-opacity duration-300 ${
          isDeleting ? 'opacity-30' : 'opacity-100'
        }`}
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
              Edit Prompt
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Update your AI prompt and save a new version
            </p>
          </motion.div>

          {/* Form */}
          <PromptForm
            formData={formData}
            isStarred={isStarred}
            versionDescription={versionDescription}
            errors={errors}
            isSubmitting={isSubmitting}
            isEdit={true}
            onFieldChange={updateField}
            onStarredChange={setIsStarred}
            onVersionDescriptionChange={setVersionDescription}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onDelete={handleDeleteClick}
          />
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        title="Delete Prompt"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete "{prompt.title}"? This action cannot be undone.
          </p>
          
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                'Delete Prompt'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
} 