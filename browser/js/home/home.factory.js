app.factory('HomeFactory', function () {

    var HomeFactory = {};

    HomeFactory.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.730610, lng: -73.935242 },
            zoom: 12
        });

        var layer = new google.maps.FusionTablesLayer({

            query: {
                select: 'Geometry',
                from: '1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw',
                where: " ZIP IN (11361,10003,10001,10022,10021,11365, 10012, 10056 ) "

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
