angular.module('swisscams').directive('photoView', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            onClose: '&',
            img: '@',
            location: '@',
            altitude: '@',
            latitude: '@',
            longitude: '@'
        },
        templateUrl: 'src/directives/photo-view/photo-view.html',
        link: function(scope) {
            scope.close = function() {
                scope.onClose({});
            };
        }
    };
});