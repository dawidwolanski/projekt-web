import './style.css';
import ProjectService from './Services/ProjectServices';
import UserService from './Services/UserService';
import { Project } from './Models/Project';
import CurrentProjectService from './Services/CurrentProjectService';
import { User } from './Models/User';


const generateId = () => Math.random().toString(36).substr(2, 9);

const updateUserList = () => {
  console.log('Updating user list');
  const userList = document.getElementById('user-list') as HTMLUListElement;
  userList.innerHTML = '';

  const users = UserService.getUsers();
  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.className = 'user-item';

    const userText = document.createElement('span');
    userText.textContent = `${user.firstName} ${user.lastName} - Role: ${user.role}`; // Zaktualizowane
    listItem.appendChild(userText);

    userList.appendChild(listItem);
  });
};

const updateProjectList = () => {
  console.log('Updating project list');
  const projectList = document.getElementById('project-list') as HTMLUListElement;
  projectList.innerHTML = '';

  const projects = ProjectService.getProjects();
  projects.forEach(project => {
    const listItem = document.createElement('li');
    listItem.className = 'project-item';

    const projectText = document.createElement('span');
    projectText.textContent = `${project.name}: ${project.description} - Priority: ${project.priority}, Stage: ${project.stage}`;
    projectText.addEventListener('click', () => {
      CurrentProjectService.setCurrentProject(project);
      console.log('Selected project:', project); // Dodaj log, aby sprawdzić, czy projekt jest wybierany
      updateCurrentProject();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      ProjectService.deleteProject(project.id);
      updateProjectList();
      updateCurrentProject();
    });

    listItem.appendChild(projectText);
    listItem.appendChild(deleteButton);
    projectList.appendChild(listItem);
  });
};

const updateCurrentProject = () => {
  console.log('Updating current project');
  const currentProject = CurrentProjectService.getCurrentProject();
  const currentProjectDiv = document.getElementById('current-project') as HTMLDivElement;
  currentProjectDiv.textContent = currentProject ? `Current Project: ${currentProject.name}` : 'No project selected';
};

const addProject = () => {
  const nameInput = document.getElementById('project-name') as HTMLInputElement;
  const descriptionInput = document.getElementById('project-description') as HTMLInputElement;
  const prioritySelect = document.getElementById('project-priority') as HTMLSelectElement; // Dodane
  const stageSelect = document.getElementById('project-stage') as HTMLSelectElement; // Dodane

  const newProject: Project = {
    id: generateId(),
    name: nameInput.value,
    description: descriptionInput.value,
    priority: prioritySelect.value as 'low' | 'medium' | 'high', // Dodane
    stage: stageSelect.value as 'todo' | 'inprogress' | 'ended', // Dodane
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
  updateCurrentProject();
  updateUserDetails();
  updateUserList(); // Dodane
});