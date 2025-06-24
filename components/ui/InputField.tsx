'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

interface InputFieldProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
}

interface TextareaFieldProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, required, className = '', ...props }, ref) => {
    const baseClasses = 'block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1';
    const normalClasses = 'border-background-300 bg-white text-background-900 placeholder-background-500 focus:border-primary-500 focus:ring-primary-500 dark:border-background-600 dark:bg-background-800 dark:text-background-100 dark:placeholder-background-400 dark:focus:border-primary-400';
    const errorClasses = 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-900/10 dark:text-red-100 dark:placeholder-red-400';
    
    const inputClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${className}`;
    
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-background-700 dark:text-background-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-background-500 dark:text-background-400">{helperText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, helperText, required, rows = 4, className = '', ...props }, ref) => {
    const baseClasses = 'block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 resize-vertical';
    const normalClasses = 'border-background-300 bg-white text-background-900 placeholder-background-500 focus:border-primary-500 focus:ring-primary-500 dark:border-background-600 dark:bg-background-800 dark:text-background-100 dark:placeholder-background-400 dark:focus:border-primary-400';
    const errorClasses = 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-900/10 dark:text-red-100 dark:placeholder-red-400';
    
    const textareaClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${className}`;
    
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-background-700 dark:text-background-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={textareaClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-background-500 dark:text-background-400">{helperText}</p>
        )}
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField'; 