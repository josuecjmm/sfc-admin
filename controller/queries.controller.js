const faker = require('faker');
const html = require('../constants/html/index');

const Audit = require('../models/audit/audit.model');
const Error = require('../models/audit/error.model');
const FoodType = require('../models/admin/foodLine.model');
const Product = require('../models/product.model');

const dateFormatter = require('../utils/date');

exports.getAudits = async (req, res, next) => {

        const {initialDate, finalDate} = req.query;
        const audits = initialDate && finalDate ?
            await Audit.fetchDateRange(initialDate, finalDate) :
            await Audit.fetchAll()
        ;

        const auditsDateParse = JSON.parse(audits).map(audit =>  {
            return {
                id: audit.id,
                date: dateFormatter.splitUTCFormat(audit.date),
                audit_action: audit.audit_action
            }
        });

        res.render('queries/audits',
            {
                audits: auditsDateParse,
                pageTitle: 'Bitacora',
                html: html
            })

};

// Orders
const orderStatus = ['Procesado', 'Cancelado', 'En Curso'];
const orders = [
    {
        id: 1,
        date: faker.date.recent(),
        status: `${faker.random.arrayElement(orderStatus)}`
    },
    {
        id: 2,
        date: faker.date.recent(),
        status: `${faker.random.arrayElement(orderStatus)}`
    },
    {
        id: 3,
        date: faker.date.recent(),
        status: `${faker.random.arrayElement(orderStatus)}`
    },
    {
        id: 4,
        date: faker.date.recent(),
        status: `${faker.random.arrayElement(orderStatus)}`
    },

];

exports.getOrders = (req, res, next) => {
    res.render('queries/orders',
        {
            orders: orders,
            pageTitle: 'Ordenes',
            html: html
        })
};

exports.getProducts = async (req, res, next) => {

        const foodLines = await FoodType.fetchAll();
        const {foodType} = req.query;
        const products = foodType ?
            await Product.fetchAllWithReferencesById(parseInt(foodType)) :
            await Product.fetchAllWithReferences()
        ;

        let priceTypes = await Product.fetchAllPriceTypes();
        priceTypes = JSON.parse(priceTypes);
        res.render('queries/products',
            {
                products: JSON.parse(products),
                foodLines: JSON.parse(foodLines),
                priceTypes: priceTypes,
                pageTitle: 'Productos',
                html: html
            })


};

exports.getErrors = async (req, res, next) => {

        const {initialDate, finalDate} = req.query;
        const errors = initialDate && finalDate ?
            await Error.fetchDateRange(initialDate, finalDate) :
            await Error.fetchAll()
        ;

        const parsedErrors = JSON.parse(errors).map(error => {
            return {
                id: error.id,
                date: dateFormatter.splitUTCFormat(error.date),
                message: error.error
            }
        });

        res.render('queries/errors',
            {
                errors: parsedErrors,
                pageTitle: 'Errores',
                html: html
            })

};

