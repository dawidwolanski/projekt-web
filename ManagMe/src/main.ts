import './style.css';
import ProjectService from './Services/ProjectServices';
import UserService from './Services/UserService';
import { Project } from './Models/Project';
import CurrentProjectService from './Services/CurrentProjectService';

const generateId = () => Math.random().toString(36).substr(2, 9);

const updateProjectList = () => {
  const projectList = document.getElementById('project-list') as HTMLUListElement;
  projectList.innerHTML = '';

  const projects = ProjectService.getProjects();
  projects.forEach(project => {
    const listItem = document.createElement('li');
    listItem.textContent = `${project.name}: ${project.description}`;
    listItem.className = 'project-item';
    listItem.addEventListener('click', () => {
      CurrentProjectService.setCurrentProject(project);
      updateCurrentProject();
    });

    projectList.appendChild(listItem);
  });
};

const addProject = () => {
  const nameInput = document.getElementById('project-name') as HTMLInputElement;
  const descriptionInput = document.getElementById('project-description') as HTMLInputElement;

  const newProject: Project = {
    id: generateId(),
    name: nameInput.value,
    description: descriptionInput.value,
  };

  ProjectService.addProject(newProject);
  updateProjectList();

  nameInput.value = '';
  descriptionInput.value = '';
};

const updateUserDetails = () => {
  const user = UserService.getCurrentUser();
  const userDiv = document.getElementById('user-details') as HTMLDivElement;
  userDiv.textContent = `Logged in as: ${user.firstName} ${user.lastName}`;
};

const updateCurrentProject = () => {
  const currentProject = CurrentProjectService.getCurrentProject();
  const currentProjectDiv = document.getElementById('current-project') as HTMLDivElement;
  currentProjectDiv.textContent = currentProject ? `Current Project: ${currentProject.name}` : 'No project selected';
};

document.addEventListener('DOMContentLoaded', () => {
  const addProjectButton = document.getElementById('add-project') as HTMLButtonElement;
  addProjectButton.addEventListener('click', addProject);

  updateProjectList();
  updateCurrentProject();
  updateUserDetails();
});