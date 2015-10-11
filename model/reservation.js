/**
 * Created by andreaterzani on 10/10/15.
 */
Reservations = new Mongo.Collection("Reservation");

Reservations.allow({
    insert: function (userId, reservation) {
        return userId && party.owner === userId;
    },
    update: function (userId, reservation, fields, modifier) {
        return userId === userId;
    },
    remove: function (userId, reservation) {
        return false;
    }
});