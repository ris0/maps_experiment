(function () {
    'use strict';

    angular
        .module('app.layout', [
            'ui.bootstrap', 'ui.router',
            'ngAnimate', 'ngSanitize',
            'MassAutoComplete'
        ])
        .run(runBlock);

        runBlock.$inject = ['stateErrorHandler'];

        function runBlock() {
            stateErrorHandler.errorHandler();
        }

})();

