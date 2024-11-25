const express = require('express');
var authRouter = express.Router();
const db = require('../db-ops/db_handler')

authRouter.post('/adduser',(req, res)=>{
    db.createUser(req,res);
});
authRouter.post('/login', (req,res)=>{
    console.log('auth.js running')
    db.doLogin(req,res,);
})

module.exports = authRouter;