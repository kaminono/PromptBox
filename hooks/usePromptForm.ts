import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PromptStorage, GroupStorage } from '../lib/storage';
import { CreatePromptRequest, Prompt } from '../types';

interface FormErrors {
  title?: string;
  content?: string;
  [key: string]: string | undefined;
}

interface UsePromptFormProps {
  initialData?: Partial<Prompt>;
  isEdit?: boolean;
}

export function usePromptForm({ initialData, isEdit = false }: UsePromptFormProps = {}) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<CreatePromptRequest>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    description: initialData?.description || '',
    tags: initialData?.tags || [],
    groupId: initialData?.groupId || '',
    language: initialData?.language || 'en',
  });

  const [isStarred, setIsStarred] = useState(initialData?.isStarred || false);
  const [versionDescription, setVersionDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field: keyof CreatePromptRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Ensure title is a string
    const title = typeof formData.title === 'string' ? formData.title : '';
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    // Ensure content is a string
    const content = typeof formData.content === 'string' ? formData.content : '';
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length > 10000) {
      newErrors.content = 'Content must be less than 10,000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const savePrompt = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!validateForm()) {
      return { success: false, error: 'Please fix the validation errors' };
    }

    setIsSubmitting(true);

    try {
      if (isEdit && initialData?.id) {
        // Update existing prompt with version description
        const updated = PromptStorage.update(initialData.id, {
          ...formData,
          isStarred,
        }, versionDescription.trim() || undefined);
        
        if (!updated) {
          throw new Error('Prompt not found');
        }
      } else {
        // Create new prompt
        PromptStorage.create({
          title: typeof formData.title === 'string' ? formData.title : '',
          content: typeof formData.content === 'string' ? formData.content : '',
          description: typeof formData.description === 'string' ? formData.description : undefined,
          tags: Array.isArray(formData.tags) ? formData.tags : [],
          groupId: typeof formData.groupId === 'string' ? formData.groupId : undefined,
          language: typeof formData.language === 'string' ? formData.language : 'en',
          isStarred,
        });
      }

      // Update group prompt counts
      GroupStorage.updatePromptCounts();

      return { success: true };
    } catch (error) {
      console.error('Error saving prompt:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to save prompt' 
      };
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isStarred, isEdit, initialData?.id, validateForm]);

  const deletePrompt = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!isEdit || !initialData?.id) {
      return { success: false, error: 'No prompt to delete' };
    }

    try {
      const deleted = PromptStorage.delete(initialData.id);
      if (!deleted) {
        throw new Error('Prompt not found');
      }

      // Update group prompt counts
      GroupStorage.updatePromptCounts();

      return { success: true };
    } catch (error) {
      console.error('Error deleting prompt:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete prompt' 
      };
    }
  }, [isEdit, initialData?.id]);

  const reset = useCallback(() => {
    setFormData({
      title: '',
      content: '',
      description: '',
      tags: [],
      groupId: '',
      language: 'en',
    });
    setIsStarred(false);
    setVersionDescription('');
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const navigateToHome = useCallback(() => {
    router.push('/app');
  }, [router]);

  const navigateToEdit = useCallback((id: string) => {
    router.push(`/app/edit/${id}`);
  }, [router]);

  const initializeForm = useCallback((promptData: Prompt) => {
    setFormData({
      title: promptData.title || '',
      content: promptData.content || '',
      description: promptData.description || '',
      tags: promptData.tags || [],
      groupId: promptData.groupId || '',
      language: promptData.language || 'en',
    });
    setIsStarred(promptData.isStarred || false);
    setErrors({});
  }, []);

  return {
    // Form state
    formData,
    isStarred,
    versionDescription,
    errors,
    isSubmitting,
    
    // Form actions
    updateField,
    setIsStarred,
    setVersionDescription,
    validateForm,
    savePrompt,
    deletePrompt,
    reset,
    initializeForm,
    
    // Navigation
    navigateToHome,
    navigateToEdit,
  };
} 