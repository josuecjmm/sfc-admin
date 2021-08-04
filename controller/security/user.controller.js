const User = require('../../models/user.model');
const html = require('../../constants/html/index');
const date = require('../../utils/date')
const validation = require('../../utils/formValidations');
const mailer = require('../../utils/mailer');
const crypto = require('../../utils/crypto')

exports.getRegister = (req, res, next) => {
    res.render('register', {
        html: null,
        errors: req.flash('error'),
        pageTitle: 'Register'
    })
}

exports.register = async (req, res, next) => {
    const errors = validation.errors(req);
    if (errors.length > 0) {
        req.flash('error', errors)
        return res.redirect('/register')
    } else {
        try {
            const {personalId, password, fullName} = req.body;
            const user = new User(
                null,
                personalId,
                crypto.encrypt(password),
                fullName
            );
            await user.save();
        } catch (e) {
            req.flash('error', e.message)
            const error = new Error(e);
            next(error)
        }
        return res.redirect('/login')
    }
}

exports.login = async (req, res, next) => {
    const {personalId, password} = req.body;

    let users = await User.fetchByPersonalId(personalId);
    users = JSON.parse(users);

    if (users.length === 0) {
        req.flash('error', 'Usuario o Contraseña invalido')
        res.redirect('/login')
    } else {

        const currentUser = users[0];
        const userPassword = crypto.decrypt(currentUser.password);

        if (userPassword === password && currentUser.isAdmin === "1") {
            req.session.isLoggedIn = true;
            req.session.isAdmin = true;
            res.redirect('/home')
        } else {
            req.flash('error', 'Usuario o Contraseña invalido')
            res.redirect('/login')
        }
    }
};

exports.getResetPassword = async (req, res, next) => {
    res.render('resetPassword', {
        html: null,
        errors: req.flash('error'),
        pageTitle: 'Reset Password'
    })
}

exports.getNewPassword = async (req, res, next) => {
    const {token} = req.params;
    let user = await User.fetchByToken(token);
    user = JSON.parse(user);
    if (user.length === 0) {
        req.flash('error', 'Link invalido')
        res.redirect('/resetPassword')
    } else {
        res.render(res.render('newPassword', {
            html: null,
            errors: req.flash('error'),
            pageTitle: 'New Password',
            userId: user[0].id,
            passwordToken: token
        }))
    }
}

exports.postResetPassword = async (req, res, next) => {
    const {email} = req.body;
    let user = await User.fetchByEmail(email);
    user = JSON.parse(user)
    if (user.length === 0) {
        req.flash('error', 'Email no existe')
        res.redirect('/resetPassword')
    } else {
        const userToken = await crypto.createToken();
        await User.updateResetToken(
            userToken,
            date.getInOneHour(),
            user[0].id
        )
        await mailer.sendResetPassword(email, userToken);
    }
}

exports.postNewPassword = async (req, res, next) => {
    const {password, token, id} = req.body;
    let userToken = await User.fetchByToken(token);
    userToken = JSON.parse(userToken);
    if (userToken.length === 0) {
        req.flash('error', 'Token invalido')
        res.redirect('/resetPassword')
    } else {
        await User.updatePassword(
            crypto.encrypt(password),
            userToken[0].reset_token,
            id
        )
        res.redirect('/login');
    }
}

exports.logout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/home')
    })
};

exports.postAddUser = async (req, res, next) => {

    const errors = validation.errors(req);

    if (errors.length > 0) {
        req.flash('error', errors)
        res.redirect('/user/new')
    } else {
        const {personalId, password, fullName} = req.body;

        const user = new User(
            null,
            personalId,
            crypto.encrypt(password),
            fullName,
        );

        await user.save();
        res.redirect('/user')
    }
};

exports.getUsers = async (req, res, next) => {
    const users = await User.fetchAll();
    res.render('security/user', {users: JSON.parse(users), pageTitle: 'Users', html: html})
};

exports.getAddEditUser = async (req, res, next) => {
    const {userId} = req.params;
    let user = [];
    if (userId !== 'new') {
        user = await User.fetchById(parseInt(userId));
        user = JSON.parse(user);
        user[0].password = crypto.decrypt(user[0].password)
    }
    res.render('security/addUser', {
        pageTitle: 'New User',
        errors: req.flash('error'),
        user: user,
        html: html
    })
};

exports.putUser = async (req, res, next) => {
    const {id, personalId, fullName, password} = req.body;

    const errors = validation.errors(req);
    if (errors.length > 0) {
        req.flash('error', errors)
        res.redirect(`/user/${id}`)
    } else {
        try {
            const user = new User(
                parseInt(id), personalId,
                crypto.encrypt(password),
                fullName
            );
            await user.update();
            return res.redirect('/user');

        } catch (e) {
            req.flash('error', e.message)
            const error = new Error(e);
            next(error)
        }
    }

};

