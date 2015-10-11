/**
 * Created by andreaterzani on 10/10/15.
 */
angular.module("meteorbeb").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $rootScope.lastState=toState;
            $state.go('login');
        }
    });
}]);


angular.module("meteorbeb")
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('login', {
                    url: '/login',
                    views:{'navbar':{
                        templateUrl: 'client/Navbar/views/navbar.ng.html',
                        controller: 'navbarCtrl'
                         },
                        main:{
                            templateUrl: 'client/Auth/views/login.ng.html',
                            controller: 'AuthCtrl'
                        }
                    }

                })
                .state('register', {
                    url: '/register',
                    views:{
                        'navbar':{
                            templateUrl: 'client/Navbar/views/navbar.ng.html',
                            controller: 'AuthCtrl'
                        },
                        main:{
                            templateUrl: 'client/Auth/views/register.ng.html',
                            controller: 'AuthCtrl'
                        }
                    }
                })

                .state('reservations', {
                    url: '/reservations',
                    views:{
                        'navbar':{
                            templateUrl: 'client/Navbar/views/navbar.ng.html',
                            controller: 'AuthCtrl'
                        },
                        'sidebar':{
                            templateUrl: 'client/sidebar/views/sidebar.ng.html'
                        },
                        'main':{
                            templateUrl: 'client/reservation/views/reservation-list.ng.html',
                            controller: 'ReservationListCtrl'
                        }
                    },
                    resolve: {
                        "currentUser": ["$meteor", function($meteor){
                            return $meteor.requireUser();
                        }]
                    }
                })

                .state('reservation-detail', {
                    url: '/reservation-detail/:reservation_id',
                    views:{
                        'navbar':{
                            templateUrl: 'client/Navbar/views/navbar.ng.html',
                            controller: 'AuthCtrl'
                         },
                        'sidebar':{
                            templateUrl: 'client/sidebar/views/sidebar.ng.html'
                        },
                        'main':{
                            templateUrl: 'client/reservation/views/reservation-detail.ng.html',
                            controller: 'ReservationDetailCtrl'
                        }
                    },
                    resolve: {
                        "currentUser": ["$meteor", function($meteor){
                            return $meteor.requireUser();
                        }]
                    }
                })
                    .state('reservation-calendar', {
                        url: '/reservation-calendar',
                        views:{
                            'navbar':{
                                templateUrl: 'client/Navbar/views/navbar.ng.html',
                                controller: 'AuthCtrl'
                            },
                            'sidebar':{
                                templateUrl: 'client/sidebar/views/sidebar.ng.html'
                            },
                            'main':{
                                templateUrl: 'client/reservation/views/reservation-calendar.ng.html',
                                controller: 'ReservationCalendarCtrl'
                            }
                        },
                        resolve: {
                            "currentUser": ["$meteor", function ($meteor) {
                                return $meteor.requireUser();
                            }]
                        }
                    }).state('admin', {
                    url: '/admin',
                    views:{
                        'navbar':{
                            templateUrl: 'client/Navbar/views/navbar.ng.html',
                            controller: 'AuthCtrl'
                        },
                        'sidebar':{
                            templateUrl: 'client/sidebar/views/sidebar.ng.html'
                        },
                        'main':{
                            templateUrl: 'client/admin/views/admin.ng.html',
                            controller: 'AdminCtrl'
                        }
                    },
                    resolve: {
                        "currentUser": ["$meteor", function ($meteor) {
                            return $meteor.requireUser();
                        }]
                    }
                });

            $urlRouterProvider.otherwise("/reservations");
        }]);

