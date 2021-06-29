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

    static getDay(day) {
        return db.select(
            appointmentQuery.selectDay(), [day]
        )
    }

    static deleteAll() {
        return db.insertUpdate(
            appointmentQuery.deleteAll(), []
        )
    }
}