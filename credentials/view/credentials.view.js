angular.module('Zebra.state.Settings.Credentials.View', [])

.config(function config($stateProvider) {
        $stateProvider

        .state('private.settings.credentials--view', {
            url: 'credentials/{id}/view/',
            controller: 'CredentialsViewController',
            templateUrl: 'app/states/settings/credentials/view/credentials.view.tpl.html',
            resolve: {  
                applicationData: function (Application, $stateParams) {
                    return Application.find($stateParams.id).$promise.then(function (applicationData) {

                       return applicationData;
                    });
                }
            }
        });
})
.service('ApplicationDeleteModal', function (Overlay) {

    this.openModal = function (application) {
        return Overlay ({
            size: 'small',
            templateUrl: 'app/states/settings/credentials/view/credentials-delete-modal.tpl.html',
            controller: 'ApplicationModalController',
            resolve: {
                application: function () {
                    return application;
                }
            }
        });
    };
})
.controller('ApplicationModalController', function ($scope, $state, $filter, $overlayInstance, gettextCatalog, application, PushNotify, Accounts, Application) {
    
    $scope.application = application;

    //Set notifications object for delete function
    notifications = {
    applicationDeleteSuccess: {
            title: gettextCatalog.getString('Success'),
            message: gettextCatalog.getString('Application has been deleted'),
            time: 5000,
            type: 'deleted'
        }
    };

    // Delete application handler
    $scope.delete = function (id) {

        Application.delete(id).$promise.then(function (response){
                //go back to previous page
                $state.go('private.settings.credentials');

                //open notification
                PushNotify.push(notifications.applicationDeleteSuccess);

                //close the overlay modal
                $overlayInstance.close({
                remove: true
            });
            });
        };  
        
        
    
})

.controller('CredentialsViewController', function (applicationData, $scope, $stateParams, $state, Application, gettextCatalog, PushNotify, Overlay, ApplicationDeleteModal) {

$scope.applicationData = applicationData;
$scope.application = applicationData;



$scope.deleteApplication = function(application) {
        // Open modal with task info
        ApplicationDeleteModal.openModal(application);
    }; 

$scope.createJSON = function(){

    //creates a button which downloads a JSON file with the application data

    var data = {Name:$scope.applicationData.name, URI:$scope.applicationData.redirect_uri, 
                ClientID:$scope.applicationData.client_id, ClientSecret: $scope.applicationData.client_secret, 
                Created: $scope.applicationData.created_at};
    var json = JSON.stringify(data);
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = "backup";
    a.setAttribute('class', 'btn btn-primary');
    a.href        = url;
    a.textContent = "Download JSON";

    document.getElementById('content').appendChild(a);
  };

  //call the function
  $scope.createJSON();

});