app.controller('HomeCtrl', function ($scope, HomeFactory) {
    $scope.map = HomeFactory.initMap();

    $scope.submitCodes = function (params) {
        console.log('hi');
    };

    //$scope.findZip = HomeFactory.findZip();
});

// controllerAs syntax uses 'this' inside controllers, which gets bound to scope
//function HomeCtrl (loadMap) {
//    var hvm = this;
    //var doSomething = function () { console.log('hi') };
    //hvm.doSomething = doSomething;
//    hvm.loadMap = loadMap;
//    return hvm;
//
//}

//app.controller('HomeCtrl', HomeCtrl);