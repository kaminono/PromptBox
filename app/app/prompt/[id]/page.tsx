'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/Button';
import { Modal } from '../../../../components/ui/Modal';
import { PromptStorage, GroupStorage } from '../../../../lib/storage';
import { pageVariants, pageTransition } from '../../../../lib/animations';
import { useToast } from '../../../../components/providers/ToastProvider';
import { Prompt, PromptVersion } from '../../../../types';
import Link from 'next/link';

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<PromptVersion | null>(null);

  useEffect(() => {
    const loadPrompt = () => {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      if (id) {
        const foundPrompt = PromptStorage.getById(id);
        if (foundPrompt) {
          setPrompt(foundPrompt);
          // Set the latest version as default
          setSelectedVersion(foundPrompt.versions[foundPrompt.versions.length - 1]);
        } else {
          showToast('Prompt not found', 'error');
          router.push('/app');
        }
      }
      setLoading(false);
    };

    loadPrompt();
  }, [params.id, showToast, router]);

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      showToast('Content copied to clipboard', 'success');
    }).catch(() => {
      showToast('Failed to copy content', 'error');
    });
  };

  const handleToggleStar = () => {
    if (prompt) {
      const updated = PromptStorage.update(prompt.id, { isStarred: !prompt.isStarred });
      if (updated) {
        setPrompt(updated);
        showToast(updated.isStarred ? 'Added to favorites' : 'Removed from favorites', 'success');
      }
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!prompt) return;
    
    setIsDeleting(true);
    
    const success = PromptStorage.delete(prompt.id);
    if (success) {
      showToast('Prompt deleted successfully!', 'success');
      setTimeout(() => {
        router.push('/app');
      }, 300);
    } else {
      showToast('Failed to delete prompt', 'error');
      setIsDeleting(false);
    }
    
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const getGroupInfo = (groupId?: string) => {
    if (!groupId) return null;
    const groups = GroupStorage.getAll();
    return groups.find(g => g.id === groupId);
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
          <Link href="/app">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const group = getGroupInfo(prompt.groupId);

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className={`transition-opacity duration-300 ${
          isDeleting ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/app">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
              </Link>
              
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {prompt.title}
                </h1>
                
                <button
                  onClick={handleToggleStar}
                  className={`p-2 rounded-lg transition-colors ${
                    prompt.isStarred
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-background-400 hover:text-yellow-500'
                  }`}
                  title={prompt.isStarred ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg className="w-6 h-6" fill={prompt.isStarred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link href={`/app/edit/${prompt.id}`}>
                <Button variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Button>
              </Link>
              
              <Button variant="danger" onClick={handleDeleteClick}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Version Content */}
              <div className="bg-white dark:bg-background-800 rounded-xl border border-background-200 dark:border-background-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-background-900 dark:text-background-100">
                    {selectedVersion ? `Version ${prompt.versions.indexOf(selectedVersion) + 1}` : 'Current Version'}
                  </h2>
                  <Button
                    size="sm"
                    onClick={() => handleCopyContent(selectedVersion?.content || prompt.content)}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    }
                  >
                    Copy Content
                  </Button>
                </div>
                
                <div className="bg-background-50 dark:bg-background-900 rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap text-sm text-background-800 dark:text-background-200 font-mono leading-relaxed">
                    {selectedVersion?.content || prompt.content}
                  </pre>
                </div>

                {selectedVersion?.description && (
                  <div className="mt-4">
                    <h4 className="font-medium text-background-900 dark:text-background-100 mb-2">
                      Version Notes
                    </h4>
                    <p className="text-background-700 dark:text-background-300">
                      {selectedVersion.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Version History */}
              <div className="bg-white dark:bg-background-800 rounded-xl border border-background-200 dark:border-background-700 p-6">
                <h2 className="text-xl font-semibold text-background-900 dark:text-background-100 mb-4">
                  Version History ({prompt.versions.length})
                </h2>
                
                <div className="space-y-3">
                  {prompt.versions.slice().reverse().map((version, index) => {
                    const versionNumber = prompt.versions.length - index;
                    const isSelected = selectedVersion?.id === version.id;
                    
                    return (
                      <motion.div
                        key={version.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary-300 bg-primary-50 dark:border-primary-600 dark:bg-primary-900/20'
                            : 'border-background-200 bg-background-50 hover:border-background-300 dark:border-background-600 dark:bg-background-700 dark:hover:border-background-500'
                        }`}
                        onClick={() => setSelectedVersion(version)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${
                              isSelected 
                                ? 'text-primary-700 dark:text-primary-300' 
                                : 'text-background-900 dark:text-background-100'
                            }`}>
                              Version {versionNumber}
                            </span>
                            {index === 0 && (
                              <span className="px-2 py-1 text-xs bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-background-500 dark:text-background-400">
                            {new Date(version.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        {version.description && (
                          <p className={`text-sm mb-2 ${
                            isSelected 
                              ? 'text-primary-600 dark:text-primary-400' 
                              : 'text-background-600 dark:text-background-400'
                          }`}>
                            {version.description}
                          </p>
                        )}
                        
                        <div className="text-xs text-background-500 dark:text-background-500 line-clamp-2">
                          {version.content.length > 100 
                            ? `${version.content.substring(0, 100)}...` 
                            : version.content
                          }
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metadata */}
              <div className="bg-white dark:bg-background-800 rounded-xl border border-background-200 dark:border-background-700 p-6">
                <h3 className="text-lg font-semibold text-background-900 dark:text-background-100 mb-4">
                  Information
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-background-500 dark:text-background-400">Created:</span>
                    <span className="ml-2 text-background-700 dark:text-background-300">
                      {new Date(prompt.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-background-500 dark:text-background-400">Last Updated:</span>
                    <span className="ml-2 text-background-700 dark:text-background-300">
                      {new Date(prompt.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {prompt.language && (
                    <div>
                      <span className="text-background-500 dark:text-background-400">Language:</span>
                      <span className="ml-2 text-background-700 dark:text-background-300">
                        {prompt.language.toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <span className="text-background-500 dark:text-background-400">Versions:</span>
                    <span className="ml-2 text-background-700 dark:text-background-300">
                      {prompt.versions.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {prompt.description && (
                <div className="bg-white dark:bg-background-800 rounded-xl border border-background-200 dark:border-background-700 p-6">
                  <h3 className="text-lg font-semibold text-background-900 dark:text-background-100 mb-3">
                    Description
                  </h3>
                  <p className="text-background-700 dark:text-background-300 text-sm leading-relaxed">
                    {prompt.description}
                  </p>
                </div>
              )}

              {/* Group */}
              {group && (
                <div className="bg-white dark:bg-background-800 rounded-xl border border-background-200 dark:border-background-700 p-6">
                  <h3 className="text-lg font-semibold text-background-900 dark:text-background-100 mb-3">
                    Group
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{group.icon}</span>
                    <span className="text-background-700 dark:text-background-300 font-medium">
                      {group.name}
                    </span>
                  </div>
                  {group.description && (
                    <p className="text-background-600 dark:text-background-400 text-sm mt-2">
                      {group.description}
                    </p>
                  )}
                </div>
              )}

              {/* Tags */}
              {prompt.tags.length > 0 && (
                <div className="bg-white dark:bg-background-800 rounded-xl border border-background-200 dark:border-background-700 p-6">
                  <h3 className="text-lg font-semibold text-background-900 dark:text-background-100 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        title="Delete Prompt"
      >
        <div className="space-y-4">
          <p className="text-background-600 dark:text-background-400">
            Are you sure you want to delete "{prompt.title}"? This action cannot be undone and will remove all versions.
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