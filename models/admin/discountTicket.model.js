const db = require('../../utils/database');
const discountTicketQuery = require('../../data/queries/admin/discountTickets.queries');

module.exports = class DiscountTicket {

    constructor(id, name , code, monthYear, total, discount) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.monthYear = monthYear;
        this.total = total;
        this.discount = discount;
    }
    static fetchAll() {
        return db.select(discountTicketQuery.selectList())
    }

    static fetchById(id) {
        return db.select(discountTicketQuery.selectById(),[id])
    }

    save() {
        return db.insertUpdate(discountTicketQuery.insert(),
            [this.name, this.code, this.monthYear, this.total, this.discount])
    }

    update() {
        return db.insertUpdate(discountTicketQuery.update(), [this.name, this.total, this.discount, this.id])
    }

    static deleteById(id) {
        return db.insertUpdate(discountTicketQuery.delete(), [id])
    }
};
