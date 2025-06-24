export interface Group {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
  promptCount: number;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  color: string;
  icon?: string;
}

export interface UpdateGroupRequest extends Partial<CreateGroupRequest> {
  id: string;
} 