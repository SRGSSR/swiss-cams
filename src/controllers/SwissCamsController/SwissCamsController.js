angular.module('swisscams').controller('SwissCamsController', function(camProvider) {

    var params = { region : 'Switzerland', bestshot : '0', randomize : '0', size : 'archiveprev', limit : 20};
    var camProviderPromise  = camProvider.search(params);
    var metadata;

    //example of call api metadata
    if(camProviderPromise){
        camProviderPromise.then(function success(response){
            if(response.data){
                metadata = response.data;
            }
        });
    }

});