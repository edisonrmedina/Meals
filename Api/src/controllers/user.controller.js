const User = require('../modelos/user.model');
const generateJWT = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const UserSerivce = require('../service/user.service');
const userSerivce = new UserSerivce();
exports.signup = catchAsync(async (req, res, next) => {
  //Crear usuario (enviar name, email, y password por req.body) (opcional el role)
  
  const { name, email, password  } = req.body;
  const user = await userSerivce.findOne(email);
  
  if (user) {
    return next(new AppError('User already exists', 400));
  }

  const newUser = await userSerivce.create({
    name,
    email,
    password,
  })


  if (!newUser) {
    return next(new AppError('User not created', 400));
  }

  const token = await generateJWT(newUser.id);

  res.status(201).json({
    status: 'success',
    token,
    newUser
  });

});

exports.login = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;
  

  if(!user){
    return next(new AppError('User not found', 404));
  }

  const validPassword = await bcrypt.compare(password, user.password);

  

  if(!validPassword){
    return next(new AppError('Invalid password', 400));
  }

  const token = await generateJWT(user.id);

  req.session.sessionUser = user;
  console.log(req.session.sessionUser);
  res.status(200).json({
    status: 'success',
    token,
    user
  })

})

exports.updateUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { user } = req;

  if(!user){
    return next(new AppError('User not found', 404));
  }

  const userUpdate = await userSerivce.updateUser(user.id, email);

  if(!userUpdate){
    return next(new AppError('User not updated', 400));
  }

  return res.status(200).json({
    status: 'updated successfully',
    user,
  });

})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  if(!user){
    return next(new AppError('User not found', 404));
  }
  await userSerivce.deleteUser(user.id);
  return res.status(200).json({
    status: 'deleted successfully',
    user
  })
})

exports.getOrders = catchAsync(async (req, res, next) => {
  const { user } = req;
  if(!user){
    return next(new AppError('User not found', 404));
  }
  const orders = await userSerivce.getOrders(user.id);
  return res.status(200).json({
    status: 'success',
    orders
  })
})

exports.getOrderUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  if(!user){
    return next(new AppError('User not found', 404));
  }
  const order = await userSerivce.getOrderUserById(user.id, req.params.id);
  return res.status(200).json({
    status: 'success',
    order
  })
})