export interface Task {
    id: number;
    project_id: number;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    story: string;
    estimatedTime: number; 
    stage: 'todo' | 'doing' | 'done';
    createdDate: string;
    startDate?: string; 
    endDate?: string; 
    assignedUser?: string
}
