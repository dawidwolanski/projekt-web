import { User } from "./User";

export interface Task {
<<<<<<< HEAD
=======
    id: string;
    projectId: string;
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    story: string;
    estimatedTime: number; // in hours, for example
    stage: 'todo' | 'doing' | 'done';
    createdDate: string;
    startDate?: string; // Optional, required if state is doing
    endDate?: string; // Optional, required if state is done
    assignedUser?: User; // Optional, required if state is doing or done
}
