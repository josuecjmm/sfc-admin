const Consecutive = require('../../models/admin/consecutive.model');
const html = require('../../constants/html/index');

exports.getConsecutives = async (req, res, next) => {
    const consecutives = await Consecutive.fetchAll();
    const keys = Object.keys(JSON.parse(consecutives)[0]);
    const counts = Object.values(JSON.parse(consecutives)[0]);
    res.render('admin/consecutives/consecutives',
        {
            consecutives: keys,
            counts: counts,
            pageTitle: 'Consecutivos',
            html: html
        })
};

exports.getEditConsecutive = async (req, res, next) => {
    const {consecutiveId} = req.params;
    const consecutive = await Consecutive.fetchById(parseInt(consecutiveId));
    res.render('admin/consecutives/editConsecutive', {
        consecutive: JSON.parse(consecutive),
        edit: true,
        pageTitle: 'Editar Consecutivo',
        html: html
    });
};

exports.putConsecutive = async (req, res, next) => {
    const {id, prefix} = req.body;
    const consecutive = new Consecutive(parseInt(id), prefix);
    await consecutive.update();
    res.redirect('/consecutives');
};
