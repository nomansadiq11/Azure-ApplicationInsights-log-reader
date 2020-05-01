

var ServiceURL = "https://api.applicationinsights.io/v1/apps/";

var app = angular.module("AppInsights", ['ngCookies']);


app.service("AppInsightsService", function ($http) {


    this.PostToService = function (param, MethodName, AppID, APIKey) {
        var response = $http({
            method: "post",
            url: ServiceURL + AppID + "/"  +  MethodName,
            headers: {'x-api-key': APIKey},
            data: JSON.stringify(param),
            dataType: "json"
        });
        return response;
    }

});








app.controller("AppInsightsController", ['$scope', '$cookies', '$cookieStore', '$window' ,'AppInsightsService', function($scope, $cookies, $cookieStore, $window, AppInsightsService) {


    


    


    $scope.fn_SaveConfiguration = function(){

        var obj = {"APIKey":$scope.APIKey, "AppID":$scope.AppID}

        $cookieStore.put('Whatsapp', obj);

        console.log($cookieStore.get('Whatsapp'));

    }

    
    $scope.fn_GetLogs = function () {

        debugger;

        $scope.Whatsapp = $cookieStore.get('Whatsapp');

                
        var param =            
                {
                    "query": $scope.query
                }; 

        console.log(param); 
        
     

        console.log($scope.Whatsapp.APIKey);
        console.log($scope.Whatsapp.AppID);


        var ResponseRegistration = AppInsightsService.PostToService(param, "query", $scope.Whatsapp.AppID, $scope.Whatsapp.APIKey);
        ResponseRegistration.then(function (msg) {

            debugger;

            console.log(msg.data); 
            
            $scope.Cols = msg.data.tables[0].columns;
            $scope.rows = msg.data.tables[0].rows;

            
        }, function (msg) {

            console.log('Error: AppInsightsService');
        });
    }



}]);