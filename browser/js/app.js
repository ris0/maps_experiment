'use strict';
window.app = angular.module('ZipDrugApp', ['zipAuth', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'MassAutoComplete', 'ngSanitize']);

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
- auto complete with mass autocomplete || multiselect
- google matrix directions feature
- form validation?
- refactor so that we are making 3rd party ajax requests go on the backend
- refactor code and modularize
- write front-end tests

Questions:
- How could I make an AJAX request to Google Maps on the back-end?
- How could I fix my transition so that it can ease in & out better?
- Do I write the code for localStorage on the front or back-end?
- Should I do some form validation?
 */