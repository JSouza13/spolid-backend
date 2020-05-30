import { Router } from 'express';
import handle from 'express-async-handler';
import multer from 'multer';

import CourseController from './app/controllers/CourseController';
import FileController from './app/controllers/FileController';
import InstructorController from './app/controllers/InstructorController';
import LessonController from './app/controllers/LessonController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/Sessions', handle(SessionController.store));

routes.post('/users', handle(UserController.store));
routes.post('/forgot_password', handle(UserController.forgot_password));
routes.post('/reset_password', handle(UserController.reset_password));

// Toda rota após essa linha, precisará de token de autenticação
routes.use(authMiddleware);

routes.put('/users', handle(UserController.update));
routes.post('/files', upload.single('file'), handle(FileController.store));

routes.get('/providers', handle(ProviderController.index));
routes.get('/instructor/courses', handle(InstructorController.index));

routes.get('/courses', handle(CourseController.index));
routes.get('/courses/:id', handle(CourseController.show));
routes.post('/courses', handle(CourseController.store));

routes.get('/courses/:id/lesson', handle(LessonController.index));
routes.post('/courses/:id/lesson', handle(LessonController.store));

export default routes;
