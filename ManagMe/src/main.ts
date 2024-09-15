import './style.css';
import ProjectService from './Services/ProjectServices';
import UserService from './Services/UserService';
import { Project } from './Models/Project';
import CurrentProjectService from './Services/CurrentProjectService';
import HeaderComponent from './Components/Header';
import { Modal } from 'bootstrap';
import TaskService from './Services/TaskService';
import { Task } from './Models/Task';
import { Notification } from './Models/Notification';
import NotificationService from './Services/NotificationService';


const updateProjectList = async () => {
  const projectList = document.getElementById('project-list')!!;
  const isLogged = UserService.getCurrentUser();
  projectList.innerHTML = '';

  const projects = await ProjectService.getProjects();

  projects.forEach(project => {
    const listItem = document.createElement('div');
    listItem.className = 'project-item card mb-3';

    listItem.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title">${project.name}</h5>
          <p class="card-text">${project.description}</p>
        </div>
        <div class="d-flex align-items-center">
          <span class="me-3">Priority: ${project.priority}</span>
          <span class="me-3">Stage: ${project.stage}</span>
          ${isLogged ?
            `<button class="btn btn-danger delete-btn">Delete</button>
            <button class="btn btn-primary ms-2 addtask-btn"> Add Task </button>`
            : ''
          }
          
        </div>
      </div>
    `;

    const addTaskButton = listItem.querySelector('.addtask-btn');
    addTaskButton?.addEventListener('click', () => {
      CurrentProjectService.setCurrentProject(project);
      window.location.href = 'editproject.html';
    })

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton?.addEventListener('click', async () => {
      await ProjectService.deleteProject(project.id);
      updateProjectList();
      updateCurrentProject();
    });


    listItem.addEventListener('click', async () => {
      await CurrentProjectService.setCurrentProject(project);
      console.log('Selected project:', project);
      updateCurrentProject();
    });

    projectList?.appendChild(listItem);
  });
};

const updateCurrentProject = async () => {
  console.log('Updating current project');
  const currentProject = CurrentProjectService.getCurrentProject();
  const currentProjectDiv = document.getElementById('current-project') as HTMLDivElement;
  currentProjectDiv.textContent = currentProject ? `Current Project: ${currentProject.name}` : 'No project selected';
  updateCurrentProjectTasks();
};



const createNotificationFromTask = async (task: Task) => {
  const notification: Omit<Notification, 'id'> = {
    title: `Task stage has been changed.`,
    message: `Task ${task.name} stage has been changed to ${task.stage}`,
    date: new Date().toDateString(),
    priority: task.stage == 'todo' ? 'low' : 'medium',
    isread: 0
  }

  await NotificationService.addNotification(notification)
}

async function modifyTask(task: Task) {
  await TaskService.updateTask(task.id, task);
  await CurrentProjectService.setCurrentProject(task.project_id);
  await createNotificationFromTask(task);
  updateCurrentProjectTasks();
}

const updateCurrentProjectTasks = () => {
  const currentProject = CurrentProjectService.getCurrentProject();
  if (!currentProject) return;

  const tasks = currentProject.tasks;
  const todoColumn = document.getElementById('todo-column')!;
  const doingColumn = document.getElementById('doing-column')!;
  const doneColumn = document.getElementById('done-column')!;

  todoColumn.innerHTML = '';
  doingColumn.innerHTML = '';
  doneColumn.innerHTML = '';

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = `task-${task.project_id}`;
    card.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">${task.name}</h5>
    <p class="card-text">${task.description}</p>
    <p><strong>Assigned to:</strong> ${task.assignedUser}</p>
    <p><strong>Priority:</strong> ${task.priority}</p>
    <p><strong>Estimated Time:</strong> ${task.estimatedTime} hours</p>
    <p><strong>Story:</strong> ${task.story}</p>
    <p><strong>Created Date:</strong> ${task.createdDate}</p>
    ${task.startDate ? `<p><strong>Started:</strong> ${task.startDate}</p>` : ''}
    ${task.endDate ? `<p><strong>Ended:</strong> ${task.endDate}</p>` : ''}
    <p><strong>Stage:</strong> ${task.stage}</p>
  </div>
`;


    card.addEventListener('dragstart', (e) => {
      e.dataTransfer?.setData('text/plain', task.id.toString());
    });

    if (task.stage === 'todo') {
      todoColumn.appendChild(card);
    } else if (task.stage === 'doing') {
      doingColumn.appendChild(card);
    } else if (task.stage === 'done') {
      doneColumn.appendChild(card);
    }
  });

  setupColumnDragAndDrop(todoColumn, 'todo', tasks);
  setupColumnDragAndDrop(doingColumn, 'doing', tasks);
  setupColumnDragAndDrop(doneColumn, 'done', tasks);
};

const setupColumnDragAndDrop = (column: HTMLElement, newStage: 'todo' | 'doing' | 'done', tasks: Task[]) => {
  column.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  column.addEventListener('drop', async (e) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer?.getData('text/plain');
    const task = tasks.find(t => t.id === parseInt(taskId!));

    if (task && task.stage !== newStage) {
      task.stage = newStage;

      if (newStage === 'doing' || newStage === 'done') {
       
        await openTaskModal(task, newStage);
      } else {
        task.startDate = ''
        task.endDate = ''
        task.assignedUser = ''
        await modifyTask(task);
      }
    }
  });
};


const openTaskModal = async (task: Task, newStage: 'doing' | 'done') => {
  console.log('callin');
  
  const assignedUserSelect = document.getElementById('assignedUser') as HTMLSelectElement;
  const endTimeInput = document.getElementById('endTime') as HTMLInputElement;
  const doneFields = document.getElementById('doneFields')!;

  
  
  
  const usernames = await TaskService.getUsersToAssign();
  
  assignedUserSelect.innerHTML = '';

  usernames.forEach(user => {
    const option = document.createElement('option');
    option.value = `${user.firstName} ${user.lastName}`;
    option.text = `${user.firstName} ${user.lastName}`;
    assignedUserSelect.appendChild(option);
  });



  assignedUserSelect.value = task.assignedUser || '';

  
  if (newStage === 'done') {
    doneFields.style.display = 'block';
  } else {
    doneFields.style.display = 'none';
  }

  
  const taskModalElement = document.getElementById('taskModal')!;
  const taskModal = new Modal(taskModalElement);
  taskModal.show();

  const saveButton = document.getElementById('saveTask')!;
  saveButton.onclick = async () => {
    task.assignedUser = assignedUserSelect.value;

    if (newStage === 'doing') {
      task.startDate = new Date().toDateString()
    } else if (newStage === 'done') {
      task.endDate = new Date(endTimeInput.value).toDateString()
    } 

    
    await modifyTask(task);

    
    taskModal.hide();

    
    taskModalElement.addEventListener('hidden.bs.modal', () => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove(); 
      }
    });
  };

  
  taskModalElement.addEventListener('hidden.bs.modal', () => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  });
};


const addProject = async () => {
  const nameInput = document.getElementById('project-name') as HTMLInputElement;
  const descriptionInput = document.getElementById('project-description') as HTMLInputElement;
  const prioritySelect = document.getElementById('project-priority') as HTMLSelectElement;
  const stageSelect = document.getElementById('project-stage') as HTMLSelectElement;

  const newProject: Omit<Project, 'id' | 'tasks'> = {
    name: nameInput.value,
    description: descriptionInput.value,
    priority: prioritySelect.value as 'low' | 'medium' | 'high',
    stage: stageSelect.value as 'todo' | 'inprogress' | 'ended',
  };

  await ProjectService.addProject(newProject);
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
});

new HeaderComponent().render(document.body)