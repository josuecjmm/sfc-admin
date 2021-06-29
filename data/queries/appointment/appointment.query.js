exports.insert = () => {
    return `
        INSERT INTO Appointment
            (dayScheduleId, userId)
        VALUES (?, ?)
    `
}

exports.selectDay = () => {
    return `
        SELECT U.personalId, U.fullName, DS.hour
        FROM Appointment a
                 INNER JOIN
             DaySchedule DS on a.dayScheduleId = DS.id
                 INNER JOIN
             User U on a.userId = U.id
        WHERE day = ?
        ;
    `
}

exports.deleteAll = () => {
    return `
        DELETE FROM Appointment
    `
}