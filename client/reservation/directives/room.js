'use strict';

/**
 * @ngdoc directive
 * @name bebCrmApp.directive:rooom
 * @description
 * # rooom
 */
angular.module('meteorbeb')
  .directive('room', function () {
    return {
      templateUrl :'client/reservation/views/room_list.ng.html',
      restrict: 'E',
      scope:{
        rooms:'=',
        list:'='
      },
      link: function(scope, element, attr) {

        var rooms;
        var lista;

        scope.$watch('rooms', function(value) {
          rooms = value;
          update_list();

        });

        scope.$watch('list', function(value) {
          lista = value;
          update_list();
        });

        function update_list(){
          if(rooms) {
            var listID = rooms.split(",");

            scope.room_names = [];

            listID.forEach(function (r) {
              angular.forEach(lista, function (rmain) {
                if (rmain.id == r) {
                  scope.room_names.push(rmain.name);
                }
              })

            });
         }
        }
      }
    }
  });
