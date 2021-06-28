exports.selectProcessType = () => {
    return `Select id, name from Process_Type`
};

exports.insertProcessType  = () => {
    return `INSERT INTO Process_Type  
    (name)
    VALUES (?)
    `
};

exports.selectList = () => {
    return `Select  
pp.id, processor_name, pt.name 'payment_type' , is_active, is_verified, method
from Payment_Processors pp 
INNER JOIN 
Payment_Type pt 
ON pp.payment_type_id = pt.id
;`
};

exports.selectById = () => {
    return `Select id, processor_name, payment_name ,
    method ,payment_type_id , card_type_id ,
    is_active , is_verified
    from Payment_Processors
    WHERE id = ?`
};

exports.insert  = () => {
    return `INSERT INTO Payment_Processors 
(processor_name , payment_name , method ,
payment_type_id , card_type_id ,
is_active , is_verified )
VALUES  (?, ?, ?, ?, ?, ?, ?);`
};

exports.update = () => {
    return `UPDATE Payment_Processors 
    SET 
    processor_name = ?,
    payment_name = ?,
    method = ?,
    payment_type_id = ?,
    card_type_id = ?,
    is_active = ?,
    is_verified = ?
    WHERE id = ?
    `
};

exports.delete = () => {
    return `DELETE FROM Payment_Processors 
    WHERE id = ?
    `
};

