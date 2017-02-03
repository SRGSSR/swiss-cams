angular.module('swisscams').controller('SwissCamsController', function(camProvider, $scope) {

    camProvider.search({
        region : 'Switzerland',
        bestshot : '0',
        randomize : '0',
        size : 'quarter',
        limit : 13
    }).then(function(data) {
        $scope.cams = data;
    });

    $scope.onClosePhotoView = function() {
        $scope.cam = undefined;
        $scope.hideMap = false;
    };
    $scope.onOpenCam = function(cam) {
        $scope.cam = cam;
        $scope.hideMap = true;
    };

    $scope.hideMap = false;
});