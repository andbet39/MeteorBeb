
angular.module("meteorbeb").controller("AdminCtrl", ['$scope', '$meteor',

    function ($scope, $meteor) {

        $scope.getToken = function()
        {
            console.log("getToken client");
            $meteor.call('getToken').then(function (data) {
                console.log(data);
            });
        };

        $scope.printToken = function()
        {
            console.log("getToken client");
            $meteor.call('printCurrentToken');
        };

        $scope.fetchReservationInRage= function(){

            $meteor.call('fetchReservationInRage',$scope.dfrom,$scope.dto).then(function (data) {
                console.log(data);
            });
        };
        $scope.fetchReservationNew= function(){

            $meteor.call('fetchReservationNew').then(function (data) {
                console.log(data);
            });
        };


        $scope.fetchRooms= function(){

            $meteor.call('fetchRoom').then(function (data) {
                console.log(data);
            });
        }


    }]);
