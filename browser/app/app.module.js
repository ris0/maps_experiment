(function () {
    'use strict';

    angular
        .module('ZipDrugApp', [
        'ui.bootstrap', 'ngAnimate',
        'ngSanitize', 'MassAutoComplete',
        'ui.router'
        ])
        .run(function ($rootScope) {
            /** @desc $stateChangeError is an event fired whenever an error occurs while changing state. */
            let stateErrorHandler = error => {
                if (error) { console.log(error); }
                $rootScope.$on('$stateChangeError', stateErrorHandler);
            }
        });
})();

