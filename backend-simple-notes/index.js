import express from 'express'
import cors from 'cors'
import { getUserById, getUser, getUsers, checkPassword } from './database.js'
const port = 7000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(bodyParser.urlencoded({extended: false}))

// create a handle to manage user sesstions or use express session manager module

// app.use('/', (req, res) => {
//     res.send("<h1>This is some simple text</h1>")
// })

app.get('/users', async (req, res) => {
    const users = await getUsers()
    // res.send("This should be the users")
    res.send(users)
})

app.get('/user/:email', async (req, res) => {
    const email = req.params.email
    const user = await getUser(email)
    res.send(user)
})

app.get('/userbyid/:id', async (req, res) => {
    const id = req.params.id
    const user = await getUserById(id)
    res.send(user)
})

app.post('/checkpassword', async (req, res) => {
    const { email, password } = req.body
    const password_status = await checkPassword(email, password)
    console.log(req.body)
    // console.log(password_status)

    switch (password_status) {
        case 0:
            // Invalid email
            res.status(401).send({ "type": 0, "message": "Email does not exist in database" })
            // res.send({ "type": 0, "message": "Email does not exist in database" })

            // res.send("Invalid email")
            // res.end()
            break;
        case 1:
            // Invalid password
            res.status(401).send({ "type": 1, "message": "Password is incorrect" })
            // res.send({ "type": 1, "message": "Password is incorrect" })

            break;
        case 2:
            // res.sendStatus(200)
            res.status(200).send({ "type": 2, "message": "Correct pasword" })
            // res.status(200).send({ "type": 2, "message": "Correct pasword" })

            // Valid email and correct password
            break;
    }
})
// ------- Login -------------
app.get('/checklogin', (req, res) => {
    res.set('Access-Control-Allow-Credentials', true);
    res.json({
        loggedIn: req.session.loggedIn,
        user: req.session.user,
        message: "Logged In: " + req.session.loggedIn
    })
})
// ------- Login -------------

app.listen(port, () => {
    console.log("The server is running on port:", port);
})
