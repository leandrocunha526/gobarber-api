import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

// Users
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Providers
import ProviderController from './app/controllers/ProviderController';
import AvailableController from './app/controllers/AvailableController';

// Appointment;
import AppointmentController from './app/controllers/AppointmentController';

// Schedule
import ScheduleController from './app/controllers/ScheduleController';

// Notifications
import NotificationController from './app/controllers/NotificationController';

// Files
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

// Users - public
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Private and private route user update (data protection)
routes.use(authMiddleware);
routes.put('/users', UserController.update);

// Providers
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

// Appointment
routes.post('/providers', AppointmentController.store);
routes.get('/providers', AppointmentController.index);
routes.delete('/providers', AppointmentController.delete);

// Schedule
routes.get('/schedule', ScheduleController.index);

// Notification
routes.get('/notification', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);

// Files
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
