import './style.css';
import UserService from './Services/UserService';
import CurrentProjectService from './Services/CurrentProjectService';
import { Task } from './Models/Task';
import TaskService from './Services/TaskService';
import HeaderComponent from './Components/Header';

const updateUserDetails = () => {
    const user = UserService.getCurrentUser();

    if (!user) return

    const userDiv = document.getElementById('user-details') as HTMLDivElement;
    userDiv.textContent = `Logged in as: ${user.firstName} ${user.lastName}`;
};

const updateCurrentProject = async () => {
  const currentProject = CurrentProjectService.getCurrentProject();
  const currentProjectDiv = document.getElementById('current-project') as HTMLDivElement;
  currentProjectDiv.textContent = currentProject ? `Current Project: ${currentProject.name}` : 'No project selected';
};

const updateUsersList = async () => {
  const usersSelect = document.getElementById('assignedUser')!!;
  
  const usernames = await TaskService.getUsersToAssign()

  usersSelect.innerHTML = '';

  usernames.forEach(user => {
    const option = document.createElement('option');
    const name = `${user.firstName} ${user.lastName}`;
    option.value = name
    option.textContent = name
    usersSelect.appendChild(option);
  });
};

const dynamicUpdateForm = () => {
  const stateElement = document.getElementById('state') as HTMLSelectElement;
  const doingFieldsElement = document.getElementById('doingFields') as HTMLDivElement;
  const doneFieldsElement = document.getElementById('doneFields') as HTMLDivElement;

  stateElement.addEventListener('change', () => {
      const state = stateElement.value;

      switch (state) {
          case 'doing':
              doingFieldsElement.style.display = 'block';
              doneFieldsElement.style.display = 'none';
              break;
          case 'done':
              doingFieldsElement.style.display = 'none';
              doneFieldsElement.style.display = 'block';
              break;
          default:
              doingFieldsElement.style.display = 'none';
              doneFieldsElement.style.display = 'none';
              break;
      }
  });
}

function createTaskFromForm(form: HTMLFormElement): Task {
  const formData = new FormData(form);

  const project_id = CurrentProjectService.getCurrentProject()?.id as number;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as 'low' | 'medium' | 'high';
  const story = formData.get('story') as string;
  const estimatedTime = parseFloat(formData.get('estimatedTime') as string);
  const stage = formData.get('state') as 'todo' | 'doing' | 'done';
  const createdDate = new Date().toDateString();
  const startDate = stage === 'doing' ? new Date(formData.get('startDate')?.toString() as string).toDateString() : undefined;
  const endDate = stage === 'done' ? new Date(formData.get('endDate')?.toString() as string).toDateString() : undefined;
  const assignedUser = formData.get('doneUser') as string;

  let task: Task = {  
      id: 0,
      project_id,
      name,
      description,
      priority,
      story,
      estimatedTime,
      stage,
      createdDate,
      assignedUser
  };

  if (startDate) task = { ...task, startDate}
  if (endDate) task = { ...task, endDate}

  return task;
}


document.addEventListener('DOMContentLoaded', () => {
  new HeaderComponent().render(document.body)
    updateCurrentProject();
    updateUserDetails();
    dynamicUpdateForm();
    updateUsersList();

    document.getElementById('taskForm')?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const task = createTaskFromForm(form);
      await TaskService.addTask(task);

      window.location.href = './';
  });
});