const express = require('express');
const router = express.Router();

const publicController = require('../controller/public.controller');
const scheduleController = require('../controller/schedule/schedule.controller');
const isAuth = require('../middlewares/auth')

// GET /error
router.get('/home', isAuth,  publicController.getHome );
router.get('/error', publicController.getError);
router.get('/translate',  scheduleController.postCreateWeekSchedule);

module.exports = {
    routes: router,
};
