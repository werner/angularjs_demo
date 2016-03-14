(function () {
    'use strict';

    angular.module('app.login', ['app.core'])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$window'];
    /* @ngInject */
    function LoginController($http, $window) {
        var vm = this;

        vm.activate = activate;
        vm.isAuthenticated = false;
        vm.logout = logout;
        vm.message = 'You need to log in before continue';
        vm.submit = submit;
        vm.welcome = 'Welcome to the Demo App AngularJS';

        activate();

        function activate() {
        }

        function submit() {
            $http
                .post('/api/authenticate', vm.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    vm.isAuthenticated = true;
                    vm.welcome = 'Welcome ' + data.username;
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    vm.isAuthenticated = false;

                    // Handle login errors here
                    vm.error = 'Error: Invalid user or password';
                    vm.welcome = '';
                });
        }

        function logout() {
            vm.welcome = 'See you soon!';
            vm.message = '';
            vm.isAuthenticated = false;
            delete $window.sessionStorage.token;
        }
    }
})();
