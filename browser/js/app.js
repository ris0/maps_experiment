'use strict';
window.app = angular.module('ZipDrugApp', ['zipAuth', 'snap', 'ui.router', 'ui.bootstrap']);

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
1) Implement Navbar
2) Take Zipdrug's styling and apply to your application
3) Possibly take the footer as well.

4) ng-model the input fields in the sidebar
5) dynamically submit n amount of zipcodes and plot them on the field.
6) auto complete with google places

7) mvp check
8) google matrix directions feature
9) make responsive

10) write front-end tests
11) refactor code and modularize

 */