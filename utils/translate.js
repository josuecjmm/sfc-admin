const config = require('../config/translate.config');
const translator = require('translate');

translator.engine = config.engine;
translator.key = config.key;

translator.from = 'es';

/*
* Example to use it:
* async function print() {
    const translated = await translateText('Bienvenido', languages.english);
    console.log(translated);
}
* */
exports.translate = async (text, language) => {
    const translated = await translator(text, language);
    return translated
};

exports.from =  (language) => {
    translator.from = language;
};

