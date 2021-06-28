exports.insert = (day) => {
    return     `INSERT INTO ${day}
         (hour, total )
     VALUES (?, ?)
    `
};

exports.select = (day) => {
    return `SELECT 
    id, hour, total
    FROM ${day}`
}

exports.delete = (day) => {
    return `DELETE FROM ${day}`
}
