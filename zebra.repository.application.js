//
// Templates API service
//
angular.module('Zebra.repository.Application', ['ngResource'])

    .factory('Application', function ($resource) {
        var application = $resource(AppConfig.Api + '/applications', {}, {
            all: {method: 'GET', params: {}},
            create: {method: 'POST', params: {}}
        });
        var deleteApplication = $resource(AppConfig.Api + '/applications/:application_client_id', {}, {
            delete: {method: 'DELETE', params:{application_client_id: ''}},
            find:{method: 'GET', params:{application_client_id: ''}}
        });
        return {
            all: function (query) {
                return application.all();
            },
            create: function(data){
                return application.create(data);
            },
            delete: function (id) {
                return deleteApplication.delete({
                    application_client_id: id
                });
            },
            find: function (id){

            return deleteApplication.find({ 
                application_client_id: id
            });
        }
        };
    });