angular.module('swisscams').factory('camProvider', function($http) {
    var url_server = '//meteo-wmc.eu-central-1.elasticbeanstalk.com/search';

    return {
        search : function(params){
            return $http.post(url_server, params ? params : {});
        }
    };
    
});