const FoodLine = require('../../models/admin/foodLine.model');
const html = require('../../constants/html/index');

exports.postFoodLine = async (req, res, next) => {
    const title = req.body.title;
    const foodLine = new FoodLine(null, title);
    await foodLine.save();
    res.redirect('/foodLines');
};

exports.getFoodLines = async (req, res, next) => {
    const foodLines = await FoodLine.fetchAll();
    const foodLinesWithConstrains = await FoodLine.fetchWithConstraints();
    res.render('admin/foodLines/foodLines',
        {
            foodLines: JSON.parse(foodLines),
            foodLinesWithConstrains: JSON.parse(foodLinesWithConstrains).map(item => item.id),
            pageTitle: 'Lineas Comida',
            html: html
        })
};

exports.getAddEditFoodLines = async (req, res, next) => {
    const foodLineId = req.params.foodLineId;
    let foodLine = [];
    if (foodLineId !== 'new') {
        foodLine = await FoodLine.fetchById(parseInt(foodLineId));
        foodLine = JSON.parse(foodLine);
    }
    res.render('admin/foodLines/addEditFoodLine',
        {
            foodLine: foodLine,
            pageTitle: 'Linea Comida',
            html: html
        })
};

exports.putFoodLine = async (req, res, next) => {
    const {id, title} = req.body;
    const foodLine = new FoodLine(parseInt(id), title);
    await foodLine.update();
    res.redirect('/foodLines');
};

exports.deleteFoodLine = async (req, res, next) => {
    const {foodLineId} = req.body;
    try {
        await FoodLine.deleteById(parseInt(foodLineId));
    } catch (e) {
        e;
    }
    res.redirect('/foodLines');
};
