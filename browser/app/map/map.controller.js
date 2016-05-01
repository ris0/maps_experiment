(() => {
    'use strict';

    angular
        .module('ZipAppDrug')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl (HomeFactory, getZipCodes) {
        // think about moving to ui-router
        let map = HomeFactory.initMap();
        let snapper = HomeFactory.snapper(); // Do we have to invoker this thing here? Why isn't this in a service?


        // exports
        this.params = {};
        this.map = map;

    }

})();



app.controller('HomeCtrl', function ($scope, HomeFactory, getZipCodes) {
    $scope.map = HomeFactory.initMap();
    $scope.snapper = HomeFactory.snapper();
    $scope.params = {};
    $scope.zipCodes = getZipCodes;

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
        var zipCodes = $scope.params.input;
        HomeFactory.drawZipCodes(zipCodes);
        $scope.params.input = "";
    };

    function suggest_zip(term) {
        var q = term.trim();
        var results = [];

        for (var i = 0; i < $scope.zipCodes.length && results.length < 10; i++) {
            var zip = $scope.zipCodes[i];
            if (zip.indexOf(q) === 0)
                results.push({ label: zip , value: zip });
        }

        return results;
    }

    function suggest_zip_delimited(term) {
        var ix = term.lastIndexOf(','),
            lhs = term.substring(0, ix + 1),
            rhs = term.substring(ix + 1),
            suggestions = suggest_zip(rhs);

        suggestions.forEach(function (s) {
            s.value = lhs + s.value;
        });

        return suggestions;
    };

    $scope.ac_option_delimited = {
        suggest: suggest_zip_delimited
    };

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