

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


    


    


    $scope.fn_SaveConfiguration = function(){

        

        

        var obj = {"APIKey":$scope.APIKey, "AppID":$scope.AppID, "Name":"WhatApp"}; 

        var fulobj =  { "WhatsApp" :  obj}; 

        $cookieStore.put('Whatsapp', obj);

        console.log($cookieStore.get('Whatsapp'));

        alert("Saved Successfully"); 

    }

    
    $scope.fn_GetLogs = function () {

        debugger;

        $scope.Config = $cookieStore.get('Whatsapp');

                
        var param =            
                {
                    "query": $scope.query
                }; 

            

        console.log($scope.Config.APIKey);
        console.log($scope.Config.AppID);

        $('#loader').show(); 


        var ResponseRegistration = AppInsightsService.PostToService(param, "query", $scope.Config.AppID, $scope.Config.APIKey);
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
        $scope.Config = $cookieStore.get('Whatsapp');
        $scope.QueryConfig = $cookieStore.get('query1');

        console.log($scope.Config.Name);
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
            debugger;
            console.log(msg.data); 

            $scope.ConfigLIst = msg.data; 
            
            
        }, function (msg) {

            console.log('Error: ReadConfigFile');
            
        });



    }


}]);