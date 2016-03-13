(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'logger'];
    /* @ngInject */
    function DashboardController($q, logger) {
        var vm = this;
        vm.news = {
            title: 'saili',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.title = 'Dashboard';
    }
})();
