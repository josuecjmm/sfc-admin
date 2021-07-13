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
        schedules,
        errors: req.flash('error')
    })
}

exports.createNewAppointment = async (req, res, next) => {
    let {schedule, user, day} = req.body;
    schedule = parseInt(schedule);
    user = parseInt(user);

    let userAppointments = await Appointment.getUserAppointments(user);
    userAppointments = JSON.parse(userAppointments)
    const selectedScheduleUserAppointments = userAppointments.filter(app => {
            return app.day === day
        }
    )

    let scheduleSelected = await Schedule.selectSingle(schedule)
    scheduleSelected = JSON.parse(scheduleSelected)

    if(selectedScheduleUserAppointments.length > 0) {
        req.flash('error',
            `El usuario ya tiene una cita el dia ${dayConstants.dayTranslation[day]}`)
        res.redirect(`/appointment/new?day=${day}`)
    } else {
        const totalSpacesForSchedule = scheduleSelected[0].total;
        if (totalSpacesForSchedule < 1) {
            req.flash('error',
                `Ya no hay espacios a las ${scheduleSelected[0].hour}`)
            res.redirect(`/appointment/new?day=${day}`)
        } else {
            const appointment = new Appointment(
                null,
                schedule,
                user
            )
            await appointment.save();
            await Schedule.updateReduceTotal(schedule)

            res.redirect(`/appointment?day=${day}`)
        }

    }
}
