const express = require('express');
const usersCtrl =require('../controllers/users-controller');
const validatorsMiddleware = require('../middlewares/validators-middleware');
const authMiddleware = require('../middlewares/auth-middleware');
const usersRoutes = express.Router();

usersRoutes.post('/',[validatorsMiddleware.email, validatorsMiddleware.password ,validatorsMiddleware.report], usersCtrl.create);

usersRoutes.get('/me', [authMiddleware], usersCtrl.read);

module.exports = usersRoutes;