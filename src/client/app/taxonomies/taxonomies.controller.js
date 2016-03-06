(function () {
    'use strict';

    angular
        .module('app.taxonomies')
        .controller('TaxonomiesController', TaxonomiesController);

    TaxonomiesController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function TaxonomiesController($q, dataservice, logger) {
        var vm = this;
        vm.messageCount = 0;
        vm.taxonomies = [];
        vm.title = 'Taxonomies';

        activate();

        function activate() {
            var promises = [getMessageCount(), getTaxonomies()];
            return $q.all(promises).then(function () {
                logger.info('Taxonomies');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getTaxonomies() {
            return dataservice.getTaxonomies().then(function (data) {
                vm.taxonomies = data;
                return vm.taxonomies;
            });
        }
    }
})();
