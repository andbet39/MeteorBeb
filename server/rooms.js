/**
 * Created by andreaterzani on 11/10/15.
 */
Meteor.publish("rooms", function () {
    return Rooms.find()
});