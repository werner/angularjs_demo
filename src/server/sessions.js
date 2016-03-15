/*jshint node:true*/
'use strict';
var User = require('./user');

exports.login = function(req, res, next) {
    if (req.session.user) return res.redirect('/home');

    var email = req.body.email;
    var pass = req.body.password;

        User.authenticate(email, pass, function(err, user) {
            if (err) return next(err);

            if (user) {
                req.session.user = {id: user.id, name: user.name};
                res.redirect('/home');
            } else {
                res.redirect('/login');
            }
        })
}

exports.logout = function(req, res, next) {
    delete req.session.user;
    res.redirect('/login');
}

// Authorize a given page only to registered users
exports.authorize = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send();
    }
}
