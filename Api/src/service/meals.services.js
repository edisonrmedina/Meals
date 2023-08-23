const Restaurant = require('../modelos/restaurants.model');
const AppError = require('../utils/appError');
const Meals = require('../modelos/meals.model');
class MealsService {
    async getMeals(){
        try {
            const mealsActive = await Meals.findAll({
              where: {
                status: true,
              },
              include: {
                model: Restaurant,
              },
            });
            if (!mealsActive) {
              return new AppError('Meals not found', 404);
            }
            return mealsActive;
        } catch (error) {
            return new AppError(error, 400);
        }
        
        
        return mealsActive;
    } 
    
    async createMeal(id, meal){
        try {
            const restaurant = await Restaurant.findByPk(id);
            const createMeal = await restaurant.createMeal(meal);
            if (!createMeal) {
                return new AppError('Meal not created', 400);
            }
            
            return createMeal;
        } catch (error) {
            return new AppError(error, 400);
        }
    }

    async getMealById (id){
        const meal = await Meals.findOne({
            where: {
                id: id,
                status: true
            },
            include: {
                model: Restaurant
            }
        });
        return meal;
    }

    async deleteMeal(id){
        const meal = await this.getMealById(id);
        meal.update({status: false});
        return meal;
    }
    
    async updateMeal(id, meal){
        const mealUpdated = await this.getMealById(id);
        mealUpdated.update(meal);
        return mealUpdated;
    }
    
}

module.exports = MealsService;