export interface Task {
    id: number;
    project_id: number;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    story: string;
    estimatedTime: number; // in hours
    stage: 'todo' | 'doing' | 'done';
    createdDate: string;
    startDate?: string; // Optional, required if state is doing
    endDate?: string; // Optional, required if state is done
    assignedUser?: string
}
