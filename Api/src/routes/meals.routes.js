const express = require('express');
const routes = express.Router();
const validateFields = require('../middlewares/validation.middlewares');

//controllers
const mealsController = require('../controllers/meals.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
routes
    .route('/')
    .get( mealsController.getMeals)

routes
  .route('/:id')
  .get(mealsController.getMealById)
  .post(
    authMiddleware.protect,
    validateFields.validCreateMeals,
    mealsController.createMeal
  )
  .patch(
    
    validateFields.validUpdateMeals,
    mealsController.updateMeal
  )
  .delete(authMiddleware.protect, mealsController.deleteMeal);

module.exports = routes;