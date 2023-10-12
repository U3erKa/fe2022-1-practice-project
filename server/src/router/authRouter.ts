import { Router } from 'express';
import * as AuthController from '../controllers/authController';
import { checkRefreshToken } from '../middlewares/tokenMiddlewares';
import * as validators from '../middlewares/validators';

const authRouter = Router();

authRouter.route('/login').post(validators.validateLogin, AuthController.login);
authRouter
  .route('/registration')
  .post(validators.validateRegistrationData, AuthController.registration);
authRouter.route('/refresh').post(checkRefreshToken, AuthController.refresh);

export default authRouter;
