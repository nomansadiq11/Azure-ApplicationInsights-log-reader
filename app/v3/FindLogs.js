

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

    this.ReadJsonFile = function () {
        var response = $http({
            method: "get",
            url: 'config.json',
            data: '',
            dataType: "json"
        });
        return response;
    }

       


});








app.controller("AppInsightsController", ['$scope', '$cookies', '$cookieStore', '$window' ,'AppInsightsService', function($scope, $cookies, $cookieStore, $window, AppInsightsService) {


    


    
    
    $scope.fn_GetLogs = function () {

        

                       
        var param =            
                {
                    "query": $scope.query
                }; 

            

        console.log($scope.APIKey);
        console.log($scope.AppID);

        $('#loader').show(); 


        var ResponseRegistration = AppInsightsService.PostToService(param, "query", $scope.AppID, $scope.APIKey);
        ResponseRegistration.then(function (msg) {
            
            $scope.Cols = msg.data.tables[0].columns;
            $scope.rows = msg.data.tables[0].rows;

            $('#loader').hide(); 

            
        }, function (msg) {

            console.log('Error: AppInsightsService');
            $('#loader').hide(); 
        });
    }


  


    $scope.fn_SaveQuery = function(){
       
        var obj = {"query": $scope.query, "Name":"query1"}; 

        $cookieStore.put(obj.Name, obj);

        console.log($cookieStore.get(obj.Name));

        alert("Saved Successfully"); 

    }

    $scope.ReadConfigFile = function()
    {

        var Response = AppInsightsService.ReadJsonFile();
        Response.then(function (msg) {
            console.log(msg.data); 

            $scope.ConfigLIst = msg.data; 
            
            
        }, function (msg) {

            console.log('Error: ReadConfigFile');
            
        });



    }

    $scope.fn_SelectConfig = function(ConfigName)
    {
        $scope.SelectedConfig = ConfigName.Name; 
        $scope.AppID = ConfigName.AppID; 
        $scope.APIKey = ConfigName.APIKey; 
        console.log(ConfigName); 
    
    }


}]);