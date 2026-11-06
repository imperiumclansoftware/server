const express=  require('express');
const authCtrl = require('../controllers/auth-controller');
const validatorsMiddleware = require('../middlewares/validators-middleware');
const authRoutes = express.Router();
const rateLimiterMiddleware = require('../middlewares/rateLimiter-middleware')

authRoutes.post('/',[validatorsMiddleware.email, validatorsMiddleware.report, rateLimiterMiddleware.login], authCtrl.login);

module.exports = authRoutes;