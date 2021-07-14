const express = require('express');
const router = express.Router();

const appointmentController = require('../controller/appointment/appointment.controller');
const isAuth = require('../middlewares/auth')

router.post('/appointment/new', appointmentController.createNewAppointment );
router.get('/appointmentDays', isAuth, appointmentController.getAppointmentDays );
router.get('/appointment', isAuth, appointmentController.getAppointments );
router.get('/appointment/list', isAuth, appointmentController.getAppointmentsList );
router.get('/appointment/new', isAuth, appointmentController.getNewAppointment );


module.exports = {
    routes: router,
};
