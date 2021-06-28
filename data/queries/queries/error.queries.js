exports.selectErrorList = () => {
    return `Select id, date, error from Error`
};

exports.selectRangeFilteredErrorList = () => {
    return `SELECT id, date, error From Error
    WHERE date >= ? and date <= ?;`
};

exports.insertError = () => {
    return `INSERT INTO Error
            (date, error)
            VALUES (?,?)
    `
};
