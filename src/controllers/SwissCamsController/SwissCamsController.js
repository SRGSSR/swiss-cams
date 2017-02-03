angular.module('swisscams').controller('SwissCamsController', function(camObject, $scope, $rootScope) {

	$scope.getImageURl = function(){
        var tempURL = camObject.getCurrentImageURl();
        return tempURL;
    };

    $scope.onClose = function() {
        $rootScope.$broadcast("CLOSEUI");
    };
});