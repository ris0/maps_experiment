(function () {
    'use strict';

    angular
        .module('app.core')
        .config(stateConfig)
        .run(errorHandler);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    getZipCodes.$inject = ['googleMapService'];
    errorHandler.$inject = ['$rootScope', 'logger'];

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

    /** @desc: Ping the back-end for a JSON object that will be converted into an array of NYC zip codes */
    function getZipCodes(googleMapService) {
        return googleMapService.getZipCodes();
    }

    /** @desc: $stateChangeError handler */
    function errorHandler($rootScope, logger) {
        $rootScope.$on('$stateChangeError', function (error, event) {
            if (error) { logger.error('Error while changing states', error); }
            if (event) { logger.error('The event that caused the error', event); }
        })
    }

})();
