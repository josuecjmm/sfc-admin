exports.selectPaymentType = () => {
    return `Select id, name from Payment_Type`
};

exports.insertPaymentType = () => {
    return `INSERT INTO Payment_Type 
    (name)
    VALUES (?)
    `
};
