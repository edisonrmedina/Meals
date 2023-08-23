const User = require('../modelos/user.model');
const Orders = require('../modelos/orders.model');
const Meals = require('../modelos/meals.model');
const Restaurant = require('../modelos/restaurants.model');
const AppError = require('../utils/appError');

class UserSerivce {
  async findOne(email) {
    try {
      const userDb = await User.findOne({
        where: {
          email,
          status: 'active',
        },
      });
      return userDb;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async create(user) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async updateUser(id, email) {
    try {
      const newUser = await User.update({ email }, { where: { id } });
      return newUser;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async deleteUser(id) {
    try {
      const newUser = await User.update(
        { status: 'inactive' },
        { where: { id } }
      );
      return newUser;
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async getOrders(id, orderId) {
    try {
      const orders = await User.findAll({
        where: { id },
        include: [
          {
            model: Orders,
            include: [
              {
                model: Meals,
                include: [
                  {
                    model: Restaurant,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (orderId && orders.length >= 1) {
        return orders[0].orders.filter((order) => order.id == orderId);
      }

      if (!orderId && orders.length >= 1) {
        return orders[0].orders;
      }

      if (orders.length == 0) {
        return [];
      }

      if (orders.length >= 1) {
        return orders[0].orders;
      }

      return [];
      
    } catch (err) {
      return new AppError(err, 400);
    }
  }

  async getOrderUserById(id,orderId) {
    return this.getOrders(id, orderId);
  }
}

module.exports = UserSerivce;
