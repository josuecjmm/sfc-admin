const express = require('express');
const router = express.Router();

const userController = require('../controller/security/user.controller');
const validation = require('../utils/formValidations');
const isAuth = require('../middlewares/auth')


/* USER ROUTES =>*/
// POST /user
router.post('/user', validation.createUser
    , userController.postAddUser);
router.get('/register', userController.getRegister);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/resetPassword', userController.getResetPassword);
router.post('/resetPassword', userController.postResetPassword);
router.get('/resetPassword/:token', userController.getNewPassword);
router.post('/newPassword', userController.postNewPassword);
router.get('/user/:userId', isAuth, userController.getAddEditUser);
router.get('/user', isAuth, userController.getUsers);
router.post('/user/edit', isAuth, userController.putUser);

module.exports = {
    routes: router,
};
