(function() {
    'use strict';

    angular
        .module('app.taxonomies')
        .controller('TaxonomiesNewController', TaxonomiesNewController);

    TaxonomiesNewController.$inject = ['$q', 'dataservice', 'logger', '$location'];
    /* @ngInject */
    function TaxonomiesNewController($q, dataservice, logger, $location) {
        var vm = this;
        vm.title = 'New Taxonomy';
        vm.taxonomies = [];
        vm.taxonomy = {};
        vm.putTaxonomy = putTaxonomy;

        getTaxonomies();

        function getTaxonomies() {
            return dataservice.getTaxonomies().then(function (data) {
                vm.taxonomies = data;
                return vm.taxonomies;
            });
        }

        function putTaxonomy(taxonomy) {
            return dataservice.putTaxonomy(taxonomy).then(function (data) {
                vm.taxonomy = data;
                logger.info('Taxonomy created');
                return $location.path('taxonomies');
            });
        }

    }

})();
