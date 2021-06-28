const PriceType = require('../../models/admin/priceType.model');
const html = require('../../constants/html/index');

exports.postPriceType = async (req, res, next) => {
    const priceType = new PriceType(
        null,
        req.body.name,
    );
    priceType.save();
    res.redirect('/priceTypes')

};

exports.getPriceTypes = async (req, res, next) => {

        const priceTypes = await PriceType.fetchAll();
        const priceTypesWithConstraints = await PriceType.fetchWithConstraints();
        res.render('admin/priceTypes/priceTypes',
            {
                priceTypes: JSON.parse(priceTypes),
                priceTypesWithConstraints: JSON.parse(priceTypesWithConstraints).map(item => item.id),
                pageTitle: 'Tipos de Precios',
                html: html
            })

};

exports.getAddEditPriceTypes = async (req, res, next) => {

        const {priceTypeId} = req.params;
        let priceType = [];
        if(priceTypeId !== 'new') {
            priceType = await PriceType.fetchById(parseInt(priceTypeId));
            priceType = JSON.parse(priceType);
        }
        res.render('admin/priceTypes/addEditPriceType',
            {
                pageTitle: 'Tipos de Precios',
                priceType: priceType,
                html: html
            })

};

exports.putPriceType = async (req, res, next) => {
    const {id, name} = req.body;
    const priceType = new PriceType(parseInt(id), name);
    await priceType.update();
    res.redirect('/priceTypes');
};

exports.deletePriceType = async (req, res, next) => {
    const {priceTypeId} = req.body;
    await PriceType.deleteById(parseInt(priceTypeId));
    res.redirect('/priceTypes');
};
