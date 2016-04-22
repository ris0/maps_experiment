app.factory('HomeFactory', function ($http) {

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
                where: 'ZIP = 11361'
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

    //HomeFactory.findZip = function () {
    //    var layer = new google.maps.FusionTablesLayer({
    //        query: {
    //            select: 'Geometry',
    //            from: '1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw',
    //            where: 'ZIP = 11361'
    //        },
    //        styles: [{
    //            polygonOptions: {
    //                fillColor: '#00FF00',
    //                fillOpacity: 0.3
    //            }
    //        }],
    //        suppressInfoWindows: true
    //    });
    //};

    //https://www.google.com/fusiontables/DataSource?docid=1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw#rows:id=1

    return HomeFactory;

});
