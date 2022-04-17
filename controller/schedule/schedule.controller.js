const {
    weekdaysSchedule, saturdaySchedule, weekdayDays,
    totalAppointmentsPossible
} = require('../../constants/schedule')
const Schedule = require('../../models/schedule/schedule.model')
const Appointment = require('../../models/appointment/appointment.model')
const html = require('../../constants/html/index')
const dateUtil = require('../../utils/date')
const dateConstants = require('../../constants/date')

function orderSchedule(array) {
    const amAppointments = array.filter(time => time.hour.includes('AM'));
    const pmAppointments = array.filter(time => time.hour.includes('PM'));
    const amSorted = amAppointments.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    const pmSorted = pmAppointments.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    const fullDaySortedAppointments = [...amSorted, ...pmSorted]
    return fullDaySortedAppointments
}

exports.postCreateWeekSchedule = async (req, res, next) => {
    let valuesToInsert = '';
    weekdayDays.forEach(day => {
        weekdaysSchedule.forEach(hour => {
            valuesToInsert += `\n('${day}','${hour}',${totalAppointmentsPossible}),`
        })
    })
    saturdaySchedule.forEach(hour => {
        valuesToInsert += `\n('Saturday','${hour}',${totalAppointmentsPossible}),`
    })
    valuesToInsert = valuesToInsert.slice(0, -1);
    await Schedule.save(valuesToInsert)
    res.redirect('/schedule')
};

exports.getScheduleCreator = async (req, res, next) => {
    res.render('schedule/schedule', {
        pageTitle: 'Horarios',
        html: html
    })
}

exports.getScheduleByDay = async (req, res) => {
    const {day} = req.query;
    if (!day) {
        res.render('schedule/schedule', {
            pageTitle: 'Horarios',
            html: html
        })
    } else {
        const translatedDay = dateConstants.dayTranslation[day]

        let daySchedules = await Schedule.getDay(day);
        daySchedules = JSON.parse(daySchedules)
        daySchedules = orderSchedule(daySchedules)
        const translatedSchedules = daySchedules.map(day => {
            return {
                id: day.id,
                day: day.day,
                translatedDay: dateConstants.dayTranslation[day.day],
                hour: day.hour,
                total: day.total
            }
        })

        res.render('schedule/dayScheduleList', {
            day: translatedDay,
            schedules: translatedSchedules,
            pageTitle: 'Dia',
            html: html
        })
    }
}

exports.getEditSchedule = async (req, res) => {
    const {scheduleId} = req.params;
    let schedule = await Schedule.selectSingle(scheduleId)
    schedule = JSON.parse(schedule)[0]
    schedule.translatedDay = dateConstants.dayTranslation[schedule.day]
    res.render('schedule/editSchedule', {
        schedule,
        pageTitle: 'Editar Horario',
        html: html
    })
}

exports.getDeleteSchedule = async (req, res) => {
    const {scheduleId} = req.params;
    let schedule = await Schedule.selectSingle(scheduleId)
    schedule = JSON.parse(schedule)[0]
    schedule.translatedDay = dateConstants.dayTranslation[schedule.day]
    let appointmentRelatedUsers = await Appointment.getUsersRelatedToAppointment(scheduleId)
    appointmentRelatedUsers = JSON.parse(appointmentRelatedUsers)
    res.render('schedule/deleteSchedule', {
        schedule,
        appointmentRelatedUsers,
        pageTitle: 'Borrar Horario',
        html: html
    })
}

exports.getRecentSchedules = async (req, res, next) => {
    const todayDay = dateUtil.getTodayDay()
    const translatedDay = dateConstants.dayTranslation[todayDay]
    let todaySchedules;
    if (todayDay === 'Sunday') {
        todaySchedules = []
    } else {
        todaySchedules = await Schedule.getDay(todayDay)
        todaySchedules = JSON.parse(todaySchedules)
    }

    res.render('index', {
        pageTitle: 'Inicio',
        html: html,
        todaySchedules,
        translatedDay
    })
}

async function restoreDefaultSchedules() {
    let currentSchedules = await Schedule.selectAll();
    currentSchedules = JSON.parse(currentSchedules);
    currentSchedules = currentSchedules.map(({day, hour}) => {
        return JSON.stringify({
            day,
            hour
        })
    })

    let schedulesDefault = [];

    weekdayDays.forEach(day => {
        weekdaysSchedule.forEach(hour => {
            schedulesDefault.push(
                JSON.stringify({
                        day,
                        hour,
                    }
                )
            )
        })
    })

    saturdaySchedule.forEach(hour => {
        schedulesDefault.push(
            JSON.stringify({
                    day: 'Saturday',
                    hour,
                }
            )
        )
    })

    const missingSchedules = schedulesDefault.filter(schedule => {
        if (!currentSchedules.includes(schedule)) {
            return schedule
        }
    })

    let valuesToInsert = '';

    missingSchedules.forEach(schedule => {
        schedule = JSON.parse(schedule);
        const {day, hour} = schedule
        valuesToInsert += `\n('${day}','${hour}',${totalAppointmentsPossible}),`
    })
    valuesToInsert = valuesToInsert.slice(0, -1);

    if(valuesToInsert) {
        await Schedule.save(valuesToInsert)
    }
}

exports.putRefillSchedules = async (req, res, next) => {
    await restoreDefaultSchedules();
    await Appointment.deleteAll();
    await Schedule.updateRefillSchedules()
    res.redirect('/schedule')
};

exports.putEditSchedule = async (req, res,) => {
    let {total, id, day} = req.body;
    total = parseInt(total)
    id = parseInt(id)
    await Schedule.updateTotal(total, id)
    res.redirect(`/schedule?day=${day}`)
};

exports.deleteSingleSchedule = async (req, res, next) => {
    let {id, day} = req.body;
    id = parseInt(id)
    await Appointment.deleteAppointmentRelatedToSchedule(id)
    await Schedule.deleteSingle(id)
    res.redirect(`/schedule?day=${day}`)
}

exports.deleteAllSchedules = async (req, res, next) => {
    await Appointment.deleteAll();
    await Schedule.delete();
    res.redirect('/schedule')
}

