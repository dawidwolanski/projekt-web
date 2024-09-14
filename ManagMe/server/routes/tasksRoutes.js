import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask, getUsersToAssign } from '../controllers/tasksController.js';

const tasksRouter = express.Router();

// Pobierz wszystkie zadania
tasksRouter.get('/', getTasks);

tasksRouter.get('/userstoassign', getUsersToAssign)

// Pobierz zadanie po ID
tasksRouter.get('/:id', getTask);

// Dodaj nowe zadanie
tasksRouter.post('/', createTask);

// Zaktualizuj zadanie
tasksRouter.put('/:id', updateTask);

// Usuń zadanie
tasksRouter.delete('/:id', deleteTask);

export default tasksRouter;
