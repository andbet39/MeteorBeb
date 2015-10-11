
  angular.module("meteorbeb").controller("ReservationDetailCtrl", ['$scope', '$meteor','$stateParams',

      function ($scope, $meteor,$stateParams) {

          $scope.reservation = $meteor.object(Reservations, $stateParams.reservation_id).subscribe('confirmed_reservation');;

          $scope.roomList = $meteor.collection(Rooms,false).subscribe('rooms');


      }]);
