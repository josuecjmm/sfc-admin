const express = require('express');
const router = express.Router();

const scheduleController = require('../controller/schedule/schedule.controller');
const isAuth = require('../middlewares/auth')

router.get('/schedule', isAuth, scheduleController.getScheduleCreator );
router.post('/createSchedule', isAuth, scheduleController.postCreateWeekSchedule)
router.post('/deleteSchedule', isAuth, scheduleController.deleteSchedules)

module.exports = {
    routes: router,
};
