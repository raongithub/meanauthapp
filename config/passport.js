const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function (passport) {
    // Configuration which reads the JWT from the http Authorization header with the scheme 'JWT'
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy ( opts, ( jwt_payload, done) => {
        // console.log(jwt_payload);
        User.getUserById( jwt_payload._doc._id, ( error, user ) => {
            if ( error ) {
                return done ( error, false);
            }
            if ( user ) {
                return done ( null, user );
            } else {
                return done ( null, false );
            }
        });
    }));
};