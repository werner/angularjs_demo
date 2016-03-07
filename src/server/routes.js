var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var taxonomy = require('./taxonomy');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/taxonomies', getTaxonomies);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function getTaxonomies(req, res, next) {
    taxonomy.listTaxonomies(function(err, data) {
        res.status(200).send(data);
    });
}
