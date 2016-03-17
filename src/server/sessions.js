/*jshint node:true*/
'use strict';
var User = require('./user');

exports.login = function(req, res, next) {
    if (req.session.user) {
        return res.status(200).send();
    }

    var username = req.body.username;
    var pass = req.body.password;

    User.authenticate(username, pass, function(err, user) {
        if (err) {
            return res.status(401).send({msg: err});
        }

        if (user) {
            req.session.user = {id: user.id, username: user.username,
                token: user.id + user.username};
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send();
        }
    });
};

exports.logout = function(req, res, next) {
    delete req.session.user;
    res.status(200).send();
};

// Authorize a given page only to registered users
exports.authorize = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send();
    }
};
