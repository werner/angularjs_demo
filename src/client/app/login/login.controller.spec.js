/* jshint -W117, -W030 */
describe('LoginController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$rootScope', '$window', '$location', '$httpBackend');
    });

    beforeEach(function() {
        controller = $controller('LoginController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('LoginController Controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should call api/authenticate when login and set sessionStorage token', function() {
            $httpBackend.when('POST', '/api/authenticate', {username: 'jhon.doe', password: '123'})
                .respond(200, {id: 1, username: 'jhon.doe', token: 'test.hash.123'});
            controller.submit().then(function(data) {
                expect($window.sessionStorage.token).to.equal('test.hash.123');
            });
            $httpBackend.flush();
        });

        it('should call api/authenticate when login and fails', function() {
            $httpBackend.when('POST', '/api/authenticate',
                {username: 'jhon.doe.error', password: '456'})
                .respond(401, {msg: 'No user found'});
            controller.submit().then(function(data) {
                expect($window.sessionStorage.token).to.be.undefined;
                expect(controller.error).to.equal('Error: Invalid user or password');
            });
            $httpBackend.flush();
        });

        it('should remove token from sessionStorage', function() {
            $window.sessionStorage.token = 'test.hash';
            expect($window.sessionStorage.token).to.be.defined;
            controller.logout();
            expect($window.sessionStorage.token).to.be.undefined;
        });

    });
});
