// const crypto = require('crypto')
import { createHash } from 'node:crypto'

// let hash = crypto.createHash('md5').update('some_string').digest("hex")
// let hash = crypto.createHash('sha256').update('password').digest("hex")
let hash = createHash('sha256').update('password').digest("hex")
console.log(hash)
// let hash2 = crypto.createHash('sha256').update('batman').digest("hex")
let hash2 = createHash('sha256').update('batman').digest("hex")

console.log(hash2)



// const {
//   getHashes,
// } = require('node:crypto');

// console.log(getHashes()); //
