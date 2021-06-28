exports.insert = () => {
    return `INSERT INTO Product 
    (name, price, fk_product_food_type_id, image_url )
    VALUES (?, ?, ?, ?)
    `
};

exports.insertProductPrices = () => {
    return `INSERT INTO Product_Prices 
    (product_id , price_type_id )
    VALUES 
    (?,?)
    `
};

exports.selectList = () => {
    return `Select id, name, image_url from Product`
};

exports.selectListWithReferences = () => {
    return `SELECT p.id, p.name,
    ft.name 'foodType' 
    From 
    Product p
    INNER JOIN Food_Type ft
    ON p.fk_product_food_type_id = ft.id
`
};

exports.selectListWithReferencesByFoodTypeId = () => {
    return `SELECT p.id, p.name,
    ft.name 'foodType' 
    From 
    Product p
    INNER JOIN Food_Type ft
    ON p.fk_product_food_type_id = ft.id
    WHERE ft.id = ?
`
};

exports.selectAllPricesTypes = () => {
    return `SELECT p.id, pt.name
    From 
    Product p
    INNER JOIN Product_Prices pp
    ON p.id = pp.product_id 
    INNER JOIN Price_Type pt 
    ON pp.price_type_id = pt.id
`
};

exports.selectById = () => {
    return `Select 
    id, name, price, fk_product_food_type_id,
     image_url
    from Product
    WHERE id = ?`
};

exports.selectLastId = () => {
    return `SELECT id from Product p 
    ORDER BY id desc
    LIMIT 1`
};

exports.selectByPriceTypesById = () => {
    return `Select 
    id, name, price, fk_product_food_type_id,
     image_url
    from Product
    WHERE id = ?`
};

exports.selectPriceTypesForProduct= () => {
    return ` Select pp.id 'id', pt.id 'priceTypeId'  
    FROM 
    Product p 
    INNER JOIN 
    Product_Prices pp 
    ON p.id = pp.product_id 
    INNER JOIN 
    Price_Type pt 
    ON pp.price_type_id = pt.id
    WHERE p.id = ?
    `
};

exports.update = () => {
    return `UPDATE Product 
    SET name = ?,
    price = ?,
    fk_product_food_type_id = ?,
    image_url = ?    
    WHERE id = ?
    `
};

exports.delete = () => {
    return `DELETE FROM Product 
    WHERE id = ?
    `
};

exports.deleteProductPrices = () => {
    return `DELETE FROM Product_Prices 
    WHERE id = ?
    `
};
