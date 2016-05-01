(function() {
    'use strict';

    angular
        .module('app.layout')
        .config(config);

    config.$inject = ['$stateProvider', 'mapService'];

    function config ($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm',
            resolve: {
                getZipCodes: getZipCodes
            }
        });
    }

    function getZipCodes(mapService) {
        return mapService.getZipCodes();
    }
})();


