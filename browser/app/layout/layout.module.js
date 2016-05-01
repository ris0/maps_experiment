(function () {
    'use strict';

    angular
        .module('app.layout', [
            /** @desc Angular Modules */
            'ui.bootstrap', 'ui.router',
            'ngAnimate', 'ngSanitize',

            /** @desc 3rd party Modules*/
            'MassAutoComplete', 'snap',

            /** @desc Cross app modules*/
            'app.logger'
        ])
        .run(runBlock);

        runBlock.$inject = ['stateErrorHandler'];

        function runBlock() {
            stateErrorHandler.errorHandler();
        }

})();

