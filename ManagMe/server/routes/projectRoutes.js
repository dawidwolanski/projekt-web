import express from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject, getProjectTasks } from '../controllers/projectsController.js';

const projectRouter = express.Router();

// Pobierz wszystkie projekty
projectRouter.get('/', getProjects);

// Pobierz projekt po ID
projectRouter.get('/:id', getProject);

projectRouter.get('/:id/tasks', getProjectTasks);

// Dodaj nowy projekt
projectRouter.post('/', createProject);

// Zaktualizuj projekt
projectRouter.put('/:id', updateProject);

// Usuń projekt
projectRouter.delete('/:id', deleteProject);

export default projectRouter;
