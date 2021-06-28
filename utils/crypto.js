const cryptoJS = require("crypto-js");
const crypto = require("crypto");
const config = require('../config/crypto.config');

exports.encrypt = (text) => {
    return cryptoJS.AES.encrypt(text, config.secret).toString();
};

exports.decrypt = (text) => {
    const bytes  = cryptoJS.AES.decrypt(text, config.secret);
    return bytes.toString(cryptoJS.enc.Utf8);
};

exports.createToken = async () => {
    let token = await crypto.randomBytes(32)
    return token.toString('hex')
}
