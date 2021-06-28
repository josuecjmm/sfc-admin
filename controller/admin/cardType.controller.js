const CardType = require('../../models/admin/cardType.model');
const html = require('../../constants/html/index');

exports.postCardType = async (req, res, next) => {
    const cardType = new CardType(
        null,
        req.body.name,
    );
    cardType.save();
    res.redirect('/cardTypes')

};

exports.getCardTypes = async (req, res, next) => {
    const cardTypes = await CardType.fetchAll();
    const constraints = await CardType.fetchWithConstraints();
    res.render('admin/cardTypes/cardTypes',
        {
            cardTypes: JSON.parse(cardTypes),
            constraints: JSON.parse(constraints).map(item => item.id),
            pageTitle: 'Tipos de Tarjetas',
            html: html
        })
};

exports.getAddEditCardType = async (req, res, next) => {

    const {cardTypeId} = req.params;
    let cardType = [];
    if (cardTypeId !== 'new') {
        cardType = await CardType.fetchById(parseInt(cardTypeId));
        cardType = JSON.parse(cardType);
    }
    res.render('admin/cardTypes/addEditCardType',
        {
            pageTitle: 'Tipos de Tarjetas',
            cardType: cardType,
            html: html
        })


};

exports.putCardType = async (req, res, next) => {
    const {id, name} = req.body;
    const cardType = new CardType(parseInt(id), name);
    await cardType.update();
    res.redirect('/cardTypes');
};

exports.deleteCardType = async (req, res, next) => {
    const {cardTypeId} = req.body;
    await CardType.deleteById(parseInt(cardTypeId));
    res.redirect('/cardTypes');
};

