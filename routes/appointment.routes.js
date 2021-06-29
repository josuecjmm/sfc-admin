const express = require('express');
const router = express.Router();

const appointmentController = require('../controller/appointment/appointment.controller');
const isAuth = require('../middlewares/auth')

router.get('/appointmentDays', isAuth, appointmentController.getAppointmentDays );
router.get('/appointment', isAuth, appointmentController.getAppointments );
router.get('/appointment/new', isAuth, appointmentController.getNewAppointment );
router.post('/appointment/new', appointmentController.createNewAppointment );

module.exports = {
    routes: router,
};
