if (Meteor.isClient) {
  //nav functions
  
  Template.page.message = function()
  {
	if(Session.get("showPage"))
	  return Session.get("showPage").message || null;
	return null;
  };

  var getCurrentPageName = function() //convenience method: extract the name of the current screen
  {
	if(!Session.get("showPage")) return undefined;
	return Session.get("showPage").screen_name;
  };

  var switchToHomePage = function(message)
  {
    Session.set("showPage",{screen_name: "home", message:message});
  };

  Template.page.showHomePage = function()
  {
	return (getCurrentPageName()=="home" || !getCurrentPageName());
  };
  
  Template.page.currentPageName = function()  //testing purposes only!
  {
	return getCurrentPageName() || "[unset]";
  };
  
  var switchToSendFlowersPage = function(message)
  {
    Session.set("showPage",{screen_name: "sendFlowers", message:message});
  };

  Template.page.showSendFlowersPage = function()
  {
	return (getCurrentPageName()=="sendFlowers");
  };
  
  //home template 
 
  Template.home.events({
    "click #send_flowers_btn": function(){
      switchToSendFlowersPage();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
