const db = require('../utils/database');
const productQuery = require('../data/queries/admin/products.queries');

module.exports = class Product {

    constructor(id, name, price, fk_product_food_type_id, image_url  ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.fk_product_food_type_id = fk_product_food_type_id;
        this.image_url = image_url;

    }

   static fetchAll() {
       return db.select(productQuery.selectList())
   }

    static fetchAllWithReferences() {
        return db.select(productQuery.selectListWithReferences())
    }

    static fetchAllWithReferencesById(id) {
        return db.select(productQuery.selectListWithReferencesByFoodTypeId(),[id])
    }

    static fetchAllPriceTypes() {
        return db.select(productQuery.selectAllPricesTypes(),[])
    }

    static fetchAllPriceTypesByProductId(id) {
        return db.select(productQuery.selectPriceTypesForProduct(),[id])
    }

    static fetchById(id) {
        return db.select(productQuery.selectById(),[id])
    }

    static fetchLastId(id) {
        return db.select(productQuery.selectLastId(),)
    }

    static savePrices(productId, priceTypeId) {
        return db.insertUpdate(productQuery.insertProductPrices(),[productId,priceTypeId]);
    }

   save() {
       return db.insertUpdate(productQuery.insert(),
           [
               this.name, this.price, this.fk_product_food_type_id,
               this.image_url
           ])
   }

    update() {
        return db.insertUpdate(productQuery.update(), [
            this.name, this.price, this.fk_product_food_type_id,
            this.image_url, this.id
        ])
    }

    static deleteById(id) {
        return db.insertUpdate(productQuery.delete(), [id])
    }

    static deleteProductPrice(id) {
        return db.insertUpdate(productQuery.deleteProductPrices(), [id])
    }
};
