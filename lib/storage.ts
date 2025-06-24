import { Prompt, Group, PromptFilter } from '../types';
import { STORAGE_KEYS, DEFAULT_GROUPS } from './constants';

// Generic storage utilities
export class Storage {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key: ${key}`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage for key: ${key}`, error);
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage for key: ${key}`, error);
    }
  }
}

// Prompt storage operations
export class PromptStorage {
  static getAll(): Prompt[] {
    const prompts = Storage.get<Prompt[]>(STORAGE_KEYS.prompts, []);
    // Convert date strings back to Date objects
    return prompts.map(prompt => ({
      ...prompt,
      createdAt: new Date(prompt.createdAt),
      updatedAt: new Date(prompt.updatedAt),
      versions: prompt.versions.map(version => ({
        ...version,
        createdAt: new Date(version.createdAt),
      })),
    }));
  }

  static getById(id: string): Prompt | null {
    const prompts = this.getAll();
    return prompts.find(prompt => prompt.id === id) || null;
  }

  static create(prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'versions'>): Prompt {
    const prompts = this.getAll();
    const now = new Date();
    const newPrompt: Prompt = {
      ...prompt,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
      versions: [{
        id: this.generateId(),
        content: prompt.content,
        createdAt: now,
      }],
    };
    
    prompts.push(newPrompt);
    Storage.set(STORAGE_KEYS.prompts, prompts);
    return newPrompt;
  }

  static update(id: string, updates: Partial<Prompt>, versionDescription?: string): Prompt | null {
    const prompts = this.getAll();
    const index = prompts.findIndex(prompt => prompt.id === id);
    
    if (index === -1) return null;
    
    const existingPrompt = prompts[index];
    const now = new Date();
    
    // If content is being updated, create a new version
    const versions = [...existingPrompt.versions];
    if (updates.content && updates.content !== existingPrompt.content) {
      versions.push({
        id: this.generateId(),
        content: updates.content,
        createdAt: now,
        description: versionDescription,
      });
    }
    
    const updatedPrompt: Prompt = {
      ...existingPrompt,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: now,
      versions,
    };
    
    prompts[index] = updatedPrompt;
    Storage.set(STORAGE_KEYS.prompts, prompts);
    return updatedPrompt;
  }

  static delete(id: string): boolean {
    const prompts = this.getAll();
    const filtered = prompts.filter(prompt => prompt.id !== id);
    
    if (filtered.length === prompts.length) return false;
    
    Storage.set(STORAGE_KEYS.prompts, filtered);
    return true;
  }

  static search(filter: PromptFilter): Prompt[] {
    let prompts = this.getAll();
    
    // Search by text
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      prompts = prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchLower) ||
        prompt.content.toLowerCase().includes(searchLower) ||
        prompt.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by tags
    if (filter.tags && filter.tags.length > 0) {
      prompts = prompts.filter(prompt =>
        filter.tags!.some(tag => prompt.tags.includes(tag))
      );
    }
    
    // Filter by group
    if (filter.groupId) {
      prompts = prompts.filter(prompt => prompt.groupId === filter.groupId);
    }
    
    // Filter by starred
    if (filter.isStarred !== undefined) {
      prompts = prompts.filter(prompt => prompt.isStarred === filter.isStarred);
    }
    
    // Sort
    if (filter.sortBy) {
      prompts.sort((a, b) => {
        const aValue = a[filter.sortBy!];
        const bValue = b[filter.sortBy!];
        
        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;
        
        return filter.sortOrder === 'desc' ? -comparison : comparison;
      });
    }
    
    return prompts;
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Group storage operations
export class GroupStorage {
  static getAll(): Group[] {
    const groups = Storage.get<Group[]>(STORAGE_KEYS.groups, []);
    
    // Initialize with default groups if empty
    if (groups.length === 0) {
      const defaultGroups = DEFAULT_GROUPS.map(group => ({
        ...group,
        createdAt: new Date(),
        updatedAt: new Date(),
        promptCount: 0,
      }));
      Storage.set(STORAGE_KEYS.groups, defaultGroups);
      return defaultGroups;
    }
    
    // Convert date strings back to Date objects
    return groups.map(group => ({
      ...group,
      createdAt: new Date(group.createdAt),
      updatedAt: new Date(group.updatedAt),
    }));
  }

  static getById(id: string): Group | null {
    const groups = this.getAll();
    return groups.find(group => group.id === id) || null;
  }

  static create(group: Omit<Group, 'id' | 'createdAt' | 'updatedAt' | 'promptCount'>): Group {
    const groups = this.getAll();
    const now = new Date();
    const newGroup: Group = {
      ...group,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
      promptCount: 0,
    };
    
    groups.push(newGroup);
    Storage.set(STORAGE_KEYS.groups, groups);
    return newGroup;
  }

  static update(id: string, updates: Partial<Group>): Group | null {
    const groups = this.getAll();
    const index = groups.findIndex(group => group.id === id);
    
    if (index === -1) return null;
    
    const updatedGroup: Group = {
      ...groups[index],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date(),
    };
    
    groups[index] = updatedGroup;
    Storage.set(STORAGE_KEYS.groups, groups);
    return updatedGroup;
  }

  static delete(id: string): boolean {
    const groups = this.getAll();
    const filtered = groups.filter(group => group.id !== id);
    
    if (filtered.length === groups.length) return false;
    
    Storage.set(STORAGE_KEYS.groups, filtered);
    return true;
  }

  static updatePromptCounts(): void {
    const groups = this.getAll();
    const prompts = PromptStorage.getAll();
    
    const updatedGroups = groups.map(group => ({
      ...group,
      promptCount: prompts.filter(prompt => prompt.groupId === group.id).length,
    }));
    
    Storage.set(STORAGE_KEYS.groups, updatedGroups);
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Theme storage
export class ThemeStorage {
  static get(): boolean {
    return Storage.get<boolean>(STORAGE_KEYS.theme, false);
  }

  static set(isDark: boolean): void {
    Storage.set(STORAGE_KEYS.theme, isDark);
  }

  static toggle(): boolean {
    const current = this.get();
    const newValue = !current;
    this.set(newValue);
    return newValue;
  }
}

// Import/Export utilities
export class ImportExportStorage {
  static exportData() {
    const data = {
      prompts: PromptStorage.getAll(),
      groups: GroupStorage.getAll(),
      exportedAt: new Date(),
      version: '1.0.0',
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptbox-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async importData(file: File): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate data structure
      if (!data.prompts || !data.groups || !Array.isArray(data.prompts) || !Array.isArray(data.groups)) {
        return { success: false, message: 'Invalid data format' };
      }
      
      // Backup current data
      const backup = {
        prompts: PromptStorage.getAll(),
        groups: GroupStorage.getAll(),
      };
      
      // Import data
      Storage.set(STORAGE_KEYS.prompts, data.prompts);
      Storage.set(STORAGE_KEYS.groups, data.groups);
      
      return {
        success: true,
        message: `Successfully imported ${data.prompts.length} prompts and ${data.groups.length} groups`,
        data: backup,
      };
    } catch (error) {
      return {
        success: false,
        message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }
} 