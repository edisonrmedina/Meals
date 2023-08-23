const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const MealsService = require('../service/meals.services');
const mealsServices = new MealsService();

exports.getMeals = catchAsync(async (req, res, next) => {
    const meals = await mealsServices.getMeals();
    res.status(200).json({
        status: 'success',
        meals
    })  
})

exports.createMeal = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const meal = await mealsServices.createMeal(id , req.body);
    res.status(201).json({
        status: 'success',
        meal
    })
})

exports.getMealById = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const meal = await mealsServices.getMealById(id);
    res.status(200).json({
        status: 'success',
        meal
    })
})

exports.deleteMeal = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const meal = await mealsServices.deleteMeal(id);
    res.status(200).json({
        status: 'success',
        meal
    })
})

exports.updateMeal = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const meal = await mealsServices.updateMeal(id, req.body);
    res.status(200).json({
        status: 'success',
        meal
    })
})