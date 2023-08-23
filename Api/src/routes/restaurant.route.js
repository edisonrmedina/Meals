const express = require('express');
const routes = express.Router();
const validateFields = require('../middlewares/validation.middlewares');

//controllers
const restaurantController = require('../controllers/restaurant.controller');
//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middlewares');

const { route } = require('./user.route');

routes
    .route('/')
    .get(restaurantController.getRestaurants);

routes
    .route('/:id')
    .get(restaurantController.getRestaurantsById);

routes.use(authMiddleware.protect);
routes
  .route('/')
  .post(
    validateFields.validCreateRestaurant,
    userMiddleware.validUser,
    authMiddleware.restrictTo('admin'),
    restaurantController.createRestaurant
  );

routes
  .route('/:id')
  .patch(
    validateFields.validUpdateRestaurant,
    userMiddleware.validUser,
    authMiddleware.restrictTo('admin'),
    restaurantController.updateRestaurant
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.restrictTo('admin'),
    restaurantController.deleteRestaurant
  );

routes
  .route('/reviews/:restaurantId')
  .post(
    userMiddleware.validUser,
    authMiddleware.restrictTo('admin'),
    restaurantController.createReviews
  );

routes
  .route('/reviews/:restaurantId/:idReview')
  .patch(
    userMiddleware.validUser,
    authMiddleware.restrictTo('admin'),
    restaurantController.updateReviewsByUserId
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.restrictTo('admin'),
    restaurantController.deleteReviews
  );
  
module.exports = routes;