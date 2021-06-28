exports.insert = () => {
    return `INSERT INTO Discount_Tickets
    (name, code  , month_year, total, discount)
    VALUES (?, ?, ?, ?, ?)
    `
};

exports.selectList = () => {
    return `Select id, code, CONCAT (name, " ", month_year) "Nombre", total from Discount_Tickets`
};

exports.selectById = () => {
    return `Select id, name , code, month_year, total, discount from Discount_Tickets
    WHERE id = ?`
};

exports.update = () => {
    return `UPDATE Discount_Tickets 
    SET name = ?, total = ?, discount = ?
    WHERE id = ?
    `
};

exports.delete = () => {
    return `DELETE FROM Discount_Tickets 
    WHERE id = ?
    `
};
