const html = require('../../constants/html/index')
const Appointment = require('../../models/appointment/appointment.model')
const User = require('../../models/user.model')
const Schedule = require('../../models/schedule/schedule.model')
const dayConstants = require('../../constants/date')

const orderDayAndHour = (array, day) => {
    const oneDay = array.filter(d => d.day === day);
    const amAppointments = oneDay.filter(time => time.hour.includes('AM'));
    const pmAppointments = oneDay.filter(time => time.hour.includes('PM'));
    const amSorted = amAppointments.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    const pmSorted = pmAppointments.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    const fullDaySortedAppointments = [...amSorted, ...pmSorted]
    return fullDaySortedAppointments
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

exports.getAppointmentsList = async (req, res, next) => {
    let appointments = await Appointment.selectAll()
    appointments = JSON.parse(appointments)

    const Monday = orderDayAndHour(appointments, 'Monday')
    const Tuesday = orderDayAndHour(appointments, 'Tuesday')
    const Wednesday = orderDayAndHour(appointments, 'Wednesday')
    const Thursday = orderDayAndHour(appointments, 'Thursday')
    const Friday = orderDayAndHour(appointments, 'Friday')
    const Saturday = orderDayAndHour(appointments, 'Saturday')

    const allAppointments = [
        ...Monday,
        ...Tuesday,
        ...Wednesday,
        ...Thursday,
        ...Friday,
        ...Saturday
    ]

    const translatedAllAppointments = allAppointments.map( app => {
        return {
            id: app.id,
            fullName: app.fullName,
            dayScheduleId: app.dayScheduleId,
            day: dayConstants.dayTranslation[app.day],
            hour: app.hour
        }
    })

    res.render('appointment/appointmentList', {
        pageTitle: 'Lista Citas',
        html: html,
        allAppointments: translatedAllAppointments
    })

}

