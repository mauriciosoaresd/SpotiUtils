const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const indexRouter = require('./routes/index')


require('dotenv').config();
require('./config/database')
require('./config/passport')

const app = express();

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        uri: process.env.DATABASE_URL,
        collection: 'usersSessions'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname,'build','favicon.ico')));
app.use(express.static(path.join(__dirname,'build')));

// Routes
app.use('/', indexRouter);
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})