Meteor.publish("confirmed_reservation", function () {
    return Reservations.find({
        $or:[
                {"status": 1},
                {"status": 4}
            ]});
});

