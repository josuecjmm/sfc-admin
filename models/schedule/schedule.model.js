const db = require('../../utils/database');
const scheduleQuery = require('../../data/queries/schedule/schedule.query')


module.exports = class Schedule {
    constructor(id, hour, total) {
        this.id = id;
        this.hour = hour;
        this.total = total;
    }

    save(day) {
        return db.insertUpdate(
            scheduleQuery.insert(day),
            [this.hour, this.total]
        );
    }

    static deleteDay(day) {
        return db.insertUpdate(
            scheduleQuery.delete(day), []
        )
    }
}