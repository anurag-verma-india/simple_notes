import * as envFile from '../env.json' with {type: "json"}
const env = envFile.default
console.log(env.mysql_password)

// console.log(envFile.default)

// import fs from 'node:fs'

// function getEnv() {
//     var env
//     fs.readFile('./env.json', (err, data) => {
//         if (err) console.log("err\n", err);
//         env = JSON.parse(data)
//         console.log(env)
//     })
//     // console.log(env)
//     return env
// }

// const env = getEnv();

// console.log(env)
