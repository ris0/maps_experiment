(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('navbar', navbar);

    function navbar() {
        var directive = {
            restrict: 'E',
            templateUrl: '/navbar/navbar.html'
        };
        return directive;
    }

})();


