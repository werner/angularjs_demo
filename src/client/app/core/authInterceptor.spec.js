/* jshint -W117, -W030 */
describe('authInterceptor', function() {

    var httpProviderIt;

    beforeEach(function() {
        module('app.auth', function($httpProvider) {
            httpProviderIt = $httpProvider;
        });
        bard.appModule('app.dashboard');
        bard.inject(this, '$httpBackend', '$rootScope',
            'authInterceptor', '$window', '$location', '$controller');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function() {
        expect(authInterceptor).not.to.be.defined;
    });

    it('should have the authInterceptor factory as an interceptor', function () {
        expect(httpProviderIt.interceptors).to.contain('authInterceptor');
    });

    it('should set the token in the headings', function() {
        $window.sessionStorage.token = 'hello';
        $httpBackend.when('GET', '/test', null, function(headers) {
            expect(headers.Authorization).to.be(token);
        }).respond(200);
    });

    it('should redirect when an error like 401 arise', function() {
        sinon.spy($location, 'path');
        $window.sessionStorage.token = 'hello';
        $httpBackend.when('GET', '/api/home').respond(401);
        $controller('DashboardController', {scope: $rootScope});
        $httpBackend.flush();
        expect($location.path()).to.equal('/login');
    });
});
