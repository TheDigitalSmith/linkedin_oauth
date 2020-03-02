const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
// const FbStrategy = require('passport-facebook').Strategy;
const FbStrategy = require('passport-facebook-token');
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

passport.use('fb', new FbStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_KEY
}, async(accessToken, refreshToken, facebookProfile, next)=>{
    console.log(accessToken);
    console.log(facebookProfile);
    try {
        const user = await userDb.findOne({facebookId: facebookProfile.id});
        if (user) return next(null, user)
        else {
            const newUser = await userDb.create({
                username: facebbook.email[0].value,
                facebookId: facebookProfile.id,
                firstName: facebookProfile.name.givenName,
                lastName: facebookProfile.name.familyName,
                image: facebookProfile.photos[0].value
            })
        }
    }catch(err){
        console.log(err);
        return next(err)
    }
}))

module.exports = {
    getToken : (userInfo) => {
        jwt.sign(userInfo, process.env.TOKEN_KEY, {expiresIn:3600*24});
    }
}