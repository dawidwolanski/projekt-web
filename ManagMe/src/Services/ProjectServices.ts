import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { Project } from '../Models/Project';
import db from '../db';
import { Task } from '../Models/Task';

type Projects = {[key: string]: Project}

class ProjectService {
  private static projects: Projects = {};
  

  static async getProjects(): Promise<Projects> {
    const projectsCount = Object.keys(ProjectService.projects).length
    if (projectsCount) return ProjectService.projects
  
    const querySnapshot = await getDocs(collection(db, "projects/"));

    const projects: Projects = {}

    querySnapshot.forEach(doc => {
      const id = doc.id;
      const d = doc.data() as Project;
      projects[id] = d;
    });
    
    ProjectService.projects = projects;
    return projects
  }
  
  static async addProject(project: Project): Promise<void> {
    const docRef = await addDoc(collection(db, 'projects/'), project);
    ProjectService.projects[docRef.id] = project;
  }

  static async updateProject(id: string, updatedProject: Project): Promise<void> {
    ProjectService.projects[id] = updatedProject;
    const ref = doc(db, 'projects/', id);
    await setDoc(ref, updatedProject);
  }

  static async deleteProject(id: string): Promise<void> {
    delete ProjectService.projects[id]

    const ref = doc(db, 'projects/', id);
    await deleteDoc(ref);
  }

  static async addTask(projectId: string, task: Task) {
    const project = ProjectService.projects[projectId];
    if (!project) return

    project.tasks.push(task);

    await this.updateProject(projectId, project)
  }
}

export default ProjectService;