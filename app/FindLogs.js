

var ServiceURL = "https://api.applicationinsights.io/v1/apps/";

var app = angular.module("AppInsights", []);


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



app.controller("AppInsightsController", function ($scope, $log, AppInsightsService) {



    $scope.fn_GetLogs = function () {


        
        var param =            
                {
                    "query": $scope.query
                }; 

        console.log(param); 

        var ResponseRegistration = AppInsightsService.PostToService(param, "query", $scope.AppID, $scope.APIKey);
        ResponseRegistration.then(function (msg) {

            debugger;

            console.log(msg.data); 
            $scope.Cols = msg.data.tables[0].columns;

            
        }, function (msg) {

            console.log('Error: AppInsightsService');
        });
    }



});