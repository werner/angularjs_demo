/* jshint -W117, -W030 */
describe('TaxonomiesController', function() {
    var controller;
    var taxonomies = mockData.getMockTaxonomies();

    beforeEach(function() {
        bard.appModule('app.taxonomies');
        bard.appModule('app.common.bootstrap');
        bard.inject('$controller', '$log', '$q', '$rootScope',
            'TaxonomiesService', 'bootstrap.dialog');
    });

    beforeEach(function() {
        sinon.stub(TaxonomiesService, 'getTaxonomies').returns($q.when(taxonomies));
        sinon.stub(TaxonomiesService, 'deleteTaxonomy').returns($q.when(taxonomies));
        bard.mockService(dialog, {
            deleteDialog: $q.when(taxonomies),
            _default:     $q.when([])
        });
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

        it('should show delete message box', function () {
            controller.deleteTaxonomy(2);
            expect(dialog.deleteDialog).to.have
                .been.called.once;
        });
    });

});
