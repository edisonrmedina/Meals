const Restaurant = require('../modelos/restaurants.model');
const Reviews = require('../modelos/reviews.model');
const AppError = require('../utils/appError');

class RestaurantService {
  async getRestaurants() {
    try {
      const restaurants = await Restaurant.findAll({
        where: {
          status: 'active',
        },
        include: {
          model: Reviews,
        }
      });
      return restaurants;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async getRestaurantsById(id) {
    try {
      const restaurant = await Restaurant.findByPk(id);
      return restaurant;
    } catch (err) {
      return new AppError(err, 400);
    }
  }
  async createRestaurant(restaurant) {
    try {
      const newRestaurant = await Restaurant.create(restaurant);
      return newRestaurant;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async updateRestaurant(id, restaurant) {
    try {
      const newRestaurant = await Restaurant.update(restaurant, {
        where: { id },
      });
      return newRestaurant;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async deleteRestaurant(id) {
    try {
      const newRestaurant = await Restaurant.update(
        { status: 'inactive' },
        { where: { id } }
      );
      return newRestaurant;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async createReviews(idRestaurant, review) {
    try {
      const newReview = await Reviews.create(review);
      return newReview;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async updateReviewsByReviewId( restaurantId,reviewid, review) {
    try {
      const newReview = await Reviews.update(review, {
        where: { restaurantId, id: reviewid },
      });
      return newReview;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async deleteReviews(restaurantId, reviewid) {
    try {
      const newReview = await Reviews.update(
        { status: 'inactive' },
        { where: { restaurantId, id: reviewid } }
      );
      return newReview;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

}

module.exports = RestaurantService;