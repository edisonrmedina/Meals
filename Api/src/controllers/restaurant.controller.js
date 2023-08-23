const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const restaurantService = require('../service/restaurant.services');
const resService = new restaurantService();

exports.getRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await resService.getRestaurants();
    res.status(200).json({
        status: 'success',
        restaurants
    })
})

exports.getRestaurantsById = catchAsync(async (req, res, next) => {
    const restaurant = await resService.getRestaurantsById(req.params.id);
    res.status(200).json({
        status: 'success',
        restaurant
    })
})

exports.createRestaurant = catchAsync(async (req, res, next) => {
  /**Crear un nuevo restaurant (enviar name, address, rating (INT)) rating debe
    ser un valor del 1 al 5 */
  const restaurant = await resService.createRestaurant(req.body);

  if (!restaurant) {
    return next(new AppError('Restaurant not created', 400));
  }

  res.status(201).json({
    status: 'success',
    restaurant: restaurant ,
  });

});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await resService.updateRestaurant(req.params.id, req.body);
  res.status(200).json({
    status: 'Restaurant updated successfully',
    restaurant: { ...restaurant, ...req.body },
  })
})

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await resService.deleteRestaurant(req.params.id);
  res.status(200).json({
    status: 'Restaurant deleted successfully',
    restaurant
  })
})

exports.createReviews = catchAsync(async (req, res, next) => {
  const reviews = await resService.createReviews(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    reviews
  })
});

exports.updateReviewsByUserId = catchAsync(async (req, res, next) => {
  const { restaurantId, idReview } = req.params;
  const reviews = await resService.updateReviewsByReviewId(
    restaurantId,
    idReview,
    req.body
  );
  res.status(200).json({
    status: 'Review updated successfully',
    reviews
})}

);

exports.deleteReviews = catchAsync(async (req, res, next) => {
  const { restaurantId, idReview } = req.params;
  const reviews = await resService.deleteReviews(restaurantId, idReview);
  res.status(200).json({
    status: 'Review deleted successfully',
    reviews 
    }
  )}
);

