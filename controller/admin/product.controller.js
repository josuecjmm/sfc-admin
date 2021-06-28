const FoodLine = require('../../models/admin/foodLine.model');
const PriceType = require('../../models/admin/priceType.model');
const Product = require('../../models/product.model');
const html = require('../../constants/html/index');

exports.postProduct = async (req, res, next) => {
    const {name, price, foodLine, imageFile, priceType} = req.body;

    const product = new Product(
        null,
        name,
        parseInt(price),
        parseInt(foodLine),
        imageFile,
    );
    await product.save();

    // Render Product
    const products = await Product.fetchAll();
    res.render('admin/products/products',
        {
            products: JSON.parse(products),
            pageTitle: 'Productos',
            html: html,
            warning: true,
            product: name
        })

};

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('admin/products/products',
        {
            products: JSON.parse(products),
            pageTitle: 'Productos',
            html: html,
            warning: null
        })
};

exports.getAddEditProducts = async (req, res, next) => {
    const foodLines = await FoodLine.fetchAll();
    const priceTypes = await PriceType.fetchAll();

    const {productId} = req.params;
    let product = [];
    let priceTypesForProduct = [];
    if (productId !== 'new') {
        product = await Product.fetchById(parseInt(productId));
        product = JSON.parse(product);

        priceTypesForProduct = await Product.fetchAllPriceTypesByProductId(parseInt(productId));
        priceTypesForProduct = JSON.parse(priceTypesForProduct).map(id => id.priceTypeId);
    }

    res.render('admin/products/addEditProduct',
        {
            foodLines: JSON.parse(foodLines),
            priceTypes: JSON.parse(priceTypes),
            priceTypesForProduct: priceTypesForProduct,
            pageTitle: 'Linea Comida',
            product: product,
            html: html
        })
}


exports.putProduct = async (req, res, next) => {
    const {id, name, price, foodLine, imageFile, priceType} = req.body;
    const product = new Product(
        parseInt(id), name, parseInt(price), parseInt(foodLine),
        imageFile
    );
    await product.update();

    let warning = false;
    if (priceType) {
        // Add Price Types
        let priceTypesForProduct = await Product.fetchAllPriceTypesByProductId(parseInt(id));
        priceTypesForProduct = JSON.parse(priceTypesForProduct).map(id => id.id);

        await Promise.all(priceTypesForProduct.map(async id => {
            await Product.deleteProductPrice(parseInt(id))
        }));

        if (typeof priceType === "string") {
            await Product.savePrices(parseInt(id), parseInt(priceType));
        } else {
            const priceTypes = priceType.toString().split(',');

            await Promise.all(priceTypes.map(async priceTypeId => {
                await Product.savePrices(parseInt(id), parseInt(priceTypeId))
            }))

        }
    } else {
        warning = true
    }

    const products = await Product.fetchAll();
    res.render('admin/products/products',
        {
            products: JSON.parse(products),
            pageTitle: 'Productos',
            html: html,
            warning: warning,
            product: name
        })
};

exports.deleteProduct = async (req, res, next) => {
    const {productId} = req.body;

    let priceTypesForProduct = await Product.fetchAllPriceTypesByProductId(productId);
    priceTypesForProduct = JSON.parse(priceTypesForProduct).map(id => id.id);

    await Promise.all(priceTypesForProduct.map(async id => {
        await Product.deleteProductPrice(parseInt(id))
    }));

    await Product.deleteById(parseInt(productId));
    res.redirect('/products');
};
