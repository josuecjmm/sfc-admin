const {totalAppointmentsPossible} = require('../../../constants/schedule')

exports.insert = (values) => {
    return `INSERT INTO DaySchedule
                (day, hour, total)
            VALUES ${values}
    `
};

exports.selectAll = () => {
    return `SELECT id, day, hour, total
            FROM DaySchedule
            ORDER BY CASE
                WHEN day = 'Monday' THEN 1
                WHEN day = 'Tuesday' THEN 2
                WHEN day = 'Wednesday' THEN 3
                WHEN day = 'Thursday' THEN 4
                WHEN day = 'Friday' THEN 5
                WHEN day = 'Saturday' THEN 6
    END
    ASC
    `
}

exports.select = () => {
    return `SELECT id, day, hour, total
            FROM DaySchedule
            WHERE day = ?
            ORDER BY CASE
                WHEN hour LIKE '%AM' THEN 1
                WHEN hour LIKE '%PM' THEN 2
    END
    ASC
;
    `
}

exports.selectSingle = () => {
    return `
        SELECT id, day, hour, total
        FROM DaySchedule
        WHERE id = ?
    `
}

exports.updateTotal = () => {
    return `
        UPDATE DaySchedule
        set total = ?
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

exports.updateReduceTotal = () => {
    return `
        UPDATE DaySchedule
        set total = total - 1
        WHERE id = ?
    `
}

exports.updateAddTotal = () => {
    return `
        UPDATE DaySchedule
        set total = total + 1
        WHERE id = ?
    `
}

exports.delete = () => {
    return `DELETE
            FROM DaySchedule
            WHERE id IS NOT NULL
    `
}

exports.deleteSingle = () => {
    return `DELETE
            FROM DaySchedule
            WHERE id = ?`
}
