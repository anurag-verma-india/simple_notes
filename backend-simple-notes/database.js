import mysql from 'mysql2' // 😎 Using ES6 modules not CommonJS
import { createHash } from 'node:crypto'

const pool = mysql.createPool({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE

    host: 'localhost',
    user: 'root',
    password: 'Pass#@123',
    database: 'simple_notes'
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

async function getUser(email) {
    const [result] = await pool.query("SELECT * FROM users where email=?", [email]) // select first item from array [result]
    const user = result[0]
    return user
}

export async function checkUserExists(email) {
    const user = await getUser(email)
    if (user != undefined && user.length !== 0) {
        return user.id;
    } else { return false }
}

export async function checkPassword(email, password) {
    if (await checkUserExists(email)) {
        const user = await getUser(email)
        // let hash = crypto.createHash('sha256').update(password).digest("hex")
        let hash = createHash('sha256').update(password).digest("hex")
        // console.log(hash);
        
        if (user.passkey === hash) {
            return "Correct Password"
        }
        return "Incorrect Password"
    }
    else return "Invalid email"
}



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