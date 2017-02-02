angular.module('swisscams').directive('ngCesium', function(Cesium) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        template: '<div id="cesiumContainer"></div>',
        link: function(scope) {
            scope.cesium = new Cesium.Viewer('cesiumContainer');
        }
    };
});