import { Project } from '../Models/Project';
import ProjectService from './ProjectServices';

class CurrentProjectService {
    private static currentProjectKey = 'currentProject';

    static setCurrentProject(project: Project): Promise<void>;
    static setCurrentProject(id: number): Promise<void>;
  
    static async setCurrentProject(arg: number | Project): Promise<void> {
      const projects = await ProjectService.getProjects();
      const found = projects.find(project => project.id == arg);

      if (!found) {
        console.error('Project not found')
      }

      const project = typeof(arg) == 'number' ? found : arg;
      localStorage.setItem(this.currentProjectKey, JSON.stringify(project));
    }

  
    static getCurrentProject(): Project | null {
      const project = localStorage.getItem(this.currentProjectKey);
      return project ? JSON.parse(project) : null;
    }
  
    static clearCurrentProject(): void {
      localStorage.removeItem(this.currentProjectKey);
    }
  }
  
  export default CurrentProjectService;