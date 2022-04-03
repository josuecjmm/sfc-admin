const db = require('../../utils/database');
const scheduleQuery = require('../../data/queries/schedule/schedule.query')


module.exports = class Schedule {
    constructor(id, day, hour, total) {
        this.id = id;
        this.day = day;
        this.hour = hour;
        this.total = total;
    }

    static save(values) {
        return db.insertUpdate(
            scheduleQuery.insert(values),
            []
        );
    }

    static getDay(day) {
        return db.select(
            scheduleQuery.select(), [day]
        )
    }

    static selectSingle(id) {
        return db.select(
            scheduleQuery.selectSingle(), [id]
        )
    }

    static updateTotal(total, id) {
        return db.insertUpdate(
            scheduleQuery.updateTotal(), [total, id]
        )
    }

    static updateRefillSchedules() {
        return db.insertUpdate(
            scheduleQuery.updateRefillSchedules(), []
        )
    }

    static updateReduceTotal(id) {
        return db.insertUpdate(
            scheduleQuery.updateReduceTotal(), [id]
        )
    }

    static updateAddTotal(id) {
        return db.insertUpdate(
            scheduleQuery.updateAddTotal(), [id]
        )
    }

    static delete() {
        return db.insertUpdate(
            scheduleQuery.delete(), []
        )
    }

    static deleteSingle(id) {
        return db.insertUpdate(
            scheduleQuery.deleteSingle(), [id]
        )
    }
}