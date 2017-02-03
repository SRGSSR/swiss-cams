angular.module('swisscams').controller('SwissCamsController', function(camObject, $scope) {

	// $scope.currentCamMetadatas = camObject.getCurrentCamMetaDatas();
	$scope.getImageURl = function(){
                var tempURL = camObject.getCurrentImageURl();
                console.log("getImageURl", camObject.getCurrentImageURl());
                return tempURL;
            };

});