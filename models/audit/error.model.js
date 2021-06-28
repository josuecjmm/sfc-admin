const db = require('../../utils/database');
const errorQuery = require('../../data/queries/queries/error.queries');

module.exports = class Audit {

    constructor(id, date, error) {
        this.id = id;
        this.date = date;
        this.error = error;
    }

    static fetchAll() {
        return db.select(errorQuery.selectErrorList())
    }

    static fetchDateRange(initialDate, finalDate) {
        return db.select(errorQuery.selectRangeFilteredErrorList(), [initialDate, finalDate])
    }
};
