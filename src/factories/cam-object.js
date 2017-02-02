// angular.module('swisscams').factory('camObject', function($filter, Cesium) {
    angular.module('swisscams').service('camObject', function($filter, Cesium) {

    // return {
        var viewer;
        this.setViewer = function function_name(data) {
            viewer = data;
        };

        this.getCamObject = function(metadata) {
            var material = new Cesium.ImageMaterialProperty({
                    image: 'http://meteo-wmc.eu-central-1.elasticbeanstalk.com/searchResource?urlResource=//'+$filter('limitTo')(metadata.image_url, metadata.image_url.length, 8),
                    alpha: 0.5
                });
            var pinBuilder = new Cesium.PinBuilder();
            var minAltitude = 1000;
            var position_ = {longitude: metadata.longitude, latitude:metadata.latitude, altitude:(metadata.altitude === null ? minAltitude : metadata.altitude + minAltitude)};
            console.log("altitude", position_ ); 
            return {
                name : metadata.cam_name,
                id: metadata.cam_name,
                metadata: metadata,
                position: Cesium.Cartesian3.fromDegrees(position_.longitude,
                                                        position_.latitude,
                                                        Cesium.HeightReference.CLAMP_TO_GROUND + 5000),
                ellipsoid : {
                    radii : new Cesium.Cartesian3(500, 500, 500),
                    material : Cesium.Color.CRIMSON// material
                },
                // billboard : {
                //     image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
                //     verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                // },
                action:function () {
                    console.log("altitude action", position_.altitude );
                    viewer.camera.flyTo({
                        destination : Cesium.Cartesian3.fromDegrees(position_.longitude,
                                                                    position_.latitude, 
                                                                     Cesium.HeightReference.CLAMP_TO_GROUND + 5000),
                        // destination : Cesium.Rectangle.fromDegrees(position_.longitude, position_.latitude),
                        orientation : {
                            heading : Cesium.Math.toRadians(180.0),
                            pitch : Cesium.Math.toRadians(-15.0),
                            roll : 0.0
                        },
                           complete : function() { console.log("test complete");}
                    });
                }
            };
        };
    // };

});