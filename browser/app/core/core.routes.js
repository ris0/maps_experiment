(function () {
    'use strict';

    angular
        .module('app.core')
        .config(stateConfig)
        .run(errorHandler);

    function stateConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('core', {
            url: '/',
            templateUrl: 'app/core/core.html',
            controller: 'CoreController',
            controllerAs: 'vm',
            resolve: {
                getZipCodes : getZipCodes
            }
        })
    }

    function getZipCodes(googleMapService) {
        return googleMapService.getZipCodes();
    }

    function errorHandler($rootScope, logger) {
        $rootScope.$on('$stateChangeError', function (error) {
            if (error) { logger.error('Error while changing states', error); }
        })
    }

})();
