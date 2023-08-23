const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const orderService = require('../service/orders.services');
const orderServices = new orderService();

exports.createOrder = catchAsync(async (req, res, next) => {
    const user = req.user
    const order = await orderServices.createOrder(req.body,user);
    res.status(201).json({
        status: 'success',
        order
    })
})

exports.meOrders = catchAsync(async (req, res, next) => {
    const user = req.user
    const orders = await orderServices.meOrders(user);
    res.status(200).json({
        status: 'success',
        orders
    })
})

exports.updateOrder = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const order = await orderServices.updateOrder(id, req.body);
    res.status(200).json({
        status: 'success',
        order
    })
})

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const order = await orderServices.deleteOrder(id);
    res.status(200).json({
        status: 'success',
        order
    })
})