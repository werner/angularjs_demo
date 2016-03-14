var router = require('express').Router();
var four0four = require('./utils/404')();
var taxonomy = require('./taxonomy');

router.get('/taxonomies', getTaxonomies);
router.get('/taxonomy/:id', getTaxonomy);
router.put('/taxonomy/:id', putTaxonomy);
router.post('/taxonomy', postTaxonomy);
router.delete('/taxonomy/:id', deleteTaxonomy);
router.get('/dashboard', getDashboard);

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getDashboard(req, res, next) {
    res.status(200).send({success: true});
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
