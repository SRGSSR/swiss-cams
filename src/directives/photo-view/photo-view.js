angular.module('swisscams').directive('photoView', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            img: '@',
            locatin: '@',
            altitude: '@',
            latitude: '@',
            longitude: '@'
        },
        templateUrl: 'src/directives/photo-view/photo-view.html',
        link: function(scope) {
        }
    };
});