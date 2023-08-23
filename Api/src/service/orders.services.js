const AppError = require('../utils/appError');
const Orders = require('../modelos/orders.model');
const Meals = require('../modelos/meals.model');
const Restaurant = require('../modelos/restaurants.model');
class OrdersService {
    async createOrder (order,user) {
        try {
            const mealData = await Meals.findOne({
                where: {
                    id: order.mealId
                }
            })

            if (!mealData) {
                return new AppError('Meal not found', 404);
            }
            const price = mealData.price * order.quantity;
            
            order.price = price;
            order.userId = user.id
            
            const orderCreated = await Orders.create(order);
            
            return orderCreated;;

        } catch (error) {
            return new AppError(error, 400);
        }
    }

    async meOrders (user) {
        try {
            const orders = await Orders.findAll({
                where: {
                    userId: user.id
                },
                include: {
                    model: Meals,
                    include: {
                        model: Restaurant,
                    },
                }
            })
            if (!orders) {
                return new AppError('Orders not found', 404);
            }
            return orders;
        }catch (error) {
            return new AppError(error, 400);
        }
    }

    async updateOrder (id) {
        try {
            const order = await Orders.findOne({
                where: {
                    id: id,
                    status : 'active'
                }
            })

            if (!order) {
                return new AppError('Order not found', 404);
            }
            order.update({
                status: 'completed'
            });

            return order;
        } catch (error) {
            return new AppError(error, 400);
        }
    }

    async deleteOrder (id) {
        try {
            const order = await Orders.findOne({
                where: {
                    id: id,
                    status : 'active'
                }
            })

            if (!order) {
                return new AppError('Order not found', 404);
            }
            order.update({
                status: 'cancelled'
            });

            return order;

        }catch (error) {
            return new AppError(error, 400);
        }
    }
}

module.exports = OrdersService