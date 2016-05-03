(function () {
    'use strict';

    angular
        .module('app', [
            'app.logger',
            'app.core',
            'app.map',
            'app.layout',
            'app.localStorage'
        ])

})();

/**
 * @redo:
 * 1) Towards the end of the project, I found out that the Google Maps Geocode API service can return a JSON object.
 *    That said, I would have certainly kept most of my Google Map logic on the back-end if I could do all over.
 *
 * 2) I would like to refactor my code to use more ES6 but I believe that it has drawbacks:
 *      - Not enough support; Babel & Browser can be surprising
 *      - ES6 classes are not hoisted and this could lead to differing opinions about the readability of the code
 *
 * */