const express = require('express');
const router = express.Router();

const scheduleController = require('../controller/schedule/schedule.controller');
const isAuth = require('../middlewares/auth')

router.post('/createSchedule', isAuth, scheduleController.postCreateWeekSchedule)
router.post('/deleteSchedule', isAuth, scheduleController.deleteSchedules)
router.get('/schedule', isAuth, scheduleController.getScheduleCreator );
router.post('/refillSchedule', isAuth, scheduleController.putRefillSchedules)


module.exports = {
    routes: router,
};
