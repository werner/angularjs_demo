(function() {
    'use strict';

    angular
        .module('app.taxonomies')
        .controller('TaxonomiesEditController', TaxonomiesEditController);

    TaxonomiesEditController.$inject = ['$q', 'dataservice', 'logger',
                                        '$location', '$stateParams', '$filter'];
    /* @ngInject */
    function TaxonomiesEditController($q, dataservice, logger, $location, $stateParams, $filter) {
        var vm = this;
        vm.title = 'Edit Taxonomy';
        vm.taxonomies = [];
        vm.taxonomy = {};
        vm.postTaxonomy = postTaxonomy;

        activate();

        function activate() {
            var promises = [getTaxonomies(), getTaxonomy($stateParams.id)];
            return $q.all(promises).then(function () {
                logger.info('Edit Taxonomy');
            });
        }

        function getTaxonomies() {
            return dataservice.getTaxonomies().then(function (data) {
                vm.taxonomies = data;
                return vm.taxonomies;
            });
        }

        function getTaxonomy(id) {
            return dataservice.editTaxonomy(id).then(function (data) {
                vm.taxonomy = data;
                var father = $filter('filter')(vm.taxonomies, {id: data.taxonomyId}, true);
                vm.taxonomy.taxonomyId = father[0] || null;
                return vm.taxonomy;
            });
        }

        function postTaxonomy(id, taxonomy) {
            return dataservice.postTaxonomy(id, taxonomy).then(function (data) {
                vm.taxonomy = data;
                logger.info('Taxonomy updated');
                return $location.path('taxonomies');
            });
        }

    }

})();
