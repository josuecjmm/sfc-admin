const {weekdays, saturday} = require('../../constants/schedule')
const Schedule = require('../../models/schedule/schedule.model')
const html = require('../../constants/html/index')
const dateUtil = require('../../utils/date')
const dateConstants = require('../../constants/date')

exports.postCreateWeekSchedule = async (req, res, next) => {
    weekdays.forEach(hour => {
        const weekday = new Schedule(
            null,
            hour,
            8
        )
        weekday.save('Monday')
        weekday.save('Tuesday')
        weekday.save('Wednesday')
        weekday.save('Thursday')
        weekday.save('Friday')
    })
    saturday.forEach(hour => {
        const saturday = new Schedule(
            null,
            hour,
            8
        )
        saturday.save('Saturday')
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
    }

    res.render('index', {
        pageTitle: 'Inicio',
        html: html,
        todaySchedules: JSON.parse(todaySchedules),
        translatedDay
    })
}

exports.deleteSchedules = async (req, res, next) => {
    await Schedule.deleteDay('Monday')
    await Schedule.deleteDay('Tuesday')
    await Schedule.deleteDay('Wednesday')
    await Schedule.deleteDay('Thursday')
    await Schedule.deleteDay('Friday')
    await Schedule.deleteDay('Saturday')
    res.redirect('/schedule')
}

