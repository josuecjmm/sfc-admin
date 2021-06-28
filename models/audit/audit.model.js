const db = require('../../utils/database');
const auditQuery = require('../../data/queries/queries/audit.queries');

module.exports = class Audit {

    constructor(id, date, auditAction, entityType) {
        this.id = id;
        this.date = date;
        this.auditAction = auditAction;
        this.entityType = entityType;
    }

    static fetchAll() {
        return db.select(auditQuery.selectAuditList())
    }

    static fetchDateRange(initialDate, finalDate) {
        return db.select(auditQuery.selectRangeFilteredAuditList(), [initialDate, finalDate])
    }

    save() {
        return db.insertUpdate(auditQuery.insertAudit(), [this.auditAction, this.entityType])
    }
};
