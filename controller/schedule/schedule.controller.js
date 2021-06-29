const {weekdaysSchedule, saturdaySchedule, weekdayDays} = require('../../constants/schedule')
const Schedule = require('../../models/schedule/schedule.model')
const Appointment = require('../../models/appointment/appointment.model')
const html = require('../../constants/html/index')
const dateUtil = require('../../utils/date')
const dateConstants = require('../../constants/date')

exports.postCreateWeekSchedule = async (req, res, next) => {
    weekdayDays.forEach(day => {
        weekdaysSchedule.forEach(hour => {
            const weekday = new Schedule(
                null,
                day,
                hour,
                8
            )
            weekday.save()
        })
    })
    saturdaySchedule.forEach(hour => {
        const saturday = new Schedule(
            null,
            'Saturday',
            hour,
            8
        )
    })
    res.redirect('/schedule')
};

exports.getScheduleCreator = async (req, res, next) => {
    res.render('schedule/schedule', {
        pageTitle: 'Horarios',
        html: html
    })
}

exports.getRecentSchedules = async (req, res, next) => {
    const todayDay = dateUtil.getTodayDay()
    const translatedDay = dateConstants.dayTranslation[todayDay]
    let todaySchedules;
    if(todayDay === 'Sunday') {
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

exports.deleteSchedules = async (req, res, next) => {
    await Appointment.deleteAll();
    await Schedule.delete();
    res.redirect('/schedule')
}

