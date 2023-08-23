const express = require('express');

const app = express();
const session = require('express-session');
const userRoutes = require('./routes/user.route'); 
const restaurantRoutes = require('./routes/restaurant.route');
const mealsRoutes = require('./routes/meals.routes');
const ordersRoutes = require('./routes/orders.route');

const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appError');

const secretKey = 'secretomejorguardado!';

// Configuración de express-session con la clave secreta
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/restaurants',restaurantRoutes);
app.use('/api/v1/meals',mealsRoutes);
app.use('/api/v1/orders',ordersRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;