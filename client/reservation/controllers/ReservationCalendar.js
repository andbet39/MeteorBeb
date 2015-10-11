
angular.module("meteorbeb").controller("ReservationCalendarCtrl", ['$scope', '$meteor','$state',
    function ($scope, $meteor,$state) {




        $scope.reservations = $meteor.collection(Reservations);

        $meteor.subscribe('confirmed_reservation');

        $scope.roomList = $meteor.collection(Rooms);


        $scope.events=[];
        $scope.roomList=[];



        $scope.eventSources = [$scope.events];


        $scope.prepareCalendar = function(){

           var data  = $scope.reservations;
            console.log(data);
            var events=[];

            data.forEach(function(res){

                var event = {'title':res.customer_name +" " +res.customer_surname,
                    'start':new Date(res.date_arrival),
                    'end':new Date(res.date_arrival),'allDay':true,stick : true,res_id:res._id};

                events.push(event);
            });

            angular.copy(events, $scope.events);
        };

        $scope.prepareCalendar();


        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $state.go('reservation-detail',{reservation_id:date.res_id}); // go to loginconsole.log(date.res_id);
        };

        $scope.uiConfig = {
            calendar:{
                height: 700,
                editable:false,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick
            }
        };

    }]);
