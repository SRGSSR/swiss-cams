angular.module('swisscams').directive('ngCesium', function(Cesium) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        template: '<div id="cesiumContainer"></div>',
        link: function(scope) {
            scope.cesium = new Cesium.Viewer('cesiumContainer',  {  'navigationHelpButton':false,
                                                                    'timeline':false,
                                                                    'animation':false,
                                                                    'navigationInstructionsInitiallyVisible':false,
                                                                    'selectionIndicator':false,
                                                                    'infoBox':false,
                                                                    'homeButton':false,
                                                                    'sceneModePicker':false,
                                                                    'baseLayerPicker':false,
                                                                    'geocoder':false,
                                                                    'vrButton':false,
                                                                    'fullscreenButton':false
                                                                     });
        }
    };
});