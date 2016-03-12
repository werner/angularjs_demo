(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getTaxonomies:   getTaxonomies,
            getTaxonomy:     getTaxonomy,
            putTaxonomy:     putTaxonomy,
            postTaxonomy:    postTaxonomy,
            deleteTaxonomy:  deleteTaxonomy,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

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

        function putTaxonomy(id, data) {
            return $http.put('/api/taxonomy/' + id, data)
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

        function getTaxonomy(data) {
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

        function deleteTaxonomy(data) {
            return $http.delete('/api/taxonomy/' + data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for deleteTaxonomy')(e);
            }
        }
    }
})();
