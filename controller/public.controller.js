const html = require('../constants/html/index');
const translateHtml = require('../utils/htmlTranslate');
const translate = require('../utils/translate');

exports.getHome = (req, res, next) => {
    res.render('index', {pageTitle: 'Inicio', html: html})
};

exports.getError = (req, res, next) => {
    res.render('error', {
        pageTitle: 'Error',
        html: html,
        error: req.flash('error')
    })
};

exports.translate = async (req, res, next) => {
    const {language} = req.query;
    html.reload = await translate.translate(html.reload, language);
    await translateHtml.translateHtml(language);
    res.render('reload', {message: html.reload, pageTitle: 'Reload', html: html})
};
