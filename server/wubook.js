/**
 * Created by andreaterzani on 11/10/15.
 */

var token;
var client;
var lcode='1377875938';


Meteor.methods({
    getToken: function () {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        client = new Meteor.XmlRpcClient('https://wubook.net/xrws');

        token = client.methodCall('acquire_token', ['AT035','Luglio2015','bamboo:rome'],
            function (error, value) {
                if(error) {
                    console.log("error :" + error);
                    return error;
                }else{
                    token=value[1];
                    console.log("Token aquired "+token);
                    return token;
                }
            });

    },
    printCurrentToken:function(){
        if(token==undefined){
            console.log("Token is undefined");
            Meteor.getToken();
        }
        console.log(token);
    },
    fetchReservationInRage:function(dfrom,dto){


        client.methodCall('fetch_bookings', [token,lcode,dfrom,dto,0,1],
            Meteor.bindEnvironment(function (error, value) {
                console.log("Callback of methodCall");
                console.log(value);
                if(error) {
                    console.log(error);
                }else{
                    var reservation = value[1];
                    reservation.forEach(function(reservation) {

                        var date_arrival = moment(reservation.date_arrival, "DD/MM/YYYY").toDate();
                        var date_departure = moment(reservation.date_departure, "DD/MM/YYYY").toDate();
                        var date_received = moment(reservation.date_received, "DD/MM/YYYY").toDate();

                        reservation.date_arrival = new Date(date_arrival);
                        reservation.date_departure = new Date(date_departure);
                        reservation.date_received = new Date(date_received);
                    try {
                        Reservations.insert(reservation);
                    }catch (error){
                        console.log("Inser error");
                    }
                        console.log(reservation);

                    });

                }
            })
        )},
    fetchReservationNew:function(dfrom,dto){


        client.methodCall('fetch_new_bookings', [token,lcode,1,1],
            Meteor.bindEnvironment(function (error, value) {
                console.log("Callback of methodCall");
                console.log(value);
                if(error) {
                    console.log(error);
                }else{
                    var reservation = value[1];
                    reservation.forEach(function(reservation) {

                        var date_arrival = moment(reservation.date_arrival, "DD/MM/YYYY").toDate();
                        var date_departure = moment(reservation.date_departure, "DD/MM/YYYY").toDate();
                        var date_received = moment(reservation.date_received, "DD/MM/YYYY").toDate();

                        reservation.date_arrival = new Date(date_arrival);
                        reservation.date_departure = new Date(date_departure);
                        reservation.date_received = new Date(date_received);

                        Reservations.insert(reservation);

                        console.log(reservation);

                    });

                }
            })
        )},
    fetchRoom:function(){

        var client = new Meteor.XmlRpcClient('https://wubook.net/xrws');

        client.methodCall('fetch_rooms', [token,lcode],
            Meteor.bindEnvironment(function (error, value) {
                console.log("Callback of methodCall");
                console.log(value);
                if(error) {
                    console.log(error);
                }else{
                    var rooms = value[1];
                    rooms.forEach(function(room) {

                        Rooms.insert(room);

                        console.log(room);

                    });

                }
            })
        );
    }

});