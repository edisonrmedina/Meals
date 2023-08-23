const express = require('express');
const routes = express.Router();
const validateFields  = require('../middlewares/validation.middlewares');
const userConroller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middlewares');
//login

//rutas para autenticacion


//rutas para roles permitidos
routes
  .route('/singup')
  .post(validateFields.validCreateUser, userConroller.signup);

routes
  .route('/login')
  .post(
      validateFields.validLogin,
      userMiddleware.validUser,
      userConroller.login
      ); 

routes.use(authMiddleware.protect);
//Se implementa hallar el id por el token de usuario
routes
  .route('/')
  .patch(validateFields.validUpdateUser,userMiddleware.validateUserExist, userConroller.updateUser)
  .delete(userMiddleware.validateUserExist, userConroller.deleteUser);
  
routes
  .route('/orders')
  .get(userMiddleware.validateUserExist, userConroller.getOrders);

routes
  .route('/orders/:id')
  .get(userMiddleware.validateUserExist, userConroller.getOrderUserById);
  
module.exports = routes