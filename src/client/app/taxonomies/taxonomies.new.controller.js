(function() {
    'use strict';

    angular
        .module('app.taxonomies')
        .controller('TaxonomiesNewController', TaxonomiesNewController);

    TaxonomiesNewController.$inject = ['$q', 'TaxonomiesService', 'logger', '$location'];
    /* @ngInject */
    function TaxonomiesNewController($q, TaxonomiesService, logger, $location) {
        var vm = this;
        vm.title = 'New Taxonomy';
        vm.taxonomies = [];
        vm.taxonomy = {};
        vm.create = create;

        getTaxonomies();

        function getTaxonomies() {
            return TaxonomiesService.getTaxonomies().then(function (data) {
                vm.taxonomies = data;
                return vm.taxonomies;
            });
        }

        function create(taxonomy) {
            return TaxonomiesService.postTaxonomy(taxonomy).then(function (data) {
                vm.taxonomy = data;
                logger.info('Taxonomy created');
                return $location.path('taxonomies');
            });
        }

    }

})();
