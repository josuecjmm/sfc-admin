exports.selectPriceType = () => {
    return `Select id, name from Price_Type`
};

exports.selectPriceTypeById = () => {
    return `Select id, name from Price_Type
    WHERE id = ?`
};

exports.insertPriceTypes = () => {
    return `INSERT INTO Price_Type 
    (name)
    VALUES (?)
    `
};

exports.updatePriceType = () => {
    return `UPDATE Price_Type 
    SET name = ?
    WHERE id = ?
    `
};

exports.selectPriceTypeWithConstrains = () => {
    return `SELECT pt.id FROM Price_Type pt  
    INNER JOIN 
    Product_Prices pp
    ON pt.id = pp.price_type_id  
    `
};

exports.deletePriceType = () => {
    return `DELETE FROM Price_Type 
    WHERE id = ?
    `
};


