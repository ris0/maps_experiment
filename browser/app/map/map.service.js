(function () {
    'use strict';

    angular
        .module('app.map')
        .factory('googleMapService', googleMapService);

    googleMapService.$inject = ['$http', 'logger', 'localStorageService'];

    function googleMapService ($http, logger, localStorageService) {
        var service = {
            getZipCodes  : getZipCodes,
            initMap      : initMap,
            drawZipCodes : drawZipCodes,
            clearZipCodes: clearZipCodes
        };

        return service;

        //////////////////////////////////////////////////////////////////////

        /** @desc GoogleMap Constructor Function */
        function GoogleMap() {

            /** @desc Initial Configuration */
            this.mapConfig = {
                center: { lat: 40.730610, lng: -73.935242 },
                zoom: 11,
                mapTypeControl: false,
                disableDefaultUI: false
            };

            /** @desc HTML components */
            this.map_id = document.getElementById('map');
            this.right_panel = document.getElementById('right-panel');
            this.origin_input = document.getElementById('origin-input');
            this.destination_input = document.getElementById('destination-input');

            /** @desc Insantiate Google Maps, Directions, Places, and Fusion Tables*/
            this.map = new google.maps.Map(this.map_id, this.mapConfig);
            this.layer = new google.maps.FusionTablesLayer();
            this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.origin_autocomplete = new google.maps.places.Autocomplete(this.origin_input);
            this.destination_autocomplete = new google.maps.places.Autocomplete(this.destination_input);

            /** @desc Fusion Table Query, Layer Style, Layer Object, newConfig */
            this.query = null;
            this.styles = null;
            this.layerObject = null;

            /** @desc Bind services to map */
            this.origin_autocomplete.bindTo('bounds', this.map);
            this.destination_autocomplete.bindTo('bounds', this.map);
            this.travel_mode = google.maps.TravelMode.BICYCLING;
            this.origin_place_id = null;
            this.destination_place_id = null;

            /** @desc Event listener Constructor fn and Directions & Route route */
            this.setClickListener = setClickListener;
            this.getRoute = getRoute;

            //////////////////////////////////////////////////////////////////////

            function setClickListener(id, mode) {
                var radioButton = document.getElementById(id);
                radioButton.addEventListener('click', () => {
                    this.travel_mode = mode;
                })
            }

            /** @desc Once the user selects location, change viewport/location */
            this.expandViewportToFitPlace = function (map, place) {
                if (place.geometry.viewport) {
                    this.map.fitBounds(place.geometry.viewport);
                } else {
                    this.map.setCenter(place.geometry.location);
                    this.map.setZoom(17);
                }
            };

            /** @return directions & route */
            function getRoute(origin, destination, travel_mode, directionsService, directionsDisplay) {
                if (!origin || !destination) { return; }
                var right_panel = document.getElementById('right-panel');

                var config = {
                    origin: { 'placeId': origin },
                    destination: {'placeId': destination},
                    travelMode: travel_mode,
                    optimizeWaypoints: true
                };
                directionsService.route(config, getRouteCb);

                /** @desc getRouteCb definition */
                function getRouteCb(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setPanel(right_panel);
                    } else {
                        logger.error(status);
                    }
                }
            }

        }

        /**
         * @name initMap
         * @desc Instantiate GoogleMap(): set map, panel, and event listeners.
         * */
        function initMap () {
            var gmap = new GoogleMap();

            if (localStorageService.checkPrevMap()) { restorePreviousMap(); }
            if (localStorageService.checkPrevLayer()) { restorePreviousLayer(); }

            gmap.directionsDisplay.setMap(gmap.map);
            gmap.directionsDisplay.setPanel(gmap.right_panel);

            gmap.setClickListener('changemode-bicycling', google.maps.TravelMode.BICYCLING);
            gmap.setClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
            gmap.setClickListener('changemode-driving', google.maps.TravelMode.DRIVING);

            gmap.map.addListener('bounds_changed', localStorageEventCallBack);
            gmap.origin_autocomplete.addListener('place_changed', originCallBack);
            gmap.destination_autocomplete.addListener('place_changed', destinationCallBack);

            //////////////////////////////////////////////////////////////////////

            function restorePreviousMap () {
                var lat = Number(localStorageService.loadConfig('lat')),
                    lng = Number(localStorageService.loadConfig('lng')),
                    zoom = Number(localStorageService.loadConfig('zoom'));

                gmap.map.setZoom(zoom);
                gmap.map.setCenter({ lat: lat, lng: lng })
            }

            function restorePreviousLayer () {
                var select = localStorageService.loadConfig('query.select'),
                    from = localStorageService.loadConfig('query.from'),
                    where = localStorageService.loadConfig('query.where');

                var query = {
                    select: select,
                    from: from,
                    where: where
                };

                var layerObject = {
                    map : gmap.map,
                    query : query,
                    styles: gmap.styles
                };
                gmap.layer.setOptions(layerObject);
            }

            function localStorageEventCallBack () {
                var bounds = gmap.map.getBounds().getCenter(),
                    lat = bounds.lat(),
                    lng = bounds.lng(),
                    zoom = gmap.map.getZoom();

                localStorageService.saveConfig('lat', lat);
                localStorageService.saveConfig('lng', lng);
                localStorageService.saveConfig('zoom', zoom);
            }

            function originCallBack() {
                var place = gmap.origin_autocomplete.getPlace();

                if (!place.geometry) { logger.log("Returned place contains no geometry"); }

                gmap.expandViewportToFitPlace(gmap.map, place);
                gmap.origin_place_id = place.place_id;
                gmap.getRoute( gmap.origin_place_id, gmap.destination_place_id,
                            gmap.travel_mode, gmap.directionsService, gmap.directionsDisplay );

            }

            function destinationCallBack() {
                var place = gmap.destination_autocomplete.getPlace();

                if (!place.geometry) { logger.log("Returned place contains no geometry"); }

                gmap.expandViewportToFitPlace(gmap.map, place);
                gmap.destination_place_id = place.place_id;
                gmap.getRoute( gmap.origin_place_id, gmap.destination_place_id,
                               gmap.travel_mode, gmap.directionsService, gmap.directionsDisplay );
            }
        }

        /**
         * @desc drawZipCodes: Assigns new value to google.maps.FusionTableLayer || this.layer
         * @desc clearZipCodes: clear existing layer(s)
         * */

        function drawZipCodes (zipCodes) {
            var gmap = new GoogleMap();
            var queryInput = "(" + zipCodes + ")";

            gmap.query = {
                select: 'Geometry',
                from: '1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw',
                where: " ZIP IN " + queryInput
            };

            gmap.styles = [{
                polygonOptions: { fillColor: '#1473ca', fillOpacity: 0.3 }
            }];

            gmap.layerObject = {
                map: gmap.map,
                query: gmap.query,
                styles: gmap.styles
            };

            localStorageService.saveConfig('query.select', gmap.query.select);
            localStorageService.saveConfig('query.from', gmap.query.from);
            localStorageService.saveConfig('query.where', gmap.query.where);

            gmap.layer.setOptions(gmap.layerObject)

        }

        function clearZipCodes () {
            var gmap = new GoogleMap();
            gmap.layer.setOptions({ map: gmap.map });
        }

        /**
         * @desc getZipCodes: get request to back-end to get an array of all the zip codes in NYC
         * @other
         * Initially, I was making AJAX requests via Express to a 3rd party but it was slow.
         * That said, I thought it would be more clever to store the zip codes in a JSON.
         * Parse through that object and filter for NY zip codes, then send it as an array
         * */
        function getZipCodes () {
            return $http.get('/api/map/zip')
                .then(response => response.data)
                .catch(error => logger.error(error));
        }
    }
})();