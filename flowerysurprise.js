if (Meteor.isClient) {
  Template.hello.events({   });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
