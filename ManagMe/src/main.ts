import './style.css';
import ProjectService from './Services/ProjectServices';
import UserService from './Services/UserService';
import { Project } from './Models/Project';
import CurrentProjectService from './Services/CurrentProjectService';
import { Task } from './Models/Task';
import TaskService from './Services/TaskService';
import { formatDate, generateId } from './utils';


const updateUserList = () => { // do czego to
  console.log('Updating user list');
  const userList = document.getElementById('user-list') as HTMLUListElement;
  userList.innerHTML = '';

  const users = UserService.getUsers();
  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.className = 'user-item';

    const userText = document.createElement('span');
    userText.textContent = `${user.firstName} ${user.lastName} - Role: ${user.role}`; 
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
      console.log('Selected project:', project);
      updateCurrentProject();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      ProjectService.deleteProject(project.id);
      updateProjectList();
      updateCurrentProject();
    });

    const editButton = document.createElement('button');
    const aLink = document.createElement('a');
    aLink.setAttribute('href', `editproject.html`);
    aLink.textContent = 'Edit';
    editButton.appendChild(aLink);

    editButton.addEventListener('click', () => {
      CurrentProjectService.setCurrentProject(project);
    });

    listItem.appendChild(projectText);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    projectList.appendChild(listItem);
  });
};

const updateCurrentProject = () => {
  console.log('Updating current project');
  const currentProject = CurrentProjectService.getCurrentProject();
  const currentProjectDiv = document.getElementById('current-project') as HTMLDivElement;
  currentProjectDiv.textContent = currentProject ? `Current Project: ${currentProject.name}` : 'No project selected';
};

const updateCurrentProjectTasks = () => {
  const currentProject = CurrentProjectService.getCurrentProject();

  if (!currentProject) return

  const currentProjectTasks = TaskService.getAllProjectTasks(currentProject);
  const currentProjectTasksList = document.getElementById('current-project-tasks')!!;

  currentProjectTasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    taskElement.innerHTML = `
    <li>
      <ul>
        <li><h3>${task.name}</h3></li>
        <li><p><strong>Description:</strong> ${task.description}</p></li>
        <li><p><strong>Priority:</strong> ${task.priority}</p></li>
        <li><p><strong>Story:</strong> ${task.story}</p></li>
        <li><p><strong>Estimated Time:</strong> ${task.estimatedTime} hours</p></li>
        <li><p><strong>Stage:</strong> ${task.stage}</p></li>
        <li><p><strong>Created Date:</strong> ${formatDate(task.createdDate)}</p></li>
        ${task.startDate ? `<li><p><strong>Start Date:</strong> ${formatDate(task.startDate)}</p></li>` : ''}
        ${task.endDate ? `<li><p><strong>End Date:</strong> ${formatDate(task.endDate)}</p></li>` : ''}
        ${task.assignedUser ? `<li><p><strong>Assigned User:</strong> ${task.assignedUser.firstName}</p></li>` : ''}
      </ul>
  </li>
`;

    currentProjectTasksList.appendChild(taskElement);
  });
}

const addProject = () => {
  const nameInput = document.getElementById('project-name') as HTMLInputElement;
  const descriptionInput = document.getElementById('project-description') as HTMLInputElement;
  const prioritySelect = document.getElementById('project-priority') as HTMLSelectElement;
  const stageSelect = document.getElementById('project-stage') as HTMLSelectElement;

  const newProject: Project = {
    id: generateId(),
    name: nameInput.value,
    description: descriptionInput.value,
    priority: prioritySelect.value as 'low' | 'medium' | 'high',
    stage: stageSelect.value as 'todo' | 'inprogress' | 'ended',
    tasks: []
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
  updateCurrentProjectTasks();
  //updateUserList();
});