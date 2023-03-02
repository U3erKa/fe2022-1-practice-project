const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/tokenMiddlewares');
const validators = require('../middlewares/validators');

authRouter.route('/login').post(validators.validateLogin, AuthController.login);
authRouter
  .route('/registration')
  .post(validators.validateRegistrationData, AuthController.registration);
authRouter.route('/refresh').post(checkRefreshToken, AuthController.refresh);

module.exports = authRouter;
