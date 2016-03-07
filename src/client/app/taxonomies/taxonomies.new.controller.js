(function() {
    'use strict';

    angular
        .module('app.taxonomies')
        .controller('TaxonomiesNewController', TaxonomiesNewController);

    TaxonomiesNewController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function TaxonomiesNewController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'New Taxonomy';
        vm.taxonomies = [];

        getTaxonomies();

        function getTaxonomies() {
            return dataservice.getTaxonomies().then(function (data) {
                vm.taxonomies = data;
                return vm.taxonomies;
            });
        }
    }

})();
