/* jshint -W117, -W030 */
describe('TaxonomiesNewController', function() {
    var controller;
    var taxonomies = mockData.getMockTaxonomies();

    beforeEach(function() {
        bard.appModule('app.taxonomies');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function() {
        sinon.stub(dataservice, 'getTaxonomies').returns($q.when(taxonomies));
        controller = $controller('TaxonomiesNewController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Taxonomies New Controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should have title of Dashboard', function () {
            expect(controller.title).to.equal('New Taxonomy');
        });
    });

});
