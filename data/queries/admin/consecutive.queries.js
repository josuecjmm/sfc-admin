exports.selectPrefix = () => {
    return `SELECT prefix 
FROM Consecutive  
WHERE entity_type = ?
`
};

exports.selectLastId = (entity) => {
    return `SELECT id FROM 
    ${entity} ft 
    ORDER by id DESC 
    LIMIT 1
    `
};

exports.selectList = () => {
    return `SELECT 
    COUNT(pt.id) 'priceType',
    COUNT(ct.id) 'cardType',
    COUNT(pp.id) 'paymentProcessor',
    COUNT(dt.id) 'discountTicket',
    COUNT(ft.id) 'foodType',
    COUNT(p.id) 'product'
    FROM Consecutive c 
    LEFT JOIN Price_Type pt
    ON c.prefix = pt.prefix 
    LEFT JOIN CardType ct
    ON c.prefix = ct.prefix 
    LEFT JOIN Payment_Processors pp
    ON c.prefix = pp.prefix
    LEFT JOIN Discount_Tickets dt
    ON c.prefix = dt.prefix
    LEFT JOIN Food_Type ft
    ON c.prefix = ft.prefix
    LEFT JOIN Product p
    ON c.prefix = p.prefix
    `
};

exports.selectById = () => {
    return `Select id, prefix, entity_type from Consecutive
    WHERE id = ?`
};

exports.updateConsecutivePrefix = (entity) => {
    return `UPDATE ${entity} 
    SET prefix = ?
    WHERE id = ?
    `
};

exports.update = () => {
    return `UPDATE Consecutive 
    SET prefix = ?
    WHERE id = ?
    `
};
