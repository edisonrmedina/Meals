const express = require('express');
const routes = express.Router();
const validateFields = require('../middlewares/validation.middlewares');

//controllers
const ordersController = require('../controllers/order.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middlewares');

routes
  .route('/')
  .post(
    authMiddleware.protect,
    validateFields.validCreateOrder,
    userMiddleware.validateUserExist,
    ordersController.createOrder
  );

routes
  .route('/me')
  .get(
    authMiddleware.protect,
    userMiddleware.validateUserExist,
    ordersController.meOrders
  );

routes
    .route('/:id')
    .patch(
      authMiddleware.protect,
      userMiddleware.validateUserExist,
      ordersController.updateOrder
    )
    .delete(
      authMiddleware.protect,
      userMiddleware.validateUserExist,
      ordersController.deleteOrder
    )
module.exports = routes;