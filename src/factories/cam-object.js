// angular.module('swisscams').factory('camObject', function($filter, Cesium) {
    angular.module('swisscams').service('camObject', function($filter, Cesium, $rootScope) {

    // return {
        var viewer;
        var icon;
        var pinBuilder = new Cesium.PinBuilder();
        var currentCamMetaDatas;

        function setPin() {
            var url = Cesium.buildModuleUrl('../../../../img/camera.png');
            Cesium.when(pinBuilder.fromUrl(url, Cesium.Color.ORANGE, 48), function(canvas) {
                icon = canvas.toDataURL();
            });
        }

        function setCurrentCamMetadatas(data) {
            console.log("setCurrentCamMetadatas");
            currentCamMetaDatas = data;
        }

        this.getCurrentCamMetaDatas = function () {
            return currentCamMetaDatas;
        };

        this.getCurrentImageURl = function(){
            console.log("getCurrentImageURl");
            return currentCamMetaDatas.image_url;
        };


        this.setViewer = function function_name(data) {
            viewer = data;
            setPin();
        };

        this.getCamObject = function(metadata) {
            var material = new Cesium.ImageMaterialProperty({
                    image: 'http://meteo-wmc.eu-central-1.elasticbeanstalk.com/searchResource?urlResource=//'+$filter('limitTo')(metadata.image_url, metadata.image_url.length, 8),
                    alpha: 0.5
                });
            
            var minAltitude = 1000;
            var position_ = {longitude: metadata.longitude, latitude:metadata.latitude, altitude:(metadata.altitude === null ? minAltitude : metadata.altitude + minAltitude)};
            
            return {
                name : metadata.cam_name,
                id: metadata.cam_name,
                metadata: metadata,
                position: Cesium.Cartesian3.fromDegrees(position_.longitude,
                                                        position_.latitude,
                                                        Cesium.HeightReference.CLAMP_TO_GROUND),
                // ellipsoid : {
                //     radii : new Cesium.Cartesian3(500, 500, 500),
                //     material : Cesium.Color.CRIMSON// material
                // },
                billboard : {
                    image : icon,
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                },






                action:function () {
                    console.log("altitude action", position_.altitude );
                    setCurrentCamMetadatas(metadata);
                    var cameraDestination = Cesium.Cartesian3.fromDegrees(position_.longitude,
                                                                    position_.latitude, 
                                                                    Cesium.HeightReference.CLAMP_TO_GROUND + 5000);
                    viewer.camera.flyTo({
                        destination : cameraDestination,
                        // destination : Cesium.Rectangle.fromDegrees(position_.longitude, position_.latitude),
                        orientation : {
                            heading : Cesium.Math.toRadians(90.0),
                            pitch : Cesium.Math.toRadians(-15.0),
                            roll : 0.0
                        },
                        duration: 1,
                           complete : function() {
                            console.log("test complete");
                            $rootScope.$broadcast("OPENUI");
                            
                        }
                    });
                }
            };
        };
    // };

});