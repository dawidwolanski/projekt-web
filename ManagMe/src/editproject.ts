import './style.css';
<<<<<<< HEAD
import UserService from './Services/UserService';
import CurrentProjectService from './Services/CurrentProjectService';
import { Task } from './Models/Task';
import TaskService from './Services/TaskService';
import HeaderComponent from './Components/Header';

const projectIdFromUrl = (new URL(window.location.href)).searchParams.get('name')

const updateUserDetails = () => {
    const user = UserService.getCurrentUser();

    if (!user) return

=======
import ProjectService from './Services/ProjectServices';
import UserService from './Services/UserService';
import { Project } from './Models/Project';
import CurrentProjectService from './Services/CurrentProjectService';
import { Task } from './Models/Task';
import TaskService from './Services/TaskService';
import { generateId } from './utils';

const updateUserDetails = () => {
    const user = UserService.getCurrentUser();
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
    const userDiv = document.getElementById('user-details') as HTMLDivElement;
    userDiv.textContent = `Logged in as: ${user.firstName} ${user.lastName}`;
};

<<<<<<< HEAD
const updateCurrentProject = async () => {
  if (!projectIdFromUrl) {
    window.location.href = '/';
    return
  }

  CurrentProjectService.setCurrentProject(projectIdFromUrl)
=======
const updateCurrentProject = () => {
  console.log('Updating current project');
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
  const currentProject = CurrentProjectService.getCurrentProject();
  const currentProjectDiv = document.getElementById('current-project') as HTMLDivElement;
  currentProjectDiv.textContent = currentProject ? `Current Project: ${currentProject.name}` : 'No project selected';
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

<<<<<<< HEAD
=======

  const id = generateId();
  const projectId = CurrentProjectService.getCurrentProject()?.id ?? ''; // do poprawy bo nie powinno sie dac wejsc do edycji bez current projekta
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as 'low' | 'medium' | 'high';
  const story = formData.get('story') as string;
  const estimatedTime = parseFloat(formData.get('estimatedTime') as string);
  const stage = formData.get('state') as 'todo' | 'doing' | 'done';
  const createdDate = new Date(formData.get('createdDate') as string).toDateString();
  const startDate = stage === 'doing' ? new Date(formData.get('startDate')?.toString() as string).toDateString() : undefined;
  const endDate = stage === 'done' ? new Date(formData.get('endDate')?.toString() as string).toDateString() : undefined;
<<<<<<< HEAD
  const assignedUser = UserService.getCurrentUser() ?? undefined

  const task: Task = {
      name,
=======
  const assignedUser = UserService.getCurrentUser()

  const task: Task = {
      id,
      name,
      projectId,
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
      description,
      priority,
      story,
      estimatedTime,
      stage,
      createdDate,
      startDate,
      endDate,
      assignedUser
  };

  return task;
}




document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  new HeaderComponent().render(document.body)
=======
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
    updateCurrentProject();
    updateUserDetails();
    dynamicUpdateForm();

    document.getElementById('taskForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
<<<<<<< HEAD

      if (!projectIdFromUrl) return

      const form = event.target as HTMLFormElement;
      const task = createTaskFromForm(form);
      console.log('Task created:', task);
      TaskService.createTask(projectIdFromUrl, task);
      window.location.href = '/';
=======
      const form = event.target as HTMLFormElement;
      const task = createTaskFromForm(form);
      console.log('Task created:', task);
      TaskService.createTask(task);
>>>>>>> 4b4a0d7e4ca9d0270f642e142754b5c20a834233
  });
});