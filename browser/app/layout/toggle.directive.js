(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('toggleButton', toggle);

    function toggle () {
        var directive = {
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

            function snapper () {
                return new Snap({
                    element: document.getElementById('content')
                });
            }

            var snapperElement = snapper();
            element.bind('click', toggleButton);
            function toggleButton () {
                if (snapperElement.state().state=='left') {
                    snapperElement.close();
                    snapperElement.disable();
                } else {
                    snapperElement.open('left');
                    snapperElement.disable();
                }
            }

        }
    }

})();


