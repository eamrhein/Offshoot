const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model;
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    console.log(jwtPayload);
    done();
  }));
};
