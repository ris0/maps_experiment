(function () {
    'use strict';

    angular
        .module('app.map')
        .factory('googleMapService', googleMapService);


    function googleMapService ($http, logger) {
        var service = {
            getZipCodes  : getZipCodes,
            initMap      : initMap,
            drawZipCodes : drawZipCodes
        };

        return service;

        var map = null;
        var layer = null;
        function initMap () {
            var nyc = { lat: 40.730610, lng: -73.935242 };
            var mapOptions = {
                center: nyc,
                zoom: 12,
                mapTypeControl: false,
                disableDefaultUI: false
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            layer = new google.maps.FusionTablesLayer();
            var origin_place_id = null;
            var destination_place_id = null;
            var travel_mode = google.maps.TravelMode.BICYCLING;
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('right-panel'));

            var origin_input = document.getElementById('origin-input');
            var destination_input = document.getElementById('destination-input');

            var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
            origin_autocomplete.bindTo('bounds', map);
            var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
            destination_autocomplete.bindTo('bounds', map);

            function setupClickListener(id, mode) {
                var radioButton = document.getElementById(id);
                radioButton.addEventListener('click', function() {
                    travel_mode = mode;
                });
            }
            setupClickListener('changemode-bicycling', google.maps.TravelMode.BICYCLING);
            setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
            setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);

            function expandViewportToFitPlace(map, place) {
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
            }

            origin_autocomplete.addListener('place_changed', function() {
                var place = origin_autocomplete.getPlace();
                if (!place.geometry) {
                    logger.log("Autocomplete's returned place contains no geometry");
                    return;
                }
                expandViewportToFitPlace(map, place);

                origin_place_id = place.place_id;
                route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
            });


            destination_autocomplete.addListener('place_changed', function() {
                var place = destination_autocomplete.getPlace();
                if (!place.geometry) { logger.log("Returned place contains no geometry"); }

                expandViewportToFitPlace(map, place);
                destination_place_id = place.place_id;
                route( origin_place_id, destination_place_id, travel_mode,directionsService, directionsDisplay );
            });


            function route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay) {
                if (!origin_place_id || !destination_place_id) { return; }
                directionsService.route({
                    origin: {'placeId': origin_place_id},
                    destination: {'placeId': destination_place_id},
                    travelMode: travel_mode,
                    optimizeWaypoints: true
                }, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setPanel(document.getElementById('right-panel'));
                    } else {
                        logger.error(status);
                    }
                });
            }
        }







        function getZipCodes () {
            return $http.get('/api/map/zip')
                .then(function(response) {

                    return response.data;
                })
                .catch(function(error) {
                    logger.error('XHR request failed', error);
                });
        }

        function drawZipCodes (zipCodes) {
            var queryInput = "(" + zipCodes + ")";

            var query = {
                select: 'Geometry',
                from: '1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw',
                where: " ZIP IN " + queryInput
            };

            var styles = [{
                polygonOptions: { fillColor: '#1473ca', fillOpacity: 0.3 }
            }];

            var layerObject = {
                map: map,
                query: query,
                styles: styles
            };

            layer.setOptions(layerObject);
        }

    }

})();
