exports.insert = (day) => {
    return     `INSERT INTO ${day}
         (hour, total )
     VALUES (?, ?)
    `
};

exports.delete = (day) => {
    return `DELETE FROM ${day}`
}