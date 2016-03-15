(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'logger', '$http', 'DashboardService'];
    /* @ngInject */
    function DashboardController($q, logger, $http, DashboardService) {
        var vm = this;
        vm.news = {
            title: 'saili',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.title = 'Dashboard';

        activate();

        function activate() {
            return DashboardService.getHome();
        }
    }
})();
