app.factory('HomeFactory', function ($http) {

    var HomeFactory = {};

    HomeFactory.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.730610,
                lng: -73.935242
            },
            zoom: 12
        });
    };

    return HomeFactory;

});
