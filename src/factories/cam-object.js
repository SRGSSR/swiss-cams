angular.module('swisscams').factory('camObject', function($filter, Cesium) {

    return {

        getCamObject: function(metadata) {
            var material = new Cesium.ImageMaterialProperty({
                    image: 'http://meteo-wmc.eu-central-1.elasticbeanstalk.com/searchResource?urlResource=//'+$filter('limitTo')(metadata.image_url, metadata.image_url.length, 8),
                    alpha: 0.5
                });
            return {
                name : metadata.cam_name,
                position: Cesium.Cartesian3.fromDegrees(metadata.longitude, metadata.latitude, Cesium.HeightReference.CLAMP_TO_GROUND),
                cylinder : {
                    length : 1000,
                    topRadius : 1000.0,
                    bottomRadius : 1000.0,
                    material: material,
                    outline : true,
                    outlineColor : Cesium.Color.DARK_GREEN
                }
            };
        }
    };

});