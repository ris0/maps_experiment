(() => {
    'use strict';

    /** @desc Services: act as a constructor function and are instantiated with the new keyword. Use this for public methods and variables*/
    angular
        .module('ZipDrugApp')
        .service('GoogleMapService', GoogleMapService);

    function GoogleMapService () {
        this.initMap = () => {}
    }



})();

(() => {
    /** @important
     * Refactor logic for making data operations and interacting with data to a factory.
     * Make data services responsible for XHR calls, local storage, stashing in memory, or any other data operations.
     * Use $inject to manually identify your dependencies for Angular components.
     * Why?: This technique mirrors the technique used by ng-annotate,
         * which I recommend for automating the creation of minification safe dependencies.
         * If ng-annotate detects injection has already been made, it will not duplicate it.
     * Why?: This safeguards your dependencies from being vulnerable to minification issues when parameters may be mangled.
        * For example, common and dataservice may become a or b and not be found by Angular.
     * Why?: Avoid creating in-line dependencies as long lists can be difficult to read in the array.
        * Also it can be confusing that the array is a series of strings while the last item is the component's function.
     * */
    DashboardController.$inject = ['$http'];

    function HomeFactory ($http) {
        let factory = {
            snapper: snapper,
            getZipCodes: getZipCodes
        };

        return factory;

        function snapper () {
            return new Snap({ element: document.getElementById('content') }); // DOM manipulating?
        }

        function getZipCodes () {
            return $http.get('/api/map/zip').then(response => response.data);
        }

    }

    angular
        .module('ZipDrugApp')
        .factory('HomeFactory', HomeFactory);

})();
//
//**
//* recommended
//* Using function declarations
//* and accessible members up top.
//*/
//function dataservice($http, $location, $q, exception, logger) {
//    var isPrimed = false;
//    var primePromise;
//
//    var service = {
//        getAvengersCast: getAvengersCast,
//        getAvengerCount: getAvengerCount,
//        getAvengers: getAvengers,
//        ready: ready
//    };
//
//    return service;
//
//    ////////////
//
//    function getAvengers() {
//        // implementation details go here
//    }
//
//    function getAvengerCount() {
//        // implementation details go here
//    }
//
//    function getAvengersCast() {
//        // implementation details go here
//    }
//
//    function prime() {
//        // implementation details go here
//    }
//
//    function ready(nextPromises) {
//        // implementation details go here
//    }
//}



//Services: act as a constructor function and are instantiated with the new keyword. Use this for public methods and variables
//
//function SomeService () {
//    this.someMethod = function () {
//
//    };
//}
//angular
//    .module('app')
//    .service('SomeService', SomeService);

// think about using directives for DOM manipulating. We're doing a lot of that here.
//recommended
//function dragUpload () {
//    return {
//        controllerAs: 'vm',
//        controller: function () {
//
//        }
//    };
//}
//angular
//    .module('app')
//    .directive('dragUpload', dragUpload);

//Factory: Business logic or provider modules, return an Object or closure
//
//Always return a host Object instead of the revealing Module pattern due to the way Object references are bound and updated
//
//function AnotherService () {
//    var AnotherService = {};
//    AnotherService.someValue = '';
//    AnotherService.someMethod = function () {
//
//    };
//    return AnotherService;
//}
//angular
//    .module('app')
//    .factory('AnotherService', AnotherService);
//Why? : Primitive values cannot update alone using the revealing module pattern

