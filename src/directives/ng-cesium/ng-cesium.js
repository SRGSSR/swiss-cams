angular.module('swisscams').directive('ngCesium', function(Cesium, camProvider, camObject) {
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

            scope.cesium.scene.globe.enableLighting = true;

            var cesiumTerrainProviderMeshes = new Cesium.CesiumTerrainProvider({
                url : 'https://assets.agi.com/stk-terrain/world',
                requestWaterMask : true,
                requestVertexNormals : true
            });
            scope.cesium.terrainProvider = cesiumTerrainProviderMeshes;

            var params = { region : 'Switzerland', bestshot : '0', randomize : '0', size : 'quarter', limit : 10};
            var camProviderPromise  = camProvider.search(params);
            var camMetadatas;

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
                        scope.cesium.zoomTo(camOnMap);
                    }
                });
            }
        }
    };
});