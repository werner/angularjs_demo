(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getPeople: getPeople,
            getTaxonomies: getTaxonomies,
            editTaxonomy: editTaxonomy,
            putTaxonomy: putTaxonomy,
            postTaxonomy: postTaxonomy,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function getTaxonomies() {
            return $http.get('/api/taxonomies')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getTaxonomies')(e);
            }
        }

        function putTaxonomy(data) {
            return $http.put('/api/taxonomy', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for putTaxonomy')(e);
            }
        }

        function postTaxonomy(data) {
            return $http.post('/api/taxonomy', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for postTaxonomy')(e);
            }
        }

        function editTaxonomy(data) {
            return $http.get('/api/taxonomy/' + data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for editTaxonomy')(e);
            }
        }
    }
})();
