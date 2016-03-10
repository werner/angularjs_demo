/* jshint -W117, -W030 */
describe('modalDialog', function() {

    beforeEach(function() {
        bard.appModule('app.common.bootstrap');
        bard.inject(this, '$q', 'bootstrap.dialog', '$uibModal', '$templateCache');
    });

    beforeEach(function() {
        sinon.spy($uibModal, 'open');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Modal Dialog', function() {
        it('should be created successfully', function () {
            expect(dialog).to.be.defined;
        });

        it('should call confirmation dialog', function() {
            dialog.confirmationDialog('Test', 'a message', 'Accept', 'Cancel');
            expect($uibModal.open).to.have
                .been.called;
        });

        it('should call delete dialog', function() {
            dialog.deleteDialog('Test');
            expect($uibModal.open).to.have
                .been.called;
        });
    });
});
