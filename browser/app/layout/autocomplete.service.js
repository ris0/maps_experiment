(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('autocomplete', autocomplete);

    function autocomplete() {
        var service = {
            suggest_zip : suggest_zip,
            suggest_zip_delimited : suggest_zip_delimited
        };

        return service;

        function suggest_zip(term, array) {
            var zipCodes = array,
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
}());
