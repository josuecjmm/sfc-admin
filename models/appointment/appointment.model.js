const db = require('../../utils/database');
const appointmentQuery = require('../../data/queries/appointment/appointment.query')


module.exports = class Appointment {
    constructor(id, dayScheduleId, userId) {
        this.id = id;
        this.dayScheduleId = dayScheduleId;
        this.userId = userId;
    }

    save() {
        return db.insertUpdate(
            appointmentQuery.insert(),
            [this.dayScheduleId, this.userId]
        );
    }

    static selectAll() {
        return db.select(
            appointmentQuery.selectAll(), []
        )
    }

    static getDay(day) {
        return db.select(
            appointmentQuery.selectDay(), [day]
        )
    }

    static getUserAppointments(userId) {
        return db.select(
            appointmentQuery.selectUserAppointments(), [userId]
        )
    }

    static getUsersRelatedToAppointment(scheduleId) {
        return db.select(
            appointmentQuery.selectUsersRelatedToAppointment(), [scheduleId]
        )
    }

    static deleteAppointmentRelatedToSchedule(scheduleId) {
        return db.insertUpdate(
            appointmentQuery.deleteAppointmentsRelatedToScheduleId(), [scheduleId]
        )
    }

    static deleteAll() {
        return db.insertUpdate(
            appointmentQuery.deleteAll(), []
        )
    }
}