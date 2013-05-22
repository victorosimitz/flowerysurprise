if (Meteor.isClient) {
  
  Template.page.message = function()
  {
    if(Session.get("showScreen"))
      return Session.get("showScreen").message || null;
    return null;
  };

  var getCurrentScreenName = function() //convenience method: extract the name of the current screen
  {
    if(!Session.get("showScreen")) return undefined;
    return Session.get("showScreen").screen_name;
  }

  var switchToHomePage = function(message)
  {
    Session.set("showPage","home");
  };

  Template.page.showHomePage = function()
  {
    return (getCurrentScreenName()=="home" || !getCurrentScreenName());
  };
  
  Template.page.events({
    'click #navbar_myEvents, click #navbar_home' : function()
    {
      switchToMyEventsScreen();
    },
    'click #navbar_createEvent' : function()
    {
      switchToCreateOrUpdateEventScreen();
    }
  });
}