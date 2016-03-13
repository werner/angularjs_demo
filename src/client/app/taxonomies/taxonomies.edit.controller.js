(function() {
    'use strict';

    angular
        .module('app.taxonomies')
        .controller('TaxonomiesEditController', TaxonomiesEditController);

    TaxonomiesEditController.$inject = ['$q', 'TaxonomiesService', 'logger',
                                        '$location', '$stateParams', '$filter'];
    /* @ngInject */
    function TaxonomiesEditController($q, TaxonomiesService, logger,
            $location, $stateParams, $filter) {
        var vm = this;
        vm.title = 'Edit Taxonomy';
        vm.taxonomies = [];
        vm.taxonomy = {};
        vm.update = update;

        activate();

        function activate() {
            var promises = [getTaxonomies(), getTaxonomy($stateParams.id)];
            return $q.all(promises).then(function () {
                logger.info('Edit Taxonomy');
            });
        }

        function getTaxonomies() {
            return TaxonomiesService.getTaxonomies().then(function (data) {
                vm.taxonomies = data;
                return vm.taxonomies;
            });
        }

        function getTaxonomy(id) {
            return TaxonomiesService.getTaxonomy(id).then(function (data) {
                vm.taxonomy = data;
                var father = $filter('filter')(vm.taxonomies, {id: data.taxonomyId}, true);
                vm.taxonomy.taxonomyId = father[0] || null;
                return vm.taxonomy;
            });
        }

        function update(id, taxonomy) {
            return TaxonomiesService.putTaxonomy(id, taxonomy).then(function (data) {
                vm.taxonomy = data;
                logger.info('Taxonomy updated');
                return $location.path('taxonomies');
            });
        }

    }

})();
