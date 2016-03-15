(function () {
    'use strict';

    var auth = angular.module('app.auth', ['app.core']);

    auth.factory('authInterceptor', ['$rootScope', '$q', '$window', '$location',
        'toastr', authInterceptor]);

    function authInterceptor($rootScope, $q, $window, $location, toastr) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Auth ' + $window.sessionStorage.token;
                }
                return config;
            },
            responseError: function (rejection) {
                var msg = rejection.data + ': ' + rejection.config.url;
                toastr.error(msg);
                if (rejection.status === 401) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    }

    auth.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})();
