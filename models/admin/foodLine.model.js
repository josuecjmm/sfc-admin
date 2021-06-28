const db = require('../../utils/database');
const foodLineQuery = require('../../data/queries/admin/foodLine.queries')

module.exports = class Product {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fetchAll() {
        return db.select(foodLineQuery.selectFoodLines())
    }

    static fetchWithConstraints() {
        return db.select(foodLineQuery.selectFoodLinesWithConstrains())
    }

    static fetchById(id) {
        return db.select(foodLineQuery.selectFoodLineById(), [id])
    }

    static deleteById(id) {
        return db.insertUpdate(foodLineQuery.deleteFoodLine(), [id])
    }

    save() {
        return db.insertUpdate(foodLineQuery.insertFoodLines(), [this.name])
    }

    update() {
        return db.insertUpdate(foodLineQuery.updateFoodLine(), [this.name, this.id])
    }
};
