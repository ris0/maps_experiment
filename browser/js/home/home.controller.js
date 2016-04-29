app.controller('HomeCtrl', function ($scope, HomeFactory, getZipCodes) {
    $scope.map = HomeFactory.initMap();
    $scope.snapper = HomeFactory.snapper();
    $scope.params = {};
    $scope.zipJSON = getZipCodes;

    $scope.toggleButton = function () {
        var toggleButton = document.getElementById('snapzd');
        console.log($scope.zipJSON);

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

    var states = ['Alabama', 'Alaska', 'California'];

    function suggest_state(term) {
        var q = term.toLowerCase().trim();
        var results = [];

        // Find first 10 states that start with `term`.
        for (var i = 0; i < states.length && results.length < 10; i++) {
            var state = states[i];
            if (state.toLowerCase().indexOf(q) === 0)
                results.push({ label: state, value: state });
        }

        return results;
    }

    $scope.autocomplete_options = {
        suggest: suggest_state
    };

    function suggest_state_delimited(term) {
        var ix = term.lastIndexOf(','),
            lhs = term.substring(0, ix + 1),
            rhs = term.substring(ix + 1),
            suggestions = suggest_state(rhs);

        suggestions.forEach(function (s) {
            s.value = lhs + s.value;
        });

        return suggestions;
    };

    $scope.ac_option_delimited = {
        suggest: suggest_state_delimited
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