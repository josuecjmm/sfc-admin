const express = require('express');
const router = express.Router();

const scheduleController = require('../controller/schedule/schedule.controller');
const isAuth = require('../middlewares/auth')

router.post('/createSchedule', isAuth, scheduleController.postCreateWeekSchedule)
router.post('/deleteSchedule', isAuth, scheduleController.deleteAllSchedules)
router.post('/refillSchedule', isAuth, scheduleController.putRefillSchedules)
router.post('/editSchedule', isAuth, scheduleController.putEditSchedule)
router.get('/schedule', isAuth, scheduleController.getScheduleByDay );
router.get('/schedule/:scheduleId', isAuth, scheduleController.getEditSchedule );
router.get('/schedule/delete/:scheduleId', isAuth, scheduleController.getDeleteSchedule );
router.post('/schedule/delete/:scheduleId', isAuth, scheduleController.deleteSingleSchedule );


module.exports = {
    routes: router,
};
