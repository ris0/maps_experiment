(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('stateErrorHandler', stateErrorHandler);

    stateErrorHandler.$inject = ['$rootScope', '$log', 'logger'];

    function stateErrorHandler($rootScope, $log, logger) {
        var service = {
            errorHandler: errorHandler
        };

        return service;

        function errorHandler () {
            $rootScope.$on('$stateChangeError', function(error) {
                if (error) {
                    $log(error);
                    logger.warning(error);
                }
            })
        }
    }
}());
