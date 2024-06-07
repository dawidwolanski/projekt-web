import { Project } from '../Models/Project';
import ProjectService from './ProjectServices';

class CurrentProjectService {
    private static currentProjectKey = 'currentProject';
  
    static setCurrentProject(project: Project): void {
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