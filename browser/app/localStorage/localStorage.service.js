(function() {
    'use strict';

    angular
        .module('app.localStorage')
        .factory('localStorageService', localStorageService);

    function localStorageService() {
        var service = {
            saveConfig     : saveConfig,
            loadConfig     : loadConfig,
            checkPrevMap   : checkPrevMap,
            checkPrevLayer : checkPrevLayer
        };

        return service;

        /** @save
         *      this.mapOptions
         *      this.query
         *  @syntax
         *      localStorage.colorSetting = '#a4509b';
         *      localStorage['colorSetting'] = '#a4509b';
         *      localStorage.setItem('colorSetting', '#a4509b');
         * */

        function saveConfig (key, value) {
            return localStorage.setItem(key, value);
        }

        function loadConfig (key) {
            return localStorage.getItem(key);
        }

        function checkPrevMap () {
            return localStorage.getItem('lat')
        }

        function checkPrevLayer () {
            return localStorage.getItem('query.where')
        }


    }
}());
