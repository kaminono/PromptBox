export interface Prompt {
  id: string;
  title: string;
  content: string;
  description?: string;
  tags: string[];
  groupId?: string;
  isStarred: boolean;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
  versions: PromptVersion[];
}

export interface PromptVersion {
  id: string;
  content: string;
  createdAt: Date;
  description?: string;
}

export interface PromptFilter {
  search?: string;
  tags?: string[];
  groupId?: string;
  isStarred?: boolean;
  sortBy?: 'title' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface CreatePromptRequest {
  title: string;
  content: string;
  description?: string;
  tags?: string[];
  groupId?: string;
  language?: string;
}

export interface UpdatePromptRequest extends Partial<CreatePromptRequest> {
  id: string;
} 