const { check, validationResult} = require('express-validator');
const errorMessage = require('../constants/formValidations/security.constants');
const User = require('../models/user.model')

exports.createUser =  [
    check('fullName').notEmpty()
        .withMessage(errorMessage.user.name).trim(),

    check('personalId').custom(async (value, {req}) => {
       let user = await User.fetchByPersonalId(value);
       user = JSON.parse(user);
       if(user.length > 0) {
           throw new Error(errorMessage.user.personalIdExists)
       }
       return true;
    }),

    check('password').notEmpty()
        .withMessage(errorMessage.user.password)
        .trim(),
];

exports.errors = (req) => {
    const errors = validationResult(req);
    const parsedErrorMessage = errors.errors.map(error => {
        return `${error.msg}`
    });

    return [...new Set(parsedErrorMessage)];
};
