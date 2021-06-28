const date = require('../../utils/date');
const faker = require('faker');
const html = require('../../constants/html/index');
const DiscountTicket = require('../../models/admin/discountTicket.model');

exports.postEditDiscountTicket = async (req, res, next) => {
    const discountTicket = new DiscountTicket(
        null,
        req.body.name,
        `${faker.lorem.word()}${faker.random.number()}`,
        date.getMonthYear(),
        parseInt(req.body.total),
        parseInt(req.body.discount),
    );
    await discountTicket.save();
    res.redirect('/discountTickets')
};

exports.getDiscountTickets = async (req, res, next) => {
    const discountTickets = await DiscountTicket.fetchAll();

    res.render('admin/discountTickets/discountTickets',
        {
            discountTickets: JSON.parse(discountTickets),
            pageTitle: 'Cupones',
            html: html
        })
};

exports.getAddEditDiscountTickets = async (req, res, next) => {
    const {discountTicketId} = req.params;
    let discountTicket = [];
    if (discountTicketId !== 'new') {
        discountTicket = await DiscountTicket.fetchById(parseInt(discountTicketId));
        discountTicket = JSON.parse(discountTicket);
    }
    res.render('admin/discountTickets/addEditDiscountTicket',
        {
            pageTitle: 'Editar Cupones',
            discountTicket: discountTicket,
            html: html
        })
};

exports.putDiscountTicket = async (req, res, next) => {
    const {id, name, code, month_year, total, discount} = req.body;
    const cardType = new DiscountTicket(
        parseInt(id),
        name,
        code,
        month_year,
        parseInt(total),
        parseInt(discount)
    );
    await cardType.update();
    res.redirect('/discountTickets');
};

exports.deleteDiscountTicket = async (req, res, next) => {
    const {discountTicketId} = req.body;
    await DiscountTicket.deleteById(parseInt(discountTicketId));
    res.redirect('/discountTickets');
};
