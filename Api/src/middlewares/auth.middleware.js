const { promisify } = require('util');
const { log } = require('console');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//protectAccountOwner 
exports.protect = catchAsync(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = req.headers.authorization;
    }

    if (!token) {
      return next(new AppError('You are not authenticated.', 401));
    }

    next();
  } catch (error) {
    return next(new AppError('error', 500));
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
};

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user,sessionUser} = req;
  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not have permission to perform this action.', 403));
  }
  next();
})