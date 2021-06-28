exports.selectAuditList = () => {
    return `Select id, date, audit_action from Audits`
};

exports.selectRangeFilteredAuditList = () => {
    return `SELECT id, date, audit_action From Audits
    WHERE date >= ? and date <= ?`
};

exports.insertAudit = () => {
    return `INSERT INTO Audits 
    (date, audit_action, entity_type)
    VALUES (?, ?, ?)
    `
};
