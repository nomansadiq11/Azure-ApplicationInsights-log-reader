

var ServiceURL = "https://api.applicationinsights.io/v1/apps/84e3ce2d-f378-4cfd-a1b1-f81ae5a7e2ff/";

var app = angular.module("AppInsights", []);


app.service("AppInsightsService", function ($http) {


    this.PostToService = function (param, MethodName) {
        var response = $http({
            method: "post",
            url: ServiceURL + MethodName,
            headers: {'x-api-key': 'oagju5ztfvrntgccmf4lcigbr5zxmpek6nvgzgsl'},
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

        var ResponseRegistration = AppInsightsService.PostToService(param, "query");
        ResponseRegistration.then(function (msg) {

            debugger;

            console.log(msg.data); 
            $scope.Cols = msg.data.tables[0].columns;

            
        }, function (msg) {

            console.log('Error: AppInsightsService');
        });
    }



});