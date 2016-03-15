(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('DashboardService', DashboardService);

    DashboardService.$inject = ['$http', '$q'];
    /* @ngInject */
    function DashboardService($http, $q) {
        var service = {
            getHome: getHome
        };

        return service;

        function getHome() {
            $http.get('/api/home');
        }
    }
})();
