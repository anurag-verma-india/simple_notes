import express from 'express'
import cors from 'cors'
import { getUserById, getUsers, checkPassword, getUserByEmail, patchUser } from './database.js'
import session from 'express-session'
import path from 'node:path'
const port = 7000
const frontend_folder = 'public'
const store = new session.MemoryStore(); // Session module has a class MemoryStore 

const app = express()

const corsOptions = {
    credentials: true,
    AccessControlAllowOrigin: true,
    origin: ['http://localhost:5173', 'https://simple-notes-ochre.vercel.app', 'https://simple-notes-frontend-dlure16bg-anurag-verma-indias-projects.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionSuccessStatus: 200 // For legacy browser (IE11, Smart TVs)
}
// Session middlewares
app.use(express.static(frontend_folder))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    next()
})
app.use(session({
    secret: process.env.secret,

    cookie: { maxAge: 1000 * 365 * 24 * 60 * 60 * 1000 }, // 1000 years (in milliseconds)
    saveUninitialized: false, // True: new session id for every request (put false if you have login system)
    resave: false, // https://github.com/expressjs/session#options // read this for details (date accessed: 26 Nov 2024)
    store: store
}))



// app.use(async (req, res, next) => {
//     if (req.session.authenticated) {
//         next()
//         const email = req.session.user.email
//         const user = await getUserByEmail(email);
//         let { id, username, fname, lname, phone } = user
//         req.session.user = { id, username, email, fname, lname, phone } // never send password to the user in production
//         res.json(req.session);
//     }
// })


// app.use(bodyParser.urlencoded({extended: false}))

// create a handle to manage user sesstions or use express session manager module

// app.use('/', (req, res) => {
//     res.send("<h1>This is some simple text</h1>")
// })

// app.get('/users', async (req, res) => {
//     const users = await getUsers()
//     // res.send("This should be the users")
//     res.send(users)
// })

// app.get('/user/:email', async (req, res) => {
//     const email = req.params.email
//     const user = await getUser(email)
//     res.send(user)
// })

// app.get('/userbyid/:id', async (req, res) => {
//     const id = req.params.id
//     const user = await getUserById(id)
//     res.send(user)
// })

// app.post('/checkpassword', async (req, res) => {
//     const { email, password } = req.body
//     const password_status = await checkPassword(email, password)
//     console.log(req.body)
//     // console.log(password_status)

//     switch (password_status) {
//         case 0:
//             // Invalid email
//             res.status(401).send({ "type": 0, "message": "Email does not exist in database" })
//             // res.send({ "type": 0, "message": "Email does not exist in database" })

//             // res.send("Invalid email")
//             // res.end()
//             break;
//         case 1:
//             // Invalid password
//             res.status(401).send({ "type": 1, "message": "Password is incorrect" })
//             // res.send({ "type": 1, "message": "Password is incorrect" })

//             break;
//         case 2:
//             // res.sendStatus(200)
//             res.status(200).send({ "type": 2, "message": "Correct password" })
//             // res.status(200).send({ "type": 2, "message": "Correct pasword" })

//             // Valid email and correct password
//             break;
//     }
// })





//- 
app.post('/login', async (req, res) => {
    console.log(req.sessionID)
    // console.log("req.body\n", req.body)

    const { email, password } = req.body;
    // console.log(email, password)
    if (email && password) {
        // email and password exist
        if (req.session.authenticated) {
            // User has already logged in
            res.json(req.session)
        } else {
            // User has not logged in
            // Checking password 
            const password_status = await checkPassword(email, password)

            switch (password_status) {
                case -1:
                    res.status(401).send({ "type": -1, "message": "User is inactive, contact administrator" })
                    break;
                case 0:
                    // Invalid email
                    res.status(401).send({ "type": 0, "message": "Email does not exist in database" })
                    break;
                case 1:
                    // Invalid password
                    res.status(401).send({ "type": 1, "message": "Password is incorrect" })
                    break;
                case 2:
                    // Valid email and correct password
                    // Save username to the cookies too
                    // console.log(user)
                    // req.session.email = user.email;
                    const user = await getUserByEmail(email);
                    req.session.authenticated = true;
                    let { id, username, fname, lname, phone } = user
                    req.session.user = { id, username, email, fname, lname, phone } // never send password to the user in production
                    res.json(req.session);
                    // res.status(200).send({ "type": 2, "message": "Correct password" })
                    break;
            }
            // if (email === users[0].email && password === users[0].password) {
            //     // Passwords matched
            //     req.session.authenticated = true;
            //     req.session.user = { email, password } // never send password to the user in production
            //     res.json(req.session);
            //     // res.send(req.session)
            // } else {
            //     // Passwords don't match 
            //     res.status(403).json({ msg: 'Email or passwords don\'t match' });
            // }
        }
    } else {
        res.status(403).json({ msg: 'Email and password fields not present in request' });
    }
})
// -

app.post('/getSessionDetails', (req, res) => {
    // console.log(req.body.email)
    // console.log("session: \n", req.sessionID, "\n")
    console.log(req.session)
    // getUserByEmail()
    // res.sendStatus(200)
    if (req.session.authenticated) {
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send({ type: 0, message: "User is not authenticated" })
    }
})


app.post('/patchUser', async (req, res) => {
    // Check if authenticated else send error response
    var patchInfo;
    if (req.session.authenticated) {
        const patchInfo = patchUser(req.body.changedValues, req.session.user.email)
        // console.log("req.body.changedValues: ", req.body.changedValues)
        res.status(200).send({ success: 1, info: patchInfo })
    } else
        res.status(401).send({ type: 0, message: "User is not authenticated" })
})

// All the unknown requests are redirected to the React SPA
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually/77231332#77231332
const __dirname = import.meta.dirname;
const frontend = path.join(__dirname, frontend_folder);
app.use(function (req, res, next) {
    res.sendFile(path.join(frontend, 'index.html'));
});

app.listen(port, () => {
    console.log("The server is running on port:", port);
})
