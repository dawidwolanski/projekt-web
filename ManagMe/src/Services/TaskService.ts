import { Project } from '../Models/Project';
import { Task } from '../Models/Task';
import ProjectService from './ProjectServices';

const createTask = async (projectId: string, task: Task): Promise<void> => {
 await  ProjectService.addTask(projectId, task);
};

const getAllProjectTasks = (project: Project): Task[] => {
  return project.tasks;
}

export default {
  createTask,
  getAllProjectTasks
};