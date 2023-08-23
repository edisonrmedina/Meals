const app = require('./app');
const PORT = process.env.PORT || 3001;
const {db} = require('./database/config');

//models

const Restaurant = require('./modelos/restaurants.model');
const Meals = require('./modelos/meals.model');
const users = require('./modelos/user.model')
const Orders = require('./modelos/orders.model');
const Reviews = require('./modelos/reviews.model');


db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
   
db.sync({
    force: false,
}).then(() => {
  // Definición de relaciones con columnas FK

  // Un restaurante (Restaurant) tiene muchas revisiones (Reviews)
  Restaurant.hasMany(Reviews, {
    foreignKey: 'restaurantId', // Columna FK en la tabla Reviews
  });

  // Una revisión (Review) pertenece a un restaurante (Restaurant)
  Reviews.belongsTo(Restaurant, {
    foreignKey: 'restaurantId', // Columna FK en la tabla Reviews
  });

  // Un restaurante (Restaurant) tiene muchas comidas (Meals)
  Restaurant.hasMany(Meals, {
    foreignKey: 'restaurantId', // Columna FK en la tabla Meals
  });

  // Una comida (Meal) pertenece a un restaurante (Restaurant)
  Meals.belongsTo(Restaurant, {
    foreignKey: 'restaurantId', // Columna FK en la tabla Meals
  });

  // Relaciones
    users.hasMany(Orders, {
      foreignKey: 'userId',
    });

    Orders.belongsTo(users, {
      foreignKey: 'userId',
    });

    Orders.hasMany(Meals, {
    foreignKey: 'orderId',
    });

    Meals.belongsTo(Orders, {
    foreignKey: 'orderId',
    }); 

  // Un usuario (User) tiene muchas revisiones (Reviews)
  users.hasMany(Reviews, {
    foreignKey: 'userId', // Columna FK en la tabla Reviews
  });

  // Una revisión (Review) pertenece a un usuario (User)
  Reviews.belongsTo(users, {
    foreignKey: 'userId', // Columna FK en la tabla Reviews
  });
  console.log('Models have been synchronized');
}).catch(err => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})