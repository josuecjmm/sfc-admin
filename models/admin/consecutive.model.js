const db = require('../../utils/database');
const consecutivesQuery = require('../../data/queries/admin/consecutive.queries');

module.exports = class Consecutive {

    constructor(id, prefix) {
        this.id = id;
        this.prefix = prefix;
    }

    static fetchAll() {
        return db.select(consecutivesQuery.selectList())
    }

    static fetchById(id) {
        return db.select(consecutivesQuery.selectById(),[id])
    }

    update() {
        return db.insertUpdate(consecutivesQuery.update(), [this.prefix, this.id])
    }
};
