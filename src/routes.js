import { Router } from 'express';
import multer from 'multer';

import CourseController from './app/controllers/CourseController';
import FileController from './app/controllers/FileController';
import LessonController from './app/controllers/LessonController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/forgot_password', UserController.forgot_password);
routes.post('/reset_password', UserController.reset_password);

routes.post('/Sessions', SessionController.store);

// Toda rota após essa linha, precisará de token de autenticação
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);

routes.post('/courses', CourseController.store);
routes.get('/courses', CourseController.index);

routes.post('/courses/:id/lesson', LessonController.store);

export default routes;
