const mysql = require('mysql')
var data = {}
var md5 = require('md5')

function consoleLog() {
    console.log('from dbhandler')
}

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    debug: false
})

// filter headers from db queries
function grabHeaders(headerData) {
    return headerData.map(h => h.name)
}

function sendResponse(res, message = "ok", data = {}, error = false, status = 200) {
    try {
        res.status(status).json(
            {
                message: message,
                data: data
            }
        );

    } catch (error) {
        // console.log(error.message);
        res.json({ message: error })
    }
}

function getUserTypes(req, res) {
    pool.query('SELECT id, user_type, description FROM user_types',
        (err, data, headerData) => {
            if (err) {
                sendResponse(res, "SQL Error", { message: err.message }, true, 500);
            }
            sendResponse(res, 'ok', { heads: grabHeaders(headerData), data: data })
        }
    )
}

// function createUser(req,res) {

// }

module.exports.getUserTypes = getUserTypes;