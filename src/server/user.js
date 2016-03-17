/*jshint node:true*/
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('demo.sqlite3');
var crypto = require('crypto');

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64');
}

exports.createUser = function(name, password, callback) {
    var user = {
        name: name,
        password: hash(password)
    };

    var stmt = db.prepare('INSERT INTO users(username, password) VALUES(?, ?)');
    stmt.run(user.name, user.password, function(err) {
        if (err) {
            throw err;
        }
        else {
            callback();
        }
    });
};

exports.authenticate = function(username, password, callback) {

    var stmt = db.prepare('SELECT id, username, password FROM users WHERE username = ?');
    stmt.bind(username);
    stmt.get(function(err, row) {
        if (err) {
            throw err;
        }
        else {
            if (row && row.password === hash(password)) {
                callback(null, row);
            }
            else {
                callback('No user found', null);
            }
        }
    });

};
