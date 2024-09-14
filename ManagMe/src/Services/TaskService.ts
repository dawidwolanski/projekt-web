import { Task } from '../Models/Task';


const HOST_NAME = import.meta.env.VITE_HOST_NAME;

class TaskService {
  // Pobieranie wszystkich zadań
  static async getTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${HOST_NAME}/tasks`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const tasks = await response.json() as Task[];
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Unable to fetch tasks.');
    }
  }

  // Pobieranie zadania po ID
  static async getTask(id: number): Promise<Task> {
    try {
      const response = await fetch(`${HOST_NAME}/tasks/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const task = await response.json() as Task;
      return task;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Unable to fetch task.');
    }
  }

  static async getUsersToAssign(): Promise<{firstName: string, lastName: string}[]> {
    try {
      const response = await fetch(`${HOST_NAME}/tasks/userstoassign`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const users = await response.json() as {firstName: string, lastName: string}[];
      return users;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Unable to fetch task.');
    }
  }

  // Dodawanie nowego zadania
  static async addTask(task: Task): Promise<void> {
    try {
      const response = await fetch(`${HOST_NAME}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to add task.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      throw new Error('Unable to add task.');
    }
  }

  // Aktualizowanie zadania
  static async updateTask(id: number, updatedTask: Task): Promise<void> {
    try {
      const response = await fetch(`${HOST_NAME}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error('Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Unable to update task.');
    }
  }

  // Usuwanie zadania
  static async deleteTask(id: number): Promise<void> {
    try {
      const response = await fetch(`${HOST_NAME}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Unable to delete task.');
    }
  }
}

export default TaskService;
