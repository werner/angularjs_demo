/*jshint node:true*/
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('demo.sqlite3');
var Taxonomy = {};

Taxonomy.insertTaxonomy = function(data)
{
    var stmt = db.prepare('INSERT INTO taxonomies VALUES (?, ?, ?, ?)');
    stmt.run(null, data.title, data.code, data.taxonomyId);
    stmt.finalize();
};

Taxonomy.listTaxonomies = function(callback) {
    db.all('SELECT id, title, code, taxonomy_id FROM taxonomies',
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
    var stmt = db.prepare('SELECT id, title, code, taxonomy_id FROM taxonomies WHERE id = ?');
    stmt.bind(id);
    stmt.get(function(err, row) {
        if (err) {
            throw err;
        }
        else {
            if (row) {
                callback('', row);
            }
            else {
                console.log('No record found');
            }
        }
    });
};

module.exports = Taxonomy;
