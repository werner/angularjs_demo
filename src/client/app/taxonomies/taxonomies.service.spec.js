/* jshint -W117, -W030 */
describe('core TaxonomiesService', function() {

    var $httpFlush;

    beforeEach(function() {
        module('app.core', bard.fakeToastr);
        bard.inject(this, '$httpBackend', '$rootScope', 'TaxonomiesService');
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function() {
        expect(TaxonomiesService).not.to.equal(null);
    });

    describe('when call getTaxonomies', function() {
        it('should return Taxonomies', function() {
            var taxonomies;
            taxonomies = mockData.getMockTaxonomies();
            $httpBackend.when('GET', '/api/taxonomies')
                .respond(200, taxonomies);
            TaxonomiesService.getTaxonomies()
                .then(function(data) {
                    expect(data.length).to.equal(taxonomies.length);
                });
            $httpFlush();
        });

        it('should contain Marital Status', function() {
            var taxonomies;
            taxonomies = mockData.getMockTaxonomies();
            $httpBackend.when('GET', '/api/taxonomies')
                .respond(200, taxonomies);
            TaxonomiesService.getTaxonomies()
                .then(function(data) {
                    var hasMaritalStatus = data.some(function(a) {
                        return a.title.indexOf('Marital Status') >= 0;
                    });
                    expect(hasMaritalStatus).to.be.true;
                });
            $httpFlush();
        });

        it('should return false when connection fails', function() {
            $httpBackend.when('GET', '/api/taxonomies')
                .respond(500, {success: false});
            TaxonomiesService.getTaxonomies()
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.false;
                });
            $httpFlush();
        });
    });

    describe('when call getTaxonomy', function() {
        it('should return taxonomy', function() {
            var taxonomy;
            taxonomy = mockData.getMockTaxonomy();
            $httpBackend.when('GET', '/api/taxonomy/1')
                .respond(200, taxonomy);
            TaxonomiesService.getTaxonomy(1)
                .then(function(data) {
                    expect(data.title).to.equal('test');
                });
            $httpFlush();
        });

        it('should return false when not found', function() {
            $httpBackend.when('GET', '/api/taxonomy/5')
                .respond(404, {success: false});
            TaxonomiesService.getTaxonomy(5)
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.false;
                });
            $httpFlush();
        });
    });

    describe('when call putTaxonomy', function() {
        it('should return success', function() {
            $httpBackend.when('PUT', '/api/taxonomy/2', {id: 2, title: 'Countries'})
                .respond(200, {success: true});
            TaxonomiesService.putTaxonomy(2, {id: 2, title: 'Countries'})
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.true;
                });
            $httpFlush();
        });

        it('should return false when all required data is not provided', function() {
            $httpBackend.when('PUT', '/api/taxonomy/3', {})
                .respond(500, {success: false});
            TaxonomiesService.putTaxonomy(3, {})
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.false;
                });
            $httpFlush();
        });
    });

    describe('when call postTaxonomy', function() {
        it('should return success', function() {
            $httpBackend.when('POST', '/api/taxonomy', {id: 2, title: 'Countries'})
                .respond(200, {success: true});
            TaxonomiesService.postTaxonomy({id: 2, title: 'Countries'})
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.true;
                });
            $httpFlush();
        });

        it('should return false when not found', function() {
            $httpBackend.when('POST', '/api/taxonomy', {id: 3, title: 'Countries'})
                .respond(404, {success: false});
            TaxonomiesService.postTaxonomy({id: 3, title: 'Countries'})
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.false;
                });
            $httpFlush();
        });
    });

    describe('when call deleteTaxonomy', function() {
        it('should return success', function() {
            $httpBackend.when('DELETE', '/api/taxonomy/2')
                .respond(200, {success: true});

            TaxonomiesService.deleteTaxonomy(2)
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.true;
                });
            $httpFlush();
        });

        it('should return false when not found', function() {
            $httpBackend.when('DELETE', '/api/taxonomy/3')
                .respond(404, {success: false});

            TaxonomiesService.deleteTaxonomy(3)
                .then(function(data) {
                    expect(data).to.have.property('success')
                                .and.to.be.false;
                });
            $httpFlush();
        });
    });
});
