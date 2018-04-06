var bCrypt = require('bcrypt-nodejs');
var dbLayer = require('../modules/dbLayer');
var auth = {};

generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
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
            var data =
                {
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
