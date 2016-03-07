/* jshint -W117, -W030 */
describe('TaxonomiesController', function() {
    var controller;
    var taxonomies = mockData.getMockTaxonomies();

    beforeEach(function() {
        bard.appModule('app.taxonomies');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function() {
        sinon.stub(dataservice, 'getTaxonomies').returns($q.when(taxonomies));
        controller = $controller('TaxonomiesController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Taxonomies Controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should have title of Dashboard', function () {
            expect(controller.title).to.equal('Taxonomies');
        });
    });

});
