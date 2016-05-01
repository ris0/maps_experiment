(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('navbar', navbar);

    function navbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/layout/navbar.html'
        };
        return directive;
    }

})();


