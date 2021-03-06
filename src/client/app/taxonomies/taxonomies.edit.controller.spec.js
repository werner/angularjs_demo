/* jshint -W117, -W030 */
describe('TaxonomiesEditController', function() {
    var controller;
    var taxonomies = mockData.getMockTaxonomies();
    var taxonomy = mockData.getMockTaxonomy();

    beforeEach(function() {
        bard.appModule('app.taxonomies');
        bard.inject('$controller', '$log', '$q', '$rootScope',
            '$state', '$location', 'TaxonomiesService', '$httpBackend');
    });

    beforeEach(function() {
        sinon.stub(TaxonomiesService, 'getTaxonomies').returns($q.when(taxonomies));
        sinon.stub(TaxonomiesService, 'getTaxonomy').returns($q.when(taxonomy));
        sinon.stub(TaxonomiesService, 'putTaxonomy').returns($q.when($location.path('taxonomies')));
        controller = $controller('TaxonomiesEditController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Taxonomies Edit Controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should have title of Dashboard', function () {
            expect(controller.title).to.equal('Edit Taxonomy');
        });

        it('should send data to update Taxonomies', function() {
            controller.update(taxonomy.id, taxonomy).then(function(response) {
                expect(response.path()).to.equal('/taxonomies');
            });
        });
    });

});
