var HomeFactory = function ($http) {
    var HomeFactory = {};

    HomeFactory.loadMap = function () {
        return $http.get('/map')
            .then(function(response) {
                var map = response.data;
                return map;
            })
    };

    return HomeFactory;
};

app.factory('HomeFactory', HomeFactory);