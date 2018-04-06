var bCrypt = require('bcrypt-nodejs');
var Strategy = require('passport-local').Strategy;
var dbLayer = require('../modules/dbLayer');
var auth = {};

function generateHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

function isValidPassword(userpass, password) {
    return bCrypt.compareSync(password, userpass);
}

auth.initializeStrategy = function(passport) {
    passport.use('local', new Strategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, cb) {
            dbLayer.user.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return cb(null, false);
                }
                if (!isValidPassword(user.password, password)) {
                    return cb(null, false);
                }

                var userinfo = user.get();
                user.update({
                    last_login: Date.now()
                })
                return cb(null, userinfo);

            }).catch(function(err) {
                console.log("Error:", err);
                return cb(null, false);
            });
        }));

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        dbLayer.user.findById(id).then(function(user) {
            if (user) {
                cb(null, user);
            } else {
                return cb(null);
            }
        });
    });

};

auth.createUser = function(req, res, next) {
    var User = dbLayer.user;
    User.findOne({
        where: {
            email: req.body.emailReg
        }
    }).then(function(user) {
        if (user) {
            next({
                success: false,
                message: 'That email is already taken'
            });
        } else {
            var userPassword = generateHash(req.body.passwordReg);
            var data = {
                email: req.body.emailReg,
                password: userPassword,
                firstname: req.body.firstnameReg,
                lastname: req.body.lastnameReg
            };

            User.create(data).then(function(newUser, created) {
                if (!newUser) {
                    next({
                        success: false,
                        message: 'Error when trying to create new user'
                    });
                };
                if (newUser) {
                    next({
                        success: true,
                        message: 'User created'
                    });
                };
            });
        };
    });
};

module.exports = auth;
