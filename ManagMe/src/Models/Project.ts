import { Task } from "./Task";

export interface Project {
  id: number;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  stage: 'todo' | 'inprogress' | 'ended'; 
  tasks: Task[];
}