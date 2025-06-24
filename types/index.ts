export * from './prompt';
export * from './group';
import type { Prompt } from './prompt';
import type { Group } from './group';

export interface Theme {
  isDark: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface ImportExportData {
  prompts: Prompt[];
  groups: Group[];
  exportedAt: Date;
  version: string;
} 