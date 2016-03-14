/*jshint node:true*/
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('demo.sqlite3');
var bcrypt = require('bcryptjs');
var Session = {};

Session.create = function(data, callback)
{
    var stmt = db.prepare('SELECT username, password FROM users WHERE username = ?');
    stmt.bind(data.username);
    stmt.get(function(err, row) {
        if (err) {
            throw err;
        }
        else {
            if (row) {
                var authenticate = bcrypt.compareSync(data.password, row.password);
                callback(null, {sucess: authenticate});
            }
            else {
                callback(null, {sucess: false, msg: 'User not found'});
            }
        }
    });

}
