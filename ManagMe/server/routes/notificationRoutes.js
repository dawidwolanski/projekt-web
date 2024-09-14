import express from 'express';
import { getNotifications, setNotificationRead, createNotification } from '../controllers/notificationsController.js';

const notificationsRouter = express.Router();

notificationsRouter.get('/', getNotifications);
notificationsRouter.post('/', createNotification)
notificationsRouter.post('/readnotification/:id', setNotificationRead);


export default notificationsRouter;