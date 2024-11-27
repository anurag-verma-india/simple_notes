import mysql from 'mysql2' // 😎 Using ES6 modules not CommonJS
import { createHash } from 'node:crypto'
// import * as envFile from './env.json' with {type: "json"} // Importing json modules is an experimental feature
// const env = envFile.default

// const mysql_host = process.env.ABCHOST
// const mysql_user = process.env.ABCUSER
// const mysql_password = process.env.ABCPASSWORD
// const mysql_database = process.env.ABCDATABASE


const pool = mysql.createPool({
    connectionLimit: 100, // To save CPU resources
    // host: env.mysql_host,
    // user: env.mysql_user,
    // password: env.mysql_password,
    // database: env.mysql_database

    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database

}).promise()


// this is a dangerous function (gets all notes created by all users)
// export async function getAllNotes() {
//     const [rows] = await pool.query("SELECT * FROM notes") // destructuring assignment
//     // select first item (which happens to an array) from the resulting array (that pool.query() returns)
//     return rows
// }

// Change this to get note only by id and user email simultaneously
// export async function getNote(id) {
//     const [rows] = await pool.query(`SELECT * FROM notes WHERE id=?`, [id])
//     return rows[0]
// }

export async function createNote(title, content) {
    /*
    Returns the id of the created note
    */
    const [result] = await pool.query(`INSERT INTO notes (title, contents) VALUES (?,?)`, [title, content])
    return result
}

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users") // destructuring assignment
    // select first item (which happens to an array) from the resulting array (that pool.query() returns)
    return rows
}

export async function getUserByEmail(email) {
    const [result] = await pool.query("SELECT * FROM users where email=?", [email]) // select first item from array [result]
    const user = result[0]
    return user
}

export async function getUserById(id) {
    const [result] = await pool.query("SELECT * FROM users where id=?", [id]) // select first item from array [result]
    const user = result[0]
    return user
}

export async function checkUserExists(email) {
    const user = await getUserByEmail(email)
    if (user != undefined && user.length !== 0) {
        return user.id;
    } else { return false }
}

export async function checkPassword(email, password) {
    // return 0 if user doesn't exit
    // 1 for incorrect password
    // 2 for correct password
    // -1 for inactive user
    if (await checkUserExists(email)) {
        const user = await getUserByEmail(email)
        // let hash = crypto.createHash('sha256').update(password).digest("hex")
        let hash = createHash('sha256').update(password).digest("hex")
        // console.log(hash);
        if (user.passkey === hash) {
            // return "Correct Password"
            if (user.active === 0) return -1
            else return 2
        }
        // return "Incorrect Password"
        return 1
    }
    // else return "Invalid email"
    else return 0
}



export async function patch(userDetails) {
    if (await checkUserExists(email)) {
        const user = await getUserByEmail(email)
        // let hash = crypto.createHash('sha256').update(password).digest("hex")
        let hash = createHash('sha256').update(password).digest("hex")
        // console.log(hash);
        if (user.passkey === hash) {
            // return "Correct Password"
            if (user.active === 0) return -1
            else return 2
        }
        // return "Incorrect Password"
        return 1
    }
    // else return "Invalid email"
    else return 0
}


// export async function createUser(id, username, fname, lname, )


// const user = await getUserById(1)
// console.log(user)

// console.log("anurag", (await checkPassword("anurag@gmail.com", "password")))
// console.log("anurag", (await checkPassword("anurag@gmail.com", "passwordjkdas")))
// console.log("random", (await checkPassword("adjflasdnurag@gmail.com", "jfisa")))

// const user = await getUser("anurag@gmail.com")
// console.log(user)


// const res = await checkUserExists("anurag@gmail.coM".toLowerCase())
// const res2 = await checkUserExists("alsdfasanurag@gmail.com")
// const res3 = await checkUserExists("bruce@wayne.COM".toLowerCase())
// console.log("anu",res)
// console.log("jkfnas",res2)
// console.log("br",res3)


// const result = await getNotes()
// const result = await getNote(2)
// const result = await createNote("test", "this is a test note")
// console.log(result.contents)
// console.log(result)

// module.exports = { getNotes, getNote, createNote }
// export { getNote, getNotes, createNote }