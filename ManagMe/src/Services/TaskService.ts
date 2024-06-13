import { Project } from '../Models/Project';
import { Task } from '../Models/Task';
import ProjectService from './ProjectServices';

const createTask = (projectId: string, task: Task): void => {
  ProjectService.addTask(projectId, task);
};

const getAllProjectTasks = (project: Project): Task[] => {
  return project.tasks;
}

export default {
  createTask,
  getAllProjectTasks
};