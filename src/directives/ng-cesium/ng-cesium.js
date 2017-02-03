angular.module('swisscams').directive('ngCesium', function(Cesium, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            onOpen: '&',
            cams: '='
        },
        template: '<div id="map-viewer"></div>',
        link: function(scope) {
            var viewer = new Cesium.Viewer('map-viewer', {
                'navigationHelpButton':false,
                'timeline':false,
                'animation':false,
                'navigationInstructionsInitiallyVisible':false,
                'selectionIndicator':false,
                'infoBox':true,
                'homeButton':false,
                'sceneModePicker':false,
                'baseLayerPicker':false,
                'geocoder':false,
                'vrButton':false,
                'fullscreenButton':false
            });

            viewer.scene.globe.enableLighting = true;
            viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
                url : 'https://assets.agi.com/stk-terrain/world',
                requestWaterMask : true,
                requestVertexNormals : true
            });

            new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(function(click) {
                var pick = viewer.scene.pick(click.position);
                if (Cesium.defined(pick) && (pick.id.action !== undefined)) {
                    pick.id.action();
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            Cesium.when(
                new Cesium.PinBuilder().fromUrl(
                    Cesium.buildModuleUrl('//' + location.host + '/img/camera.png'), Cesium.Color.ORANGE, 48), function(canvas) {
                var icon = canvas.toDataURL();

                scope.cams.forEach(function(cam) {
                    viewer.entities.add({
                        name: cam.name,
                        id: cam.id,
                        position: Cesium.Cartesian3.fromDegrees(
                                        cam.longitude,
                                        cam.latitude,
                                        Cesium.HeightReference.CLAMP_TO_GROUND),
                        billboard: {
                            image: icon,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        },

                        action: function() {
                            viewer.camera.flyTo({
                                destination : Cesium.Cartesian3.fromDegrees(cam.longitude,
                                                                            Number(cam.latitude)-0.1, 
                                                                            Cesium.HeightReference.CLAMP_TO_GROUND + 10000),
                                orientation : {
                                    pitch : Cesium.Math.toRadians(-45.0),
                                },
                                duration: 1,
                                complete : function() {
                                    $timeout(function() {
                                        scope.onOpen({cam: cam});
                                    });
                                }
                            });
                        }
                    });
                });

                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees("8.2275", "45.0", Cesium.HeightReference.CLAMP_TO_GROUND + 175000),
                    orientation : {
                        pitch : Cesium.Math.toRadians(-45.0),
                    },
                    duration: 2
                });
            });
        }
    };
});



