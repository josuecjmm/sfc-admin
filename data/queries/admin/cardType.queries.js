exports.insert = () => {
    return `INSERT INTO CardType 
    (name)
    VALUES (?)
    `
};

exports.selectList = () => {
    return `Select id, name from CardType`
};

exports.selectById = () => {
    return `Select id, name from CardType
    WHERE id = ?`
};

exports.selectConstraints = () => {
    return `Select ct.id FROM CardType ct 
    INNER JOIN 
    Payment_Processors pp 
    ON ct.id = pp.card_type_id 
`
};

exports.update = () => {
    return `UPDATE CardType 
    SET name = ?
    WHERE id = ?
    `
};

exports.delete = () => {
    return `DELETE FROM CardType 
    WHERE id = ?
    `
};



