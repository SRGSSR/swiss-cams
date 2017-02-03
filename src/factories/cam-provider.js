angular.module('swisscams').factory('camProvider', function($http) {
    return {
        search : function(params){
            return $http.post(
                        '//meteo-wmc.eu-central-1.elasticbeanstalk.com/search',
                        params ? params : {})
                .then(function(response) {
                    if (response.data) {
                        var result = [];

                        response.data.forEach(function(cam) {
                            result.push({
                                id: cam.latitude + cam.longitude + cam.name,
                                name: cam.cam_name,
                                altitude: cam.altitude,
                                latitude: cam.latitude,
                                longitude: cam.longitude,
                                img: cam.image_url
                            });
                        });

                        return result;
                    }
                }
            );
        }
    };
    
});