import { Project } from '../Models/Project';
import ProjectService from './ProjectServices';

class CurrentProjectService {
    private static currentProjectKey = 'currentProject';

    static setCurrentProject(project: Project): void;
    static setCurrentProject(id: string): void;
  
    static async setCurrentProject(arg: string | Project): Promise<void> {
      const projects = await ProjectService.getProjects();
      const project = typeof(arg) == 'string' ? projects[arg] : arg;
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