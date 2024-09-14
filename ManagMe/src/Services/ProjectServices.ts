
import { Project } from '../Models/Project';
import { Task } from '../Models/Task';

const HOST_NAME = import.meta.env.VITE_HOST_NAME;

class ProjectService {
  static async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${HOST_NAME}/projects`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const projects = await response.json() as Project[];

      const projectTasksPromises = projects.map(async (project) => {
        const tasksResponse = await fetch(`${HOST_NAME}/projects/${project.id}/tasks`);
        if (!tasksResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const tasks = await tasksResponse.json() as Task[];
        return {
          ...project,
          tasks,
        };
      });

      return await Promise.all(projectTasksPromises);
    } catch (error) {
      console.error('Error fetching projects and tasks:', error);
      throw new Error('Unable to fetch projects and tasks.');
    }
  }

  static async getProject(id: number): Promise<Project> {
    try {
      const response = await fetch(`${HOST_NAME}/project/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const project = await response.json() as Project;
      const tasksResponse = await fetch(`${HOST_NAME}/projects/${project.id}/tasks`);
      const tasks = await tasksResponse.json() as Task[];

      return {
          ...project,
          tasks,
        };
    } catch (error) {
      console.error('Error fetching projects and tasks:', error);
      throw new Error('Unable to fetch projects and tasks.');
    }
  }

  static async addProject(project: Omit<Project, 'id' | 'tasks'>): Promise<void> {
    try {
      const response = await fetch(`${HOST_NAME}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error('Failed to add project.');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      throw new Error('Unable to add project.');
    }
  }

  static async updateProject(id: number, updatedProject: Project): Promise<void> {
    try {
      const response = await fetch(`${HOST_NAME}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });
      if (!response.ok) {
        throw new Error('Failed to update project.');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Unable to update project.');
    }
  }

  static async deleteProject(id: number): Promise<void> {
    try {
      const response = await fetch(`${HOST_NAME}/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete project.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Unable to delete project.');
    }
  }
}

export default ProjectService;