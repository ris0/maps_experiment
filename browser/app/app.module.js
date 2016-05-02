(function () {
    'use strict';

    angular
        .module('app', [
            'app.logger',
            'app.core',
            'app.map',
            'app.layout'
        ])

})();

/**
 * @redo:
 * 1) Towards the end of the project, I learned that the Google Maps Geocode API service can return a JSON object.
 *    That said, I would have certainly kept most of my Google Map logic on the back-end if I could do this project
 *    over again.
 * 2) googleMapsService could have been broken down more
 * 3) I would like to refactor my code to use more ES6
 *    There are drawbacks with ES6 on the browser:
 *      - Not enough support; Babel & Browser can be surprising
 *      - ES6 classes are not hoisted and this could lead to differing opinions about code readability
 *
 * */