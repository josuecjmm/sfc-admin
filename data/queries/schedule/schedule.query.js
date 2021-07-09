const {totalAppointmentsPossible} = require('../../../constants/schedule')

exports.insert = (values) => {
    return `INSERT INTO DaySchedule
                (day, hour, total)
            VALUES ${values}
    `
};

exports.select = () => {
    return `SELECT id, day, hour, total
            FROM DaySchedule
            WHERE day = ?
    `
}

exports.selectSingle = () => {
    return `
        SELECT id, total
        FROM DaySchedule
        WHERE id = ?
    `
}

exports.update = () => {
    return `
        UPDATE DaySchedule
        set total = total - 1
        WHERE id = ?
    `
}

exports.updateRefillSchedules = () => {
    return `
    UPDATE DaySchedule 
    set total = ${totalAppointmentsPossible}
    WHERE id IS NOT NULL
    `
}

exports.delete = () => {
    return `DELETE
            FROM DaySchedule`
}
