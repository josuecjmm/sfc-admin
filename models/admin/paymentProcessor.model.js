const db = require('../../utils/database');
const processorQuery = require('../../data/queries/admin/paymentProcessors.queries');
const paymentTypeQuery = require('../../data/queries/admin/paymentType.queries');

module.exports = class PriceType {

    constructor(
        id, processorName, paymentName,
        method, paymentTypeId, cardTypeId,
        isActive, isVerified
    ) {
        this.id = id;
        this.processorName = processorName;
        this.paymentName = paymentName;
        this.method = method;
        this.paymentTypeId = paymentTypeId;
        this.cardTypeId = cardTypeId;
        this.isActive = isActive;
        this.isVerified = isVerified;
    }

    static fetchAll() {
        return db.select(processorQuery.selectList())
    }

    static fetchById(id) {
        return db.select(processorQuery.selectById(),[id])
    }

    static fetchAllPaymentTypes() {
        return db.select(paymentTypeQuery.selectPaymentType())
    }


    save() {
        return db.insertUpdate(processorQuery.insert(),
            [this.processorName, this.paymentName, this.method,
                    this.paymentTypeId, this.cardTypeId, this.isActive,
                    this.isVerified
            ])
    }

    update() {
        return db.insertUpdate(processorQuery.update(),
            [this.processorName, this.paymentName, this.method,
                    this.paymentTypeId, this.cardTypeId, this.isActive,
                    this.isVerified, this.id
            ])
    }

    static deleteById(id) {
        return db.insertUpdate(processorQuery.delete(),  [id])
    }
};
