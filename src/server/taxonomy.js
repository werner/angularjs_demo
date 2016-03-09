/*jshint node:true*/
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('demo.sqlite3');
var Taxonomy = {};

Taxonomy.insertTaxonomy = function(data, callback)
{
    var stmt = db.prepare('INSERT INTO taxonomies VALUES (?, ?, ?, ?)');
    var taxonomyId = data.taxonomyId ? data.taxonomyId.id : null;
    stmt.run(null, data.title, data.code, taxonomyId, function(err) {
        if (err) {
            throw err;
        }
        else {
            callback();
        }
    });
    stmt.finalize();
};

Taxonomy.updateTaxonomy = function(id, data, callback)
{
    var stmt = db.prepare('UPDATE taxonomies ' +
            'SET title = ?, code = ?, taxonomyId = ? WHERE id = ?');
    var taxonomyId = data.taxonomyId ? data.taxonomyId.id : null;
    stmt.run(data.title, data.code, taxonomyId, id, function(err) {
        if (err) {
            throw err;
        }
        else {
            callback();
        }
    });
    stmt.finalize();
};

Taxonomy.deleteTaxonomy = function(id, callback)
{
    var stmt = db.prepare('DELETE FROM taxonomies WHERE id = ?');
    stmt.run(id, function(err) {
        if (err) {
            throw err;
        }
        else {
            callback();
        }
    });
    stmt.finalize();
};

Taxonomy.listTaxonomies = function(callback) {
    db.all('SELECT h.id, h.title, h.code, h.taxonomyId, f.title father FROM taxonomies h ' +
           'LEFT JOIN taxonomies f ON f.id = h.taxonomyId',
            function(err, rows) {
                if (err) {
                    throw err;
                }
                else {
                    callback(null, rows);
                }
            });
};

Taxonomy.showTaxonomy = function(id, callback) {
    var stmt = db.prepare('SELECT id, title, code, taxonomyId FROM taxonomies WHERE id = ?');
    stmt.bind(id);
    stmt.get(function(err, row) {
        if (err) {
            throw err;
        }
        else {
            if (row) {
                callback(null, row);
            }
            else {
                console.log('No record found');
            }
        }
    });
};

module.exports = Taxonomy;
