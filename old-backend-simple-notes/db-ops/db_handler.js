const mysql = require('mysql')
var data = {}
var md5 = require('md5')


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
            // console.log(`err: ${err}\n`)
            // console.log(`data: ${data}\n`)
            // console.log(`headerData: ${headerData}\n`)
            if (err) {
                sendResponse(res, "SQL Error", { message: err.message }, true, 500);
            }
            sendResponse(res, 'ok', { heads: grabHeaders(headerData), data: data })
        }
    )
}

function createUser(req, res) {
    pool.query(
        `SELECT username, fname, lname, email, active from users where username=${req.body.user} and passkey=${md5(req.body.password)}`,
        (qErr, result, fields) => {
            console.log(`result: ${result}`);
            if (qErr) {
                console.log(`qErr: ${qErr}`);
                sendResponse(res, message, data, true, 403)
            }

            else {
                if (result.Length != 0) {
                    switch (result[0].active) {
                        case 0:
                            sendResponse(
                                res,
                                "User disabled please contact admin",
                                {},
                                true,
                                403,
                            );
                            break;
                        case 1:
                            sendResponse(
                                res,
                                "Login Success!",
                                result,
                                true,
                                403,
                            )
                            break;
                        default:
                            sendResponse(
                                res,
                                "Unknown Error",
                                {},
                                ture,
                                406,
                            );
                            break;
                    }

                }

            }

        }
    )
}

module.exports= {getUserTypes, createUser};
