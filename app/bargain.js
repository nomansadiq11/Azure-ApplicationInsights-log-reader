

var ServiceURL = "http://localhost:51835/api/Bargain/";

var app = angular.module("cheapawsome", []);


app.service("cheapawsomeContactService", function ($http) {


    this.PostToService = function (param, MethodName) {
        var response = $http({
            method: "post",
            url: ServiceURL + MethodName,
            data: JSON.stringify(param),
            dataType: "json"
        });
        return response;
    }

});



app.controller("cheapawsomeController", function ($scope, $log, cheapawsomeContactService) {



    $scope.fn_findbargain = function () {


        
        var param =
            {
                destinationid: parseInt($scope.dest),
                nights:$scope.nights
            };

        console.log(param); 

        var ResponseRegistration = cheapawsomeContactService.PostToService(param, "FindBargain");
        ResponseRegistration.then(function (msg) {
            console.log(msg.data); 

            $scope.hotels = msg.data[0].selectedDest; 

            console.log("hotel value "); 

            console.log($scope.hotels); 
            
        }, function (msg) {

            console.log('Error: cheapawsomeContactService');
        });
    }



});