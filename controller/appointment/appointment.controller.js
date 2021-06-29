const html = require('../../constants/html/index')
const Appointment = require('../../models/appointment/appointment.model')
const User = require('../../models/user.model')
const Schedule = require('../../models/schedule/schedule.model')
const dayConstants = require('../../constants/date')

exports.getAppointmentDays = async (req, res, next) => {
    res.render('appointment/appointmentDays', {
        pageTitle: 'Citas',
        html: html
    })
}

exports.getAppointments = async (req, res, next) => {
    const {day} = req.query;

    const translatedDay = dayConstants.dayTranslation[day]
    let appointments = await Appointment.getDay(day);
    appointments = JSON.parse(appointments);
    res.render('appointment/appointment', {
        pageTitle: day,
        html: html,
        translatedDay,
        day,
        appointments
    })
}

exports.getNewAppointment = async (req, res, next) => {
    const {day} = req.query;
    const translatedDay = dayConstants.dayTranslation[day]

    let users = await User.fetchAll();
    users = JSON.parse(users);

    let schedules = await Schedule.getDay(day)
    schedules = JSON.parse(schedules)

    res.render('appointment/appointmentNew', {
        pageTitle: day,
        html: html,
        translatedDay,
        day,
        users,
        schedules
    })
}

exports.createNewAppointment = async (req, res, next) => {
    let {schedule, users, day} = req.body;
    schedule = parseInt(schedule);
    users = parseInt(users);
    const appointment = new Appointment(
        null,
        schedule,
        users
    )
    await appointment.save();
    await Schedule.update(schedule)

    res.redirect(`/appointment?day=${day}`)
}
