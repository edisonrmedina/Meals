const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

const passwordValidator = body('password').custom((value) => {
  if (!/(?=.*\d)(?=.*[A-Z])(?=.*\W)/.test(value) && value.length > 6) {
    throw new Error(
      'Password must contain at least one number, one uppercase letter, one special character and at least 6 characters'
    );
  }
  return true;
});

exports.validCreateUser = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Must be a valid email'),
  passwordValidator,
  validateFields,
];

exports.validUpdateUser = [
  body('email').isEmail().withMessage('Must be a valid email'),
  validateFields,
]

exports.validLogin = [
  body('email').isEmail().withMessage('Must be a valid email'),
  passwordValidator,
  validateFields
];

exports.validOrder = [
  validateFields
]

exports.validCreateRestaurant = [
  body('name').notEmpty().withMessage('El nombre del restaurante es obligatorio.'),
  body('address').notEmpty().withMessage('La dirección del restaurante es obligatoria.'),
  body('rating')
    .notEmpty().withMessage('El rating del restaurante es obligatorio.')
    .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser un valor entre 1 y 5.'),
  validateFields
];

exports.validUpdateRestaurant = [
  body('name').notEmpty().withMessage('El nombre del restaurante es obligatorio.'),
  body('address').notEmpty().withMessage('La dirección del restaurante es obligatoria.'),
  body('rating')
    .notEmpty().withMessage('El rating del restaurante es obligatorio.')
    .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser un valor entre 1 y 5.'),
  validateFields
]

exports.validCreateMeals = [
  body('name').notEmpty().withMessage('El nombre de la comida es obligatorio.'),
  body('price').notEmpty().withMessage('El precio de la comida es obligatorio.'),
  validateFields
]

exports.validUpdateMeals = [
  body('name').notEmpty().withMessage('El nombre de la comida es obligatorio.'),
  body('price').notEmpty().withMessage('El precio de la comida es obligatorio.'),
  validateFields
]

exports.validCreateOrder = [
  body('name').notEmpty().withMessage('El nombre del cliente es obligatorio.'),
  body('price').notEmpty().withMessage('El precio del cliente es obligatorio.'),
  body('mealId')
    .notEmpty()
    .withMessage('El mealId de la ordern es obligatorio.'),
  body('quantity').notEmpty().withMessage('La cantidad de la orden es obligatorio.'),
  validateFields,
];