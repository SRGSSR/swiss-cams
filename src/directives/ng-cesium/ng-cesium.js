angular.module('swisscams').directive('ngCesium', function(Cesium, camProvider, camObject, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        template: '<div id="cesiumContainer"></div>',
        link: function(scope) {
            scope.cesium = new Cesium.Viewer('cesiumContainer', { 'navigationHelpButton':false,
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

            camObject.setViewer(scope.cesium);
            scope.cesium.scene.globe.enableLighting = true;
            $rootScope.isUIVisible = false;
            var cesiumTerrainProviderMeshes = new Cesium.CesiumTerrainProvider({
                url : 'https://assets.agi.com/stk-terrain/world',
                requestWaterMask : true,
                requestVertexNormals : true
            });
            scope.cesium.terrainProvider = cesiumTerrainProviderMeshes;

            var params = { region : 'Switzerland', bestshot : '0', randomize : '0', size : 'quarter', limit : 10};
            var camProviderPromise  = camProvider.search(params);
            var camMetadatas;

            $rootScope.$on("OPENUI", function () {
                console.log("OPENUI");
                $rootScope.isUIVisible = true;
                $rootScope.currentCamMetadatas = camObject.getCurrentCamMetaDatas();
                scope.$apply();
            });
            $rootScope.$on("CLOSEUI", function () {
                $rootScope.isUIVisible = false;
            });

            if(camProviderPromise){
                camProviderPromise.then(function success(response){
                    if(response.data){
                        camMetadatas = response.data;
                        var camOnMap, lastImage;
                        angular.forEach(camMetadatas, function(camMetadata) {
                            lastImage = camMetadata.image_url;
                            var camObj = camObject.getCamObject(camMetadata);
                            camOnMap = scope.cesium.entities.add(camObj);
                        });
                        scope.cesium.zoomTo(camOnMap, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(90.0), Cesium.Math.toRadians(-15.0), 300000));
                    }
                });
            }

            var handler = new Cesium.ScreenSpaceEventHandler(scope.cesium.scene.canvas);
            handler.setInputAction(function(click) {
                var pickedObject = scope.cesium.scene.pick(click.position);
                if (Cesium.defined(pickedObject) && (pickedObject.id.action !== undefined)) {
                    console.log("pickedObject call action");
                    pickedObject.id.action();
                }

            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        }
    };
});






