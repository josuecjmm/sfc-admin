exports.selectFoodLines = () => {
    return `Select id, name from Food_Type`
};

exports.selectFoodLineById = () => {
    return `Select id,name from Food_Type
            WHERE id = ?`
};

exports.insertFoodLines = () => {
    return `INSERT INTO Food_Type 
    (name)
    VALUES (?)
    `
};

exports.updateFoodLine = () => {
    return `UPDATE Food_Type 
    SET name = ?
    WHERE id = ?
    `
};

exports.selectFoodLinesWithConstrains = () => {
    return `SELECT ft.id FROM Food_Type ft 
    INNER JOIN 
    Product p 
    ON ft.id = p.fk_product_food_type_id 
    `
};

exports.deleteFoodLine = () => {
    return `DELETE FROM Food_Type 
    WHERE id = ?
    `
};
