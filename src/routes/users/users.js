const express = require('express');
const router = express.Router();
const userDb = require('../../models/users/index');
const passport = require('passport');

//fetching user
router.get('/', async(req,res)=>{
    try{
        console.log('fetching users');
        const users = await userDb.find({});
        res.send(users);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


//register user
router.post('/register',async(req,res)=>{
    try{
        console.log('creating user')
        const newUser = await userDb.register(req.body, req.body.password);
        res.json(newUser);
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;