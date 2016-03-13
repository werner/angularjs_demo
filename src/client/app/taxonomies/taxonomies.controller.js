(function () {
    'use strict';

    angular
        .module('app.taxonomies')
        .controller('TaxonomiesController', TaxonomiesController);

    TaxonomiesController.$inject = ['$q', 'TaxonomiesService', 'logger', 'bootstrap.dialog'];
    /* @ngInject */
    function TaxonomiesController($q, TaxonomiesService, logger, modalDialog) {
        var vm = this;
        vm.taxonomies = [];
        vm.title = 'Taxonomies';
        vm.deleteTaxonomy = deleteTaxonomy;

        activate();

        function activate() {
            var promises = [getTaxonomies()];
            return $q.all(promises).then(function () {
                logger.info('Taxonomies');
            });
        }

        function getTaxonomies() {
            return TaxonomiesService.getTaxonomies().then(function (data) {
                vm.taxonomies = data;
                return vm.taxonomies;
            });
        }

        function deleteTaxonomy(id) {
            return modalDialog.deleteDialog('Taxonomy').then(function(data) {
                return TaxonomiesService.deleteTaxonomy(id).then(function (data) {
                    logger.info('Taxonomy deleted');
                    getTaxonomies();
                });
            });
        }

    }
})();
