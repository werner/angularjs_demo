(function() {
    'use strict';

    angular
        .module('app.taxonomies')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'taxonomies',
                config: {
                    url: '/taxonomies',
                    templateUrl: 'app/taxonomies/taxonomies.html',
                    controller: 'TaxonomiesController',
                    controllerAs: 'vm',
                    title: 'Taxonomies',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-bars"></i> Taxonomies'
                    }
                }
            },
            {
                state: 'taxonomies-new',
                config: {
                    url: '/taxonomies/new',
                    templateUrl: 'app/taxonomies/taxonomies.new.html',
                    controller: 'TaxonomiesNewController',
                    controllerAs: 'vm',
                    title: 'New Taxonomy'
                }
            }
        ];
    }
})();