//app.factory('HomeFactory', function ($http) {
//
//    var HomeFactory = {},
//        map, layer, infoWindow, acOrigin, acDestination, directionsService, directionsDisplay;
//
//    HomeFactory.snapper = function () {
//        return new Snap({
//            element: document.getElementById('content')
//        });
//    };
//
//    HomeFactory.initMap = function () {
//
//
//        //var originInput= document.getElementById('origin-input');
//        //var destinationInput= document.getElementById('destination-input');
//        var newYork = { lat: 40.730610, lng: -73.935242 };
//        var mapOptions = {
//            center: newYork,
//            zoom: 12,
//            mapTypeControl: false,
//            disableDefaultUI: false
//        };
//
//        map = new google.maps.Map(document.getElementById("map"), mapOptions);
//        layer = new google.maps.FusionTablesLayer();
//        infoWindow = new google.maps.InfoWindow();
//
//        var origin_place_id = null;
//        var destination_place_id = null;
//        var travel_mode = google.maps.TravelMode.BICYCLING;
//        var directionsService = new google.maps.DirectionsService;
//        var directionsDisplay = new google.maps.DirectionsRenderer;
//        directionsDisplay.setMap(map);
//        directionsDisplay.setPanel(document.getElementById('right-panel'));
//
//        var origin_input = document.getElementById('origin-input');
//        var destination_input = document.getElementById('destination-input');
//        var modes = document.getElementById('mode-selector');
//
//        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
//        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
//        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);
//
//        var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
//        origin_autocomplete.bindTo('bounds', map);
//        var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
//        destination_autocomplete.bindTo('bounds', map);
//
//
//        function getDetails() {
//            if (!localStorage.mapCenter.lat || !localStorage.mapCenter.lng) {
//                return false;
//            }
//            var mapCenter = JSON.parse(localStorage.mapCenter);
//            var mapZoom = JSON.parse(localStorage.mapZoom);
//            var center = new google.maps.LatLng(mapCenter.lat,mapCenter.lng);
//            console.log('inside the function');
//            map.setCenter(center);
//            map.setZoom(mapZoom);
//        }
//
//        function saveMap() {
//            var center = map.getCenter();
//            var zoom = map.getZoom();
//
//            localStorage.mapCenter = JSON.stringify(center);
//            localStorage.mapZoom = zoom;
//        }
//
//        google.maps.event.addListener(map, 'click', function() {
//            console.log("click");
//            console.log("click");
//            saveMap();
//        });
//
//        getDetails();
//
//        // Sets a listener on a radio button to change the filter type on Places Autocomplete.
//        function setupClickListener(id, mode) {
//            var radioButton = document.getElementById(id);
//            radioButton.addEventListener('click', function() {
//                travel_mode = mode;
//            });
//        }
//        setupClickListener('changemode-bicycling', google.maps.TravelMode.BICYCLING);
//        setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
//        setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);
//
//        function expandViewportToFitPlace(map, place) {
//            if (place.geometry.viewport) {
//                map.fitBounds(place.geometry.viewport);
//            } else {
//                map.setCenter(place.geometry.location);
//                map.setZoom(17);
//            }
//        }
//
//        origin_autocomplete.addListener('place_changed', function() {
//            var place = origin_autocomplete.getPlace();
//            if (!place.geometry) {
//                window.alert("Autocomplete's returned place contains no geometry");
//                return;
//            }
//            expandViewportToFitPlace(map, place);
//
//            // If the place has a geometry, store its place ID and route if we have
//            // the other place ID
//            origin_place_id = place.place_id;
//            route(origin_place_id, destination_place_id, travel_mode,
//                directionsService, directionsDisplay);
//        });
//
//        destination_autocomplete.addListener('place_changed', function() {
//            var place = destination_autocomplete.getPlace();
//            if (!place.geometry) {
//                window.alert("Returned place contains no geometry");
//                return;
//            }
//            expandViewportToFitPlace(map, place);
//
//            // If the place has a geometry, store its place ID and route if we have
//            // the other place ID
//            destination_place_id = place.place_id;
//            route(origin_place_id, destination_place_id, travel_mode,
//                directionsService, directionsDisplay);
//        });
//
//        function route(origin_place_id, destination_place_id, travel_mode,
//                       directionsService, directionsDisplay) {
//            if (!origin_place_id || !destination_place_id) {
//                return;
//            }
//            directionsService.route({
//                origin: {'placeId': origin_place_id},
//                destination: {'placeId': destination_place_id},
//                travelMode: travel_mode,
//                optimizeWaypoints: true
//            }, function(response, status) {
//                if (status === google.maps.DirectionsStatus.OK) {
//                    console.log(response.routes);
//                    directionsDisplay.setDirections(response);
//                    directionsDisplay.setPanel(document.getElementById('right-panel'));
//                } else {
//                    window.alert('Directions request failed due to ' + status);
//                }
//            });
//        }
//
//
//
//
//
//    };
//
//
//
//    HomeFactory.getZipCodes = function () {
//        return $http.get('/api/map/zip').then(response => response.data)
//    };
//
//    HomeFactory.drawZipCodes = function (zipCodes) {
//        var queryInput = "(" + zipCodes + ")";
//
//        layer.setOptions({
//            query: {
//                select: 'Geometry',
//                from: '1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw',
//                where: " ZIP IN " + queryInput
//            },
//            styles: [{
//                polygonOptions: {
//                    fillColor: '#1473ca',
//                    fillOpacity: 0.3
//                }
//            }],
//            map: map
//        });
//    };
//
//    return HomeFactory;
//
//});
