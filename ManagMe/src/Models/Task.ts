import { User } from "./User";

export interface Task {
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    story: string;
    estimatedTime: number; // in hours
    stage: 'todo' | 'doing' | 'done';
    createdDate: string;
    startDate?: string; // Optional, required if state is doing
    endDate?: string; // Optional, required if state is done
    assignedUser: string
}
