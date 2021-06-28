const db = require('../../utils/database');
const priceQuery = require('../../data/queries/admin/priceType.queries');

module.exports = class PriceType {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fetchAll() {
        return db.select(priceQuery.selectPriceType())
    }

    static fetchWithConstraints() {
        return db.select(priceQuery.selectPriceTypeWithConstrains())
    }

    static fetchById(id) {
        return db.select(priceQuery.selectPriceTypeById(),[id])
    }

    save() {
        return db.insertUpdate(priceQuery.insertPriceTypes(), [this.name])
    }

    update() {
        return db.insertUpdate(priceQuery.updatePriceType(), [this.name, this.id])
    }

    static deleteById(id) {
        return db.insertUpdate(priceQuery.deletePriceType(), [id])
    }
   
};
