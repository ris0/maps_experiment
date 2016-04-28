app.factory('HomeFactory', function () {

    var HomeFactory = {};
    var map, layer, newLayer;

    HomeFactory.snapper = function () {
        return new Snap({
            element: document.getElementById('content')
        });
    };

    HomeFactory.initMap = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.730610, lng: -73.935242 },
            zoom: 12
        });
        layer = new google.maps.FusionTablesLayer();
    };

    HomeFactory.drawZipCodes = function (zipCodes) {
        var input = "(" + zipCodes + ")";

        layer.setOptions({
            query: {
                select: 'Geometry',
                from: '1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw',
                where: " ZIP IN " + input

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
