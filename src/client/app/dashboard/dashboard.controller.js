(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'logger', '$http'];
    /* @ngInject */
    function DashboardController($q, logger, $http) {
        var vm = this;
        vm.news = {
            title: 'saili',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.title = 'Dashboard';

        activate();

        function activate() {
            $http.get('/api/dashboard').success(function(data) {
                console.log(data);
            });
        }
    }
})();
