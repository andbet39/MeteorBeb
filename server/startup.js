Meteor.startup(function () {
    Reservations._ensureIndex({reservation_code: 1}, {unique: 1});

    // use Future here
});

