const bodyParser = require('body-parser');
require('dotenv').config();
const flash = require('connect-flash');
const express = require('express');
const session = require('express-session')
const Store = require('express-mysql-session')(session);
const path = require('path');

const queriesRoutes = require('./routes/queries.routes');
const consecutiveRoutes = require('./routes/consecutives.routes');
const userRoutes = require('./routes/user.routes');
const publicRoutes = require('./routes/public.routes');
const scheduleRoutes = require('./routes/schedule.routes');

const db = require('./config/database.config');

const html = require('./constants/html/index');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Parse json response
app.use(bodyParser.urlencoded({extended: false}));

// Session
const sessionStore = new Store(db.config)

app.use(session(
    {
        key: process.env.key,
        secret: process.env.secret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    }))

// Flash messages
app.use(flash())

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve other pages
app.use(consecutiveRoutes.routes);
app.use(userRoutes.routes);
app.use(queriesRoutes.routes);
app.use(publicRoutes.routes);
app.use(scheduleRoutes.routes);

// Fallback error
app.use( (error, req, res, next) => {
    res.redirect('/error')
});

// Serve start page
app.use( '/' ,(req, res, next) => {
    if(!req.session.isLoggedIn) {
        res.render('login',
            {
                pageTitle: 'Login',
                html: html,
                errors: req.flash('error'),
                user: []
            });
    } else {
        res.redirect('/home')
    }
});

app.listen(process.env.PORT||3000);
