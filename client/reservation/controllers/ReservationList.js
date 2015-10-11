
  angular.module("meteorbeb").controller("ReservationListCtrl", ['$scope', '$meteor',

      function ($scope, $meteor) {

        var date = new Date();


        $scope.year=date.getFullYear();
          $scope.month=date.getMonth();;

        $meteor.subscribe('confirmed_reservation');

          $meteor.autorun($scope, function() {

                var m =parseInt($scope.getReactively('month'));
              var y=parseInt($scope.getReactively('year'));

              $scope.reservations = $meteor.collection(function () {
                  return Reservations.find({
                      'date_arrival': {$gte: new Date(y,m,1),
                                        $lt: new Date(y,m+ 1, 1)}
                  });
              });
          });

          $scope.roomList = $meteor.collection(Rooms,false).subscribe('rooms');;
      

    }]);
