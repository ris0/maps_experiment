(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    function LayoutController (getZipCodes) {
        var vm = this;
        vm.getZipCodes = getZipCodes;

    }

})();