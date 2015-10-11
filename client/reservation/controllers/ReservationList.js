
  angular.module("meteorbeb").controller("ReservationListCtrl", ['$scope', '$meteor',

      function ($scope, $meteor) {

        var date = new Date();
          $scope.earnings=0;
          $scope.room_nights=0;


          $scope.year=date.getFullYear();
          $scope.month=date.getMonth();;


          $meteor.subscribe('confirmed_reservation');

          $meteor.autorun($scope, function() {

              var m =parseInt($scope.getReactively('month'));
              var y=parseInt($scope.year);

              $scope.reservations = $meteor.collection(function () {
                  return Reservations.find({
                      'date_arrival': {$gte: new Date(y,m,1),
                                        $lt: new Date(y,m+ 1, 1)}
                  })
              });

          });

          $meteor.autorun($scope, function() {
              $scope.getReactively('reservations');

              $scope.earnings=0;
              $scope.room_nights=0;

              $scope.reservations.forEach(function (res) {

                  $scope.earnings += parseFloat(res.amount);
                  $scope.room_nights += parseInt(res.roomnight);
              });
          });

          $scope.roomList = $meteor.collection(Rooms,false).subscribe('rooms');;
      

    }]);
