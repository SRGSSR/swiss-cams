angular.module('swisscams', ['ngRoute']).constant('Cesium', window.Cesium);

angular.module('swisscams').config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: "src/controllers/SwissCamsController/SwissCamsController.html"
    });

    $locationProvider.html5Mode(true).hashPrefix('!');
});

angular.module('swisscams').run(function() {
    // Run application
});
