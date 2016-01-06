angular.module('Zebra.state.Settings.Credentials', 
    ['Zebra.state.Settings.Credentials.View'])

.config(function config($stateProvider) {
    $stateProvider

    .state('private.settings.credentials', {
        url: 'credentials/',
        controller: 'Credentials',
        templateUrl: 'app/states/settings/credentials/credentials.tpl.html',
        resolve: {
            applications: function (Application) {
                return Application.all().$promise.then(function (response) {
                    return response.data;
                });
            }
        }
    })

    ;
})

.controller('Credentials', function Credentials($scope, $state, $stateParams, applications, Application, PushNotify, gettextCatalog) {

$scope.applications = applications;

$scope.query = {
    name: "",
    redirect_uri: ""
};
$scope.credentials={

};

        // submit application form
        $scope.submitApplication = function () {
             $scope.listBusy = true;

            Application.create($scope.query).$promise.then(function (response) {
                $scope.credentials = response;

                //set overlay to busy
                $scope.listBusy = false;

                //push new application in object
                $scope.applications.push(response); 

                //reset form fields
                $scope.query = {
                      name: "",
                    redirect_uri: ""
                 };

               });
            };

        

});


