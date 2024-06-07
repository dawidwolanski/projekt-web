import { Project } from '../Models/Project';

class ProjectService {
  private static storageKey = 'projects';

  static getProjects(): Project[] {
    const projects = localStorage.getItem(this.storageKey);
    return projects ? JSON.parse(projects) : [];
  }

  static addProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
  }

  static updateProject(updatedProject: Project): void {
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(project => project.id === updatedProject.id);
    if (projectIndex !== -1) {
      projects[projectIndex] = updatedProject;
      localStorage.setItem(this.storageKey, JSON.stringify(projects));
    }
  }

  static deleteProject(id: string): void {
    const projects = this.getProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProjects));
  }
}

export default ProjectService;