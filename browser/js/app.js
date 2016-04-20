'use strict';
window.app = angular.module('ZipDrugApp', ['zipAuth', 'ui.router', 'ui.bootstrap']);

app.config(function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope, AuthService, $state) {

    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) { return; }
        if (AuthService.isAuthenticated()) { return; }
        event.preventDefault();

    });

    // $stateChangeError is an event fired whenever an error occurs while changing states.
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error) {
            console.log(toState);
            console.log(error);
            console.log(fromParams);
        }
    });

    $rootScope._ = window._;

});
