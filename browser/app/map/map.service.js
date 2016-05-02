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

        //////////////////////////////

        function getZipCodes () {
            return $http.get('/api/map/zip')
                .then(response => response.data)
                .catch(error => logger.error(error));
        }

        /** @desc GoogleMap Constrcutor Function */
        function GoogleMap(latLng) {

            /** @desc Configuration */
            var nyc = { lat: 40.730610, lng: -73.935242 };
            this.mapOptions = {
                center: latLng || nyc,
                zoom: 12,
                mapTypeControl: false,
                disableDefaultUI: false
            };

            this.map_id = document.getElementById('map');
            this.right_panel = document.getElementById('right-panel');
            this.origin_input = document.getElementById('origin-input');
            this.destination_input = document.getElementById('destination-input');

            /** @desc Insantiate Google Maps, Directions, Places, and Fusion Tables*/
            this.map = new google.maps.Map(this.map_id, this.mapOptions);
            this.layer = new google.maps.FusionTablesLayer();
            this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.origin_autocomplete = new google.maps.places.Autocomplete(this.origin_input);
            this.destination_autocomplete = new google.maps.places.Autocomplete(this.destination_input);

            /** @desc Bind services to map */
            this.origin_autocomplete.bindTo('bounds', this.map);
            this.destination_autocomplete.bindTo('bounds', this.map);
            this.travel_mode = google.maps.TravelMode.BICYCLING;
            this.origin_place_id = null;
            this.destination_place_id = null;

            /** @desc Event listener Constructor fn and Directions & Route route */
            this.setClickListener = setClickListener;
            this.getRoute = getRoute;

            //////////////////////////////

            function setClickListener(id, mode) {
                var radioButton = document.getElementById(id);
                radioButton.addEventListener('click', () => { this.travel_mode = mode })
            }

            this.expandViewportToFitPlace = function (map, place) {
                if (place.geometry.viewport) {
                    this.map.fitBounds(place.geometry.viewport);
                } else {
                    this.map.setCenter(place.geometry.location);
                    this.map.setZoom(17);
                }
            };

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

        function initMap () {
            var gmap = new GoogleMap();

            gmap.directionsDisplay.setMap(gmap.map);
            gmap.directionsDisplay.setPanel(gmap.right_panel);

            gmap.setClickListener('changemode-bicycling', google.maps.TravelMode.BICYCLING);
            gmap.setClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
            gmap.setClickListener('changemode-driving', google.maps.TravelMode.DRIVING);

            gmap.destination_autocomplete.addListener('place_changed', destinationCallBack);
            gmap.origin_autocomplete.addListener('place_changed', originCallBack);
            //placeMarker(event.latLng);

            /** @desc: localStorage * */
            gmap.map.addListener(gmap.map, 'center_changed', (event) => {
                console.log(event);
                writeToStorage(event.latLng);
            });
            setupStorage();
            readFromStorage();

            function setupStorage() {
                localStorage.locations = [];
                //return (!localStorage.locations) ? [] : localStorage.location;
            }

            function writeToStorage(location) {
                localStorage.locations.push(location);
            }

            function readFromStorage() {
                console.log(typeof localStorage.locations);
                //localStorage.locations.forEach(location => { placeMarker(location) });
            }

            //Funcion to place the marker on the map (flag)
            //function placeMarker(location) {
            //    var marker = new google.maps.Marker({
            //        position: location,
            //        icon:'flag.png',
            //        map: map
            //    });
            //    //open information window once marker is placed
            //    var infowindow = new google.maps.InfoWindow({
            //        content: 'User has placed warning'
            //    });
            //    infowindow.open(map,marker);
            //
            //    //zoom into the marker
            //    google.maps.event.addListener(marker,'click',function() {
            //        map.setZoom(17);
            //        map.setCenter(marker.getPosition());
            //    });
            //
            //}

            //////////////////////////////

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

        function drawZipCodes (zipCodes) {
            var gmap = new GoogleMap();
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
                map: gmap.map,
                query: query,
                styles: styles
            };

            gmap.layer.setOptions(layerObject);
        }



    }

})();




