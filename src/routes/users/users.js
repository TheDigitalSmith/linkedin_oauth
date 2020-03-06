const express = require('express');
const router = express.Router();
const userDb = require('../../models/users/index');
const passport = require('passport');
const {getToken}  = require('../../utils/auth/index');

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

//Logging in
router.post('/signIn', passport.authenticate('local'), async(req,res)=>{
    try {
        console.log('signing user in');
        const user = await userDb.findById(req.user._id);
        const token =getToken({_id: req.user._id})
            res.json({
            user: user, 
            access_token: token
        });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//refreshing token
router.post('/token', passport.authenticate('jwt'), async(req,res)=>{
    try{
        const token = getToken({
            _id: req.user._id,
            firstName: req.user.firstName
        })
        res.send(token)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
    
})

//Logging in using Facebook
router.post('/signIn/fb', passport.authenticate('fb'), async(req,res)=>{
    try{
        const token = getToken({
            _id:req.user._id,
            firstName: req.user.firstName
        })
        res.json({
            user: req.user,
            access_token: token
        })
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;