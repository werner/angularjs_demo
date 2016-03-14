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
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    vm.welcome = 'Welcome ' + profile.firstName + ' ' + profile.lastName;
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
        };

        //this is used to parse the profile
        function url_base64_decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polyfill https://github.com/davidchambers/Base64.js
        }
    }
})();
