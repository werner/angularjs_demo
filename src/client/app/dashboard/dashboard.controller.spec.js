/* jshint -W117, -W030 */
describe('DashboardController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$q',
            '$rootScope', '$http', 'DashboardService', '$httpBackend');
    });

    beforeEach(function () {
        controller = $controller('DashboardController');
        $httpBackend.when('GET', '/api/home').respond(200);
        sinon.stub(DashboardService, 'getHome').returns($q.when());
        $rootScope.$apply();
        $httpBackend.flush();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Dashboard controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Dashboard', function () {
                expect(controller.title).to.equal('Dashboard');
            });

            it('should have news', function () {
                expect(controller.news).to.not.be.empty;
            });
        });
    });
});
