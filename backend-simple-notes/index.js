const path = require('path')
const express = require('express')
const session = require('express-session')
const app = express()
const port = 6616

const cors = require('cors')

const db = require('./db-ops/db_handler')

app.use(express.urlencoded({ extended: true }))

var corsOptions = {
    origin: `http://localhost:${port}`,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(session(
    {
        // secret key for the session
        secret: process.env.secret,
        // Forces session to be saved back to the session store
        resave: true,
        // Forces saving of uninitialized sessions to be saved to the store
        saveUninitialized: true
    }
))


// view engine setup for server side rendered front - end views
app.set('views', path.join(__dirname, 'views')) // views directory
app.set('view engine', 'ejs')

// check login status (middleware)
checkLogin = (req, res, next) => {
    if (req.session.hasOwnProperty('loggedIn') && req.session.loggedIn == true) {
        next();
    }
    else {
        req.session.ogPath = req.path;
        res.redirect('/login');
    }
}

app.get('/', (req, res) => {
    // res.send("<h1>Finally writing the to do list app</h1><br>"+process.env.secret)
    res.render('welcome', { name: 'Anurag Verma' })
})

app.get('/usertypes', (req, res) => {
    db.getUserTypes(req, res)
    // db.consoleLog();
})

app.listen(port, () => {
    console.log("App listening on port", port)
})