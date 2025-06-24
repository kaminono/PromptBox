export const APP_CONFIG = {
  name: 'PromptBox',
  version: '1.0.0',
  description: 'Lightweight AI Prompt Management Tool',
  author: 'PromptBox Team',
};

export const STORAGE_KEYS = {
  prompts: 'promptbox_prompts',
  groups: 'promptbox_groups',
  theme: 'promptbox_theme',
  settings: 'promptbox_settings',
};

export const DEFAULT_GROUPS = [
  {
    id: 'general',
    name: 'General',
    description: 'General purpose prompts',
    color: '#6B7280',
    icon: '📝',
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Content creation and writing prompts',
    color: '#10B981',
    icon: '✍️',
  },
  {
    id: 'coding',
    name: 'Coding',
    description: 'Programming and development prompts',
    color: '#4F46E5',
    icon: '💻',
  },
  {
    id: 'analysis',
    name: 'Analysis',
    description: 'Data analysis and research prompts',
    color: '#F59E0B',
    icon: '📊',
  },
];

export const DEFAULT_TAGS = [
  'creative',
  'technical',
  'business',
  'educational',
  'research',
  'brainstorming',
  'analysis',
  'documentation',
  'debugging',
  'optimization',
];

export const PROMPT_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
];

export const SORT_OPTIONS = [
  { value: 'title', label: 'Title' },
  { value: 'createdAt', label: 'Created Date' },
  { value: 'updatedAt', label: 'Updated Date' },
];

export const TOAST_DURATION = {
  short: 3000,
  medium: 5000,
  long: 7000,
}; 