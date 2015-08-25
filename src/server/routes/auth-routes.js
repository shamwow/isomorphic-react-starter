import express from 'express';
const routes = express.Router();

import models from "../models";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

routes.use(session({ secret: 'superSeCret' }));
routes.use(passport.initialize());
routes.use(passport.session());

// **************************** Login *******************************

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.find(id).then(function (user) {
    done(null, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    models.User.find({ where: {email: username} }).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(user.password == password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
}));

routes.get('/isLoggedIn', (req, res) => {
    res.json({isLoggedIn: req.user != null});
});

routes.post('/login',
    passport.authenticate('local'), //returns 401 if fails
    (req, res) => {
        models.User.find(req.user.id).then(function(user) {
            if (user) {
                user.updateAttributes({
                    last_login: new Date()
                });
                res.json(req.user);
            }
        });
    }
);

routes.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send("Success!");
});

routes.post('/signup', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    models.User.create({email: email, password: password}).then(function(result) {
        var userId = result.dataValues.id;
        models.User.find(userId).then(function(user) {
            req.login(user, function() {
                res.json(req.user);
            })
        })
    });
});

export default routes;