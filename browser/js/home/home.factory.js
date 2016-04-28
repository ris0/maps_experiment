app.factory('HomeFactory', function () {

    var HomeFactory = {};
    var map, layer, newLayer;

    HomeFactory.snapper = function () {
        var snapper = new Snap({
            element: document.getElementById('content')
        });
        return snapper;
    };

    HomeFactory.initMap = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.730610, lng: -73.935242 },
            zoom: 12
        });
    };

    HomeFactory.drawZipCodes = function (zipCodes) {
        var input = "(" + zipCodes + ")";

        var layer = new google.maps.FusionTablesLayer({
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
            suppressInfoWindows: true
        });
        layer.setMap(map);
    };

    return HomeFactory;

});
