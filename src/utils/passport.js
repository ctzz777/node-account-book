const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy  = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// local
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({username: username});
    if (user) {
      const isMatch = await user.validatePassword(password);
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
}));

// jwt
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
}));

// google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/google/callback`
  }, async (accessToken, refreshToken, profile, cb) => {
      const username = profile.emails[0].value;
      const password = profile.id;
      console.log(password);
      const user = await User.findByUsernameOrCreate(username, password);
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
  }
));

module.exports = passport;