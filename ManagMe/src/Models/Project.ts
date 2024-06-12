import { Task } from "./Task";

export interface Project {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high'; // Dodane
  stage: 'todo' | 'inprogress' | 'ended'; // Dodane
  tasks: Task[];
}