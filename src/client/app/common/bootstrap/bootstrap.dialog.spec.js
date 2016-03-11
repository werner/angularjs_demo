/* jshint -W117, -W030 */
describe('modalDialog', function() {
    var modalInstanceController;
    var modalInstance;
    var scope;

    beforeEach(function() {
        bard.appModule('app.common.bootstrap');
        bard.inject(this, '$q', '$controller', '$rootScope',
            'bootstrap.dialog', '$uibModal', '$templateCache');
    });

    beforeEach(function() {
        sinon.spy($uibModal, 'open');
        scope = $rootScope.$new();
        modalInstance = {
            close: sinon.spy(),
            dismiss: sinon.spy(),
            result: {
                then: sinon.spy()
            }
        };
        modalInstanceController = $controller('ModalInstance', {
            $scope: scope,
            $uibModalInstance: modalInstance,
            options: {
                title: 'Test title',
                message: 'Test message',
                okText: 'Ok',
                cancelText: 'Cancel'
            }
        });
        $rootScope.$apply();
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

        it('should call ok action on dialog', function() {
            scope.ok();
            expect(modalInstance.close).to.have
                .been.called;
        });

        it('should call cancel action on dialog', function() {
            scope.cancel();
            expect(modalInstance.dismiss).to.have
                .been.called;
        });
    });
});
