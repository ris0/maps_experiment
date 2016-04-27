app.controller('HomeCtrl', function ($scope, HomeFactory) {
    $scope.map = HomeFactory.initMap();
    $scope.snapper= HomeFactory.snapper();
    $scope.params = {};

    $scope.toggleButton = function () {
        var toggleButton = document.getElementById('snapzd');
        toggleButton.addEventListener('click', function(){

            if( $scope.snapper.state().state=="left" ){
                $scope.snapper.close();
                $scope.snapper.disable();
            } else {
                $scope.snapper.open('left');
                $scope.snapper.disable();
            }

        });
    };

    $scope.drawZipCodes = function () {
        HomeFactory.drawZipCodes($scope.params);
        $scope.params.input = "";
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