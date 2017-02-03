angular.module('swisscams').controller('SwissCamsController', function($scope) {
    $scope.map = false;
    $scope.showMap = function() {
        $scope.map = true;
    };
    $scope.hideMap = function() {
        $scope.map = false;
    };
});