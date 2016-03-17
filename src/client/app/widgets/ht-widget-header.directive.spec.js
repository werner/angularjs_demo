/* jshint -W117, -W030 */
describe('htWidgetHeader', function() {

    beforeEach(function() {
        bard.appModule('app.widgets');
        bard.inject('$compile', '$rootScope', '$httpBackend');
        bard.inject('$compile', '$rootScope');
    });

    describe('Ht widget directive', function() {
        it('should be created successfully', function () {
            $httpBackend.when('GET', 'app/widgets/widget-header.html')
                .respond(200, '<h1>Template</h1>');
            var element = $compile(
                angular.element('<ht-widget-header></ht-widget-header>')
            )($rootScope);
            $rootScope.$digest();
            expect(element.isolateScope()).to.be.defined;
        });
    });
});
