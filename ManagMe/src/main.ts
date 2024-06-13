import './style.css';
import ProjectService from './Services/ProjectServices';
import UserService from './Services/UserService';
import { Project } from './Models/Project';
import CurrentProjectService from './Services/CurrentProjectService';
<<<<<<< HEAD
import TaskService from './Services/TaskService';
import { formatDate, generateId } from './utils';
import HeaderComponent from './Components/Header';


// const updateUserList = () => { // do czego to
//   console.log('Updating user list');
//   const userList = document.getElementById('user-list') as HTMLUListElement;
//   userList.innerHTML = '';

//   const users = UserService.getUsers();
//   users.forEach(user => {
//     const listItem = document.createElement('li');
//     listItem.className = 'user-item';
=======
import { Task } from './Models/Task';
import TaskService from './Services/TaskService';
import { formatDate, generateId } from './utils';


const updateUserList = () => { // do czego to
  console.log('Updating user list');
  const userList = document.getElementById('user-list') as HTMLUListElement;
  userList.innerHTML = '';
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233

//     const userText = document.createElement('span');
//     userText.textContent = `${user.firstName} ${user.lastName} - Role: ${user.role}`; 
//     listItem.appendChild(userText);

<<<<<<< HEAD
//     userList.appendChild(listItem);
//   });
// };
=======
    const userText = document.createElement('span');
    userText.textContent = `${user.firstName} ${user.lastName} - Role: ${user.role}`; 
    listItem.appendChild(userText);
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233

const updateProjectList = async () => {
  console.log('Updating project list');
  const projectList = document.getElementById('project-list')!!;
  projectList.innerHTML = '';

  const projects = await ProjectService.getProjects();
  const projectsEntries = Object.entries(projects);

<<<<<<< HEAD
  projectsEntries.forEach(([id, project]) => {
    const listItem = document.createElement('div');
    listItem.className = 'project-item card mb-3';
=======
    const projectText = document.createElement('span');
    projectText.textContent = `${project.name}: ${project.description} - Priority: ${project.priority}, Stage: ${project.stage}`;
    projectText.addEventListener('click', () => {
      CurrentProjectService.setCurrentProject(project);
      console.log('Selected project:', project);
      updateCurrentProject();
    });
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233

    listItem.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title">${project.name}</h5>
          <p class="card-text">${project.description}</p>
        </div>
        <div class="d-flex align-items-center">
          <span class="me-3">Priority: ${project.priority}</span>
          <span class="me-3">Stage: ${project.stage}</span>
          <button class="btn btn-danger delete-btn">Delete</button>
          <button class="btn btn-primary ms-2 addtask-btn"><a href="editproject.html?id=${id}">Add Tasks</a> </button>
        </div>
      </div>
    `;

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton?.addEventListener('click', () => {
      ProjectService.deleteProject(id);
      updateProjectList();
      updateCurrentProject();
    });

<<<<<<< HEAD

    listItem.addEventListener('click', async () => {
      await CurrentProjectService.setCurrentProject(project);
      console.log('Selected project:', project);
      updateCurrentProject();
    });

    projectList?.appendChild(listItem);
=======
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
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
  });
};

const updateCurrentProject = () => {
  console.log('Updating current project');
  const currentProject = CurrentProjectService.getCurrentProject();
  const currentProjectDiv = document.getElementById('current-project') as HTMLDivElement;
  currentProjectDiv.textContent = currentProject ? `Current Project: ${currentProject.name}` : 'No project selected';
  updateCurrentProjectTasks();
};

const updateCurrentProjectTasks = () => {
  const currentProject = CurrentProjectService.getCurrentProject();

<<<<<<< HEAD
  if (!currentProject) return;

  const currentProjectTasks = TaskService.getAllProjectTasks(currentProject);
  const currentProjectTasksContainer = document.getElementById('current-project-tasks')!!;

  currentProjectTasksContainer.innerHTML = ''; // Wyczyszczenie kontenera przed dodaniem nowych zadań

  currentProjectTasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task card mb-3';

    taskElement.innerHTML = `
      <div class="card-body">
        <h3 class="card-title">${task.name}</h3>
        <p class="card-text"><strong>Description:</strong> ${task.description}</p>
        <p class="card-text"><strong>Priority:</strong> ${task.priority}</p>
        <p class="card-text"><strong>Story:</strong> ${task.story}</p>
        <p class="card-text"><strong>Estimated Time:</strong> ${task.estimatedTime} hours</p>
        <p class="card-text"><strong>Stage:</strong> ${task.stage}</p>
        <p class="card-text"><strong>Created Date:</strong> ${formatDate(task.createdDate)}</p>
        ${task.startDate ? `<p class="card-text"><strong>Start Date:</strong> ${formatDate(task.startDate)}</p>` : ''}
        ${task.endDate ? `<p class="card-text"><strong>End Date:</strong> ${formatDate(task.endDate)}</p>` : ''}
        ${task.assignedUser ? `<p class="card-text"><strong>Assigned User:</strong> ${task.assignedUser.firstName}</p>` : ''}
      </div>
    `;

    currentProjectTasksContainer.appendChild(taskElement);
=======
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
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
  });
}

const addProject = () => {
  const nameInput = document.getElementById('project-name') as HTMLInputElement;
  const descriptionInput = document.getElementById('project-description') as HTMLInputElement;
  const prioritySelect = document.getElementById('project-priority') as HTMLSelectElement;
  const stageSelect = document.getElementById('project-stage') as HTMLSelectElement;

  const newProject: Project = {
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
  const userDetailsDiv = document.getElementById('user-details') as HTMLDivElement;
  const loginButton = document.getElementById('login-button') as HTMLButtonElement;
  const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;

  if (!user) {
    userDetailsDiv.textContent = 'Not logged yet';
    loginButton.classList.remove('hide');
    logoutButton.classList.add('hide');

    return
  }

  loginButton.classList.add('hide');
  logoutButton.classList.remove('hide');
  userDetailsDiv.textContent = `Logged in as: ${user.firstName} ${user.lastName}`;
};





document.getElementById('logout-button')?.addEventListener('click', () => {
  UserService.deleteTokens();
  window.location.reload();
})

document.addEventListener('DOMContentLoaded', () => {
  const addProjectButton = document.getElementById('add-project') as HTMLButtonElement;
  addProjectButton.addEventListener('click', addProject);

  updateProjectList();
  updateCurrentProject();
  updateUserDetails();
  updateCurrentProjectTasks();
  //updateUserList();
<<<<<<< HEAD
});

new HeaderComponent().render(document.body)
=======
});
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
