const db = require('../utils/database');
const userQuery = require('../data/queries/security/users.query');


module.exports = class User {
    constructor(id, personalId, password, fullName) {
        this.id = id;
        this.personalId = personalId;
        this.password = password;
        this.fullName = fullName;
    }

    static fetchAll() {
        return db.select(userQuery.selectList());

    }

    static fetchById(id) {
        return db.select(userQuery.selectById(), [id])
    }

    static fetchByEmail(email) {
        return db.select(userQuery.selectListEmail(), [email])
    }

    static fetchByPersonalId(personalId) {
        return db.select(userQuery.selectListPersonalIds(), [personalId])
    }


    static fetchByToken(token) {
        return db.select(userQuery.selectToken(), [token])
    }

    update() {
        return db.insertUpdate(userQuery.update(), [this.personalId, this.password, this.fullName, this.id])
    }

    static updateResetToken(token, expiration, id) {
        return db.insertUpdate(userQuery.updateResetToken(), [token, expiration, id])
    }

    static updatePassword(password, token, id) {
        return db.insertUpdate(userQuery.updatePassword(), [password, token, id])
    }

    save() {
        return db.insertUpdate(
            userQuery.insert(),
            [this.personalId, this.password, this.fullName]
        );
    }


};
