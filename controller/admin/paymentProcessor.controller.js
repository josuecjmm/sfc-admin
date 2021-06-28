const PaymentProcessor = require('../../models/admin/paymentProcessor.model');
const CardType = require('../../models/admin/cardType.model');
const html = require('../../constants/html/index');

exports.postPaymentProcessor = async (req, res, next) => {
    const active = req.body.active === 'true' ? 1 : 0;
    const verified = req.body.verified === 'true' ? 1 : 0;
    const paymentProcessor = new PaymentProcessor(
        null,
        req.body.processor,
        req.body.paymentName,
        req.body.method,
        parseInt(req.body.paymentType),
        parseInt(req.body.cardType),
        active,
        verified
    );
    paymentProcessor.save();
    res.redirect('/paymentProcessors')

};


exports.getPaymentProcessors = async (req, res, next) => {

        const paymentProcessors = await PaymentProcessor.fetchAll();
        res.render('admin/paymentProcessors/paymentProcessors',
            {
                paymentProcessors: JSON.parse(paymentProcessors),
                pageTitle: 'Procesadores de Pago',
                html: html
            })

};

exports.getAddEditPaymentProcessors = async (req, res, next) => {

        const paymentTypes = await PaymentProcessor.fetchAllPaymentTypes();
        const cardTypes = await CardType.fetchAll();

        const {processorId} = req.params;
        let paymentProcessor = [];
        if(processorId !== 'new') {
            paymentProcessor = await PaymentProcessor.fetchById(parseInt(processorId));
            paymentProcessor = JSON.parse(paymentProcessor);
        }
        res.render('admin/paymentProcessors/addEditPaymentProcessor',
            {
                paymentMethods: JSON.parse(paymentTypes),
                cardTypes: JSON.parse(cardTypes),
                paymentProcessor: paymentProcessor,
                pageTitle: 'Procesador de Pago',
                html: html
            })

};

exports.putPaymentProcessor = async (req, res, next) => {
    let {active, verified, paymentType, cardType} = req.body;
    active = active === 'true' ? 1 : 0;
    verified = verified === 'true' ? 1 : 0;
    paymentType = parseInt(paymentType);
    cardType = parseInt(cardType);

    const {id, processor, paymentName, method} = req.body;

    const paymentProcessor = new PaymentProcessor(
       parseInt(id),
       processor,
       paymentName,
       method,
       paymentType,
       cardType,
       active,
       verified
    );

    await paymentProcessor.update();

    res.redirect('/paymentProcessors');
};


exports.deletePaymentProcessor = async (req, res, next) => {
    const {paymentProcessorId} = req.body;
    await PaymentProcessor.deleteById(parseInt(paymentProcessorId));
    res.redirect('/paymentProcessors');
};
