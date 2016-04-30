app.factory('HomeFactory', function ($http) {

    var HomeFactory = {},
        cacheSearch = [],
        map, layer, input, infoWindow, autocomplete;

    HomeFactory.snapper = function () {
        return new Snap({
            element: document.getElementById('content')
        });
    };

    HomeFactory.initMap = function () {
        input = document.getElementById('directionInput');
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.730610, lng: -73.935242 },
            zoom: 12
        });

        layer = new google.maps.FusionTablesLayer();
        infoWindow = new google.maps.InfoWindow();
        autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
    };

    HomeFactory.getZipCodes = function () {
        return $http.get('/api/map/zip').then(response => response.data)
    };

    HomeFactory.drawZipCodes = function (zipCodes) {
        var queryInput = "(" + zipCodes + ")";

        layer.setOptions({
            query: {
                select: 'Geometry',
                from: '1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw',
                where: " ZIP IN " + queryInput
            },
            styles: [{
                polygonOptions: {
                    fillColor: '#00FF00',
                    fillOpacity: 0.3
                }
            }],
            map: map
        });
    };

    HomeFactory.getDirections = function () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            directionsService.route({
                origin: document.getElementById('start').value,
                destination: document.getElementById('end').value,
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    };

    return HomeFactory;

});
