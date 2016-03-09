var router = require('express').Router();
var four0four = require('./utils/404')();
var taxonomy = require('./taxonomy');

router.get('/taxonomies', getTaxonomies);
router.get('/taxonomy/:id', getTaxonomy);
router.get('/*', four0four.notFoundMiddleware);
router.put('/taxonomy', putTaxonomy);
router.post('/taxonomy', postTaxonomy);
router.delete('/taxonomy/:id', deleteTaxonomy);

module.exports = router;

//////////////

function getTaxonomies(req, res, next) {
    taxonomy.listTaxonomies(function(err, data) {
        res.status(200).send(data);
    });
}

function putTaxonomy(req, res, next) {
    taxonomy.insertTaxonomy(req.body, function() {
        res.status(200).send({success: true});
    });
}

function postTaxonomy(req, res, next) {
    taxonomy.updateTaxonomy(req.body.id, req.body, function() {
        res.status(200).send({success: true});
    });
}

function getTaxonomy(req, res, next) {
    taxonomy.showTaxonomy(req.params.id, function(err, data) {
        res.status(200).send(data);
    });
}

function deleteTaxonomy(req, res, next) {
    taxonomy.deleteTaxonomy(req.params.id, function() {
        res.status(200).send({success: true});
    });
}
