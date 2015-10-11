/**
 * Created by andreaterzani on 11/10/15.
 */

angular.module("meteorbeb").controller("AuthCtrl", ['$scope', '$meteor','$stateParams','$state','$rootScope',

    function ($scope, $meteor,$stateParams,$state,$rootScope) {


        $scope.logout = function(){

            $meteor.logout().then(function(){

                $state.go("login");

            }, function(err){
                console.log('logout error - ', err);
            });
        }

        $scope.signup = function (newUser) {

            $meteor.createUser(newUser).then(function(){
                console.log('Register success');
                if ($rootScope.lastState){
                    $state.go($rootScope.lastState.name);
                }else{
                    $state.go('reservations');
                }
            }, function(err){
                $scope.errormessage= err.reason;

                console.log('Registration error - ', err);
            });

        };

        $scope.login= function (user,password) {


            $meteor.loginWithPassword(user,password).then(function(){
                console.log('Login success');
                if ($rootScope.lastState){
                    $state.go($rootScope.lastState.name);
                }else{
                    $state.go('reservations');
                }

            }, function(err){
                $scope.errormessage= err.reason;

                console.log('Login error - ', err);
            });
        }


    }]);
