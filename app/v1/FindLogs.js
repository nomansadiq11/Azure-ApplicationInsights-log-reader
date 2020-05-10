

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

        var obj = {"APIKey":$scope.APIKey, "AppID":$scope.AppID, "Name":"Configuration"}; 
        
        $cookieStore.put('Configuration', obj);
        console.log($cookieStore.get('Configuration'));
        alert("Saved Successfully"); 

    }

    $scope.fn_LoadCacheValues = function()
    {
        $scope.Config = $cookieStore.get('Configuration');
        $scope.LastQuery = $cookieStore.get('LastQuery');

        if($scope.LastQuery !== undefined)
        {
            $scope.query = $scope.LastQuery.query; 
        }

        if($scope.Config !== undefined)
        {
            $scope.APIKey = $scope.Config.APIKey; 
            $scope.AppID = $scope.Config.AppID; 
        }

    }

    
    $scope.fn_GetLogs = function () {

        debugger;

        $scope.Config = $cookieStore.get('Whatsapp');
        $scope.LastQuery = $cookieStore.get('LastQuery');

        if($scope.LastQuery !== undefined)
        {
            $scope.query = $scope.LastQuery.query; 
        }

        if($scope.Config !== undefined)
        {
            $scope.APIKey = $scope.Config.APIKey; 
            $scope.AppID = $scope.Config.AppID; 
        }

                
        var param =            
                {
                    "query": $scope.query
                }; 

            

        console.log($scope.Config.APIKey);
        console.log($scope.Config.AppID);

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


    $scope.fn_GetAllConfigs = function()
    {
        $scope.Config = $cookieStore.get('Configuration');
        $scope.QueryConfig = $cookieStore.get('LastQuery');
        console.log($scope.Config.Name);
    }


    $scope.fn_SaveQuery = function(){
       
        var obj = {"query": $scope.query, "Name":"LastQuery"}; 
        $cookieStore.put(obj.Name, obj);
        console.log($cookieStore.get(obj.Name));
        alert("Saved Successfully"); 

    }

    

}]);