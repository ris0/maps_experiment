'use strict';
app.directive('sidebarDirective', function ($animate) {

    return {
        restrict: 'EA',
        templateUrl: 'views/directives/sidebar.html',
        link : function(scope, element, attr) {

            scope.toggleSidebar = function () {
                if (element.hasClass('close')) {
                    element.removeClass('close');
                } else {
                    element.addClass('close');
                }

            };
        }
    };

});