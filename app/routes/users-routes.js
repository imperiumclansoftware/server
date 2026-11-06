const express = require('express');
const usersCtrl =require('../controllers/users-controller');
const validatorsMiddleware = require('../middlewares/validators-middleware');
const usersRoutes = express.Router();

usersRoutes.post('/',[validatorsMiddleware.email, validatorsMiddleware.password ,validatorsMiddleware.report], usersCtrl.create);

module.exports = usersRoutes;