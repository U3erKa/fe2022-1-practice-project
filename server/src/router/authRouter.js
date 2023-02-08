const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/tokenMiddlewares');
const validators = require('../middlewares/validators');

authRouter.post('/login', validators.validateLogin, AuthController.login);
authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  AuthController.registration
);
authRouter.post('/refresh', checkRefreshToken, AuthController.refresh);


module.exports = authRouter;
