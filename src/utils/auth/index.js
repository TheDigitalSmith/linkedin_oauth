const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const userDb = require('../../models/users/index');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

passport.serializeUser(userDb.serializeUser());
passport.deserializeUser(userDb.deserializeUser());

const jwtOpts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_KEY
}

passport.use(new LocalStrategy(userDb.authenticate()));
passport.use(new JwtStrategy(jwtOpts, (jwtPayload, next)=>{
    userDb.findById(jwtPayload._id, (err, user) =>{
        if (err) return next(err,null)
        else if(user) return next (null,user)
        else return (null,false)
    })
}))

module.exports = {
    getToken : (userInfo) => {
        jwt.sign(userInfo, process.env.TOKEN_KEY, {expiresIn:3600*24})
    }
}