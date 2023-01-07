const {totalAppointmentsPossible} = require('../../../constants/schedule')
const {selectAll} = require("../appointment/appointment.query");

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

exports.selectAll = () => {
    return `SELECT day, hour
            FROM DaySchedule
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
