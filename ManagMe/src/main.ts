import './style.css';
import ProjectService from './Services/ProjectServices';
import UserService from './Services/UserService';
import { Project } from './Models/Project';

const generateId = () => Math.random().toString(36).substr(2, 9);

const updateProjectList = () => {
  const projectList = document.getElementById('project-list') as HTMLUListElement;
  projectList.innerHTML = '';

  const projects = ProjectService.getProjects();
  projects.forEach(project => {
    const listItem = document.createElement('li');
    listItem.textContent = `${project.name}: ${project.description}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      ProjectService.deleteProject(project.id);
      updateProjectList();
    });

    listItem.appendChild(deleteButton);
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

document.addEventListener('DOMContentLoaded', () => {
  const addProjectButton = document.getElementById('add-project') as HTMLButtonElement;
  addProjectButton.addEventListener('click', addProject);

  updateProjectList();
  updateUserDetails();
});