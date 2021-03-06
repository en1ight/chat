const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const moment = require('moment');

// strategies
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const VkontakteTokenStrategy = require('passport-vkontakte-token');

const User = require('../models/user');

module.exports = {
  jwtStrategy: () => {
    const params = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };

    return new JwtStrategy(params, (payload, done) => {
      // done will be with 2 params: payload and hidden info parameters
      return done(payload);
    });
  },

  facebookStrategy: () => {
    return new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        // callbackURL: process.env.DOMAIN + '/auth/facebook/callback',
        // profileFields: ['id', 'first_name', 'last_name', 'link', 'gender', 'picture', 'verified', 'email', 'birthday']
      }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  },

  googleStrategy: () => {
    return new GoogleTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },(accessToken, refreshToken, profile, done) => {
        return done(null, profile)
      }
    )
  },

  vkontakteStrategy: () => {
    return new VkontakteTokenStrategy({
      clientID: process.env.VKONTAKTE_CLIENT_ID,
      clientSecret: process.env.VKONTAKTE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    })
  }
};

