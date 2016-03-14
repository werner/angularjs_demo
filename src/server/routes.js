var router = require('express').Router();
var four0four = require('./utils/404')();
var taxonomy = require('./taxonomy');
var sessions = require('./sessions');

router.get('/taxonomies', getTaxonomies);
router.get('/taxonomy/:id', getTaxonomy);
router.get('/*', four0four.notFoundMiddleware);
router.put('/taxonomy/:id', putTaxonomy);
router.post('/taxonomy', postTaxonomy);
router.delete('/taxonomy/:id', deleteTaxonomy);
router.get('/dashboard', getDashboard);

router.post('/authenticate', authenticateUser);

module.exports = router;

//////////////


function getDashboard(req, res, next) {
    res.status(200).send({success: true});
}

function authenticateUser(req, res, next) {
    sessions.create(function(err, data) {
        if (data.success) {
            res.status(200).send({success: true});
        } else {
            res.status(401).send({success: false});
        }
    });
}

function getTaxonomies(req, res, next) {
    taxonomy.list(function(err, data) {
        res.status(200).send(data);
    });
}

function putTaxonomy(req, res, next) {
    taxonomy.update(req.params.id, req.body, function() {
        res.status(200).send({success: true});
    });
}

function postTaxonomy(req, res, next) {
    taxonomy.insert(req.body, function() {
        res.status(200).send({success: true});
    });
}

function getTaxonomy(req, res, next) {
    taxonomy.show(req.params.id, function(err, data) {
        res.status(200).send(data);
    });
}

function deleteTaxonomy(req, res, next) {
    taxonomy.delete(req.params.id, function() {
        res.status(200).send({success: true});
    });
}
