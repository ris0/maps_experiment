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
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!destinationStateRequiresAuth(toState)) { return; }
        if (AuthService.isAuthenticated()) { return; }
        event.preventDefault();
    });

    // $stateChangeError is an event fired whenever an error occurs while changing states.
    $rootScope.$on('$stateChangeError', function(error, fromParams) {
        if (error) {
            console.log('This error occurred while changing states', error);
            console.log('from params:', fromParams);
        }
    });

    $rootScope._ = window._;

});

/*

TODO:
- auto complete with google places
- google matrix directions feature
- form validation
- refactor so that we are making 3rd party ajax requests go on the backend
- mvp check
- write front-end tests
- refactor code and modularize

 */