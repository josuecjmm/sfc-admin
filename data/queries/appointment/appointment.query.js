exports.insert = () => {
    return `
        INSERT INTO Appointment
            (dayScheduleId, userId)
        VALUES (?, ?)
    `
}

exports.selectAll = () => {
    return `
        SELECT a.id,
               U.fullName,
               a.dayScheduleId,
               a.userId,
               DS.day,
               DS.hour
        FROM Appointment a
                 INNER JOIN User U
                            on a.userId = U.id
                 INNER JOIN DaySchedule DS on a.dayScheduleId = DS.id
        ORDER BY CASE
                     WHEN Day = 'Monday' THEN 1
          WHEN Day = 'Tuesday' THEN 2
          WHEN Day = 'Wednesday' THEN 3
          WHEN Day = 'Thursday' THEN 4
          WHEN Day = 'Friday' THEN 5
          WHEN Day = 'Saturday' THEN 6
        END
        ASC
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


exports.selectUserAppointments = () => {
    return `
        SELECT a.id,
               U.fullName,
               a.dayScheduleId,
               a.userId,
               DS.day,
               DS.hour
        FROM Appointment a
                 INNER JOIN User U
                            on a.userId = U.id
                 INNER JOIN DaySchedule DS on a.dayScheduleId = DS.id
        WHERE a.userId = ?
    `
}

exports.selectUsersRelatedToAppointment = () => {
    return `SELECT U.personalId, U.fullName, DS.hour
            FROM Appointment a
                     INNER JOIN
                 DaySchedule DS on a.dayScheduleId = DS.id
                     INNER JOIN
                 User U on a.userId = U.id
            WHERE dayScheduleId = ?
    `
}

exports.deleteAppointmentsRelatedToScheduleId = () => {
    return `
        DELETE
        FROM Appointment
        WHERE dayScheduleId = ?
    `
}

exports.deleteAll = () => {
    return `
        DELETE
        FROM Appointment
    `
}