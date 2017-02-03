angular.module('swisscams').directive('photoView', function(camObject) {
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
            console.log("photoView link");
            
        }
    };
});