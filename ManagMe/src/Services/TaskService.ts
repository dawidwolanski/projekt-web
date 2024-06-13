import { Project } from '../Models/Project';
import { Task } from '../Models/Task';
<<<<<<< HEAD
import ProjectService from './ProjectServices';

const createTask = (projectId: string, task: Task): void => {
  ProjectService.addTask(projectId, task);
};

const getAllProjectTasks = (project: Project): Task[] => {
  return project.tasks;
}

export default {
  createTask,
=======

let tasks: Task[] = [];

const saveTasksToLocalStorage = (): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = (): void => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
};

loadTasksFromLocalStorage();

const createTask = (task: Task): void => {
  tasks.push(task);
  saveTasksToLocalStorage();
};

const getTask = (taskId: string): Task | undefined => {
  return tasks.find(task => task.id === taskId);
};

const getAllTasks = (): Task[] => {
  return tasks;
};

const updateTask = (taskId: string, updatedTask: Task): void => {
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...updatedTask, id: taskId };
    saveTasksToLocalStorage();
  }
};

const getAllProjectTasks = (project: Project): Task[] => tasks.filter(t => t.projectId == project.id)

const deleteTask = (taskId: string): void => {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasksToLocalStorage();
};

export default {
  createTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
  getAllProjectTasks
};