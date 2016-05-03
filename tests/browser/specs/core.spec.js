/* jshint -W117, -W030 */
describe('core', function () {
    describe('route', function () {
        var controller;

        beforeEach(function() {
            module('app.core', specHelper.fakeLogger);
            specHelper.injector(function($httpBackend, $location, $rootScope, $route) {});
            $httpBackend.expectGET('app/core/core.html').respond(200);
        });

        it('should map / route to core View template', function () {
            expect($route.routes['/'].templateUrl).
            to.equal('app/core/core.html');
        });

        it('should route / to the core View', function () {
            $location.path('/');
            $rootScope.$apply();
            expect($route.current.templateUrl).to.equal('app/core/core.html');
        });
    });
});