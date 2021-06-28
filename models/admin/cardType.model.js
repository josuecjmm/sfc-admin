const db = require('../../utils/database');
const cardTypeQuery = require('../../data/queries/admin/cardType.queries');

module.exports = class PriceType {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fetchAll() {
        return db.select(cardTypeQuery.selectList())
    }

    static fetchWithConstraints() {
        return db.select(cardTypeQuery.selectConstraints())
    }

    static fetchById(id) {
        return db.select(cardTypeQuery.selectById(),[id])
    }

    save() {
        return db.insertUpdate(cardTypeQuery.insert(), [this.name])
    }

    update() {
        return db.insertUpdate(cardTypeQuery.update(), [this.name, this.id])
    }

    static deleteById(id) {
        return db.insertUpdate(cardTypeQuery.delete(), [id])
    }
};
