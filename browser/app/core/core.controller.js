(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('CoreController', CoreController);

    function CoreController (googleMapService, getZipCodes, $document) {
        var vm = this;

        /** @desc Google Map & JSON data */
        vm.initMap = googleMapService.initMap();
        vm.getZipCodes = getZipCodes;
        vm.drawZipCodes = drawZipCodes;

        /** @desc autocomplete */
        vm.suggest_zip_delimited = suggest_zip_delimited;
        vm.ac_option_delimited = { suggest: vm.suggest_zip_delimited };

        function drawZipCodes () {
            googleMapService.drawZipCodes(vm.params.input);
            vm.params.input = "";
        }

        function suggest_zip(term) {
            var zipCodes = vm.getZipCodes,
                q = term.trim(),
                results = [];

            for (var i = 0; i < zipCodes.length && results.length < 10; i++) {
                var zip = zipCodes[i];
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
        }
    }
})();