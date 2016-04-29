app.factory('HomeFactory', function ($http) {

    var HomeFactory = {},
        cacheSearch = [],
        map, layer, input, infoWindow;

    HomeFactory.snapper = function () {
        return new Snap({
            element: document.getElementById('content')
        });
    };

    HomeFactory.initMap = function () {
        input = document.getElementById('zip-input');
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.730610, lng: -73.935242 },
            zoom: 12
        });

        layer = new google.maps.FusionTablesLayer();
        infoWindow = new google.maps.InfoWindow();
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

    return HomeFactory;

});
