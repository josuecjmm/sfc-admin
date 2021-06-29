exports.insert = () => {
    return `INSERT INTO DaySchedule
                (day, hour, total)
            VALUES (?, ?, ?)
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


exports.delete = () => {
    return `DELETE
            FROM DaySchedule`
}
