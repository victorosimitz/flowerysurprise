if (Meteor.isClient) {
  //nav functions
  
  Template.page.message = function()
  {
	if(Session.get("showScreen"))
	  return Session.get("showScreen").message || null;
	return null;
  };

  var getCurrentPageName = function() //convenience method: extract the name of the current screen
  {
	if(!Session.get("showScreen")) return undefined;
	return Session.get("showScreen").screen_name;
  };

  var switchToHomePage = function(message)
  {
    Session.set("showScreen",{screen_name: "home", message:message});
  };

  Template.page.showHomePage = function()
  {
	return (getCurrentPageName()=="home" || !getCurrentPageName());
  };
  
  Template.page.currentPageName = function()  //testing purposes only!
  {
	return JSON.stringify(Session.get("showScreen")) || "[unset]";
  };
  
  var switchToSendFlowersPage = function(message)
  {
    Session.set("showScreen",{screen_name: "sendFlowers", message:message});
  };

  Template.page.showSendFlowersPage = function()
  {
	return (getCurrentPageName()=="sendFlowers");
  };
  
  var switchToPayForFlowersPage = function(message)
  {
    Session.set("showScreen",{screen_name: "payForFlowers", message:message});
  };
  
  Template.page.showPayForFlowersPage = function()
  {
    return (getCurrentPageName()=="payForFlowers");
  };
  
  var switchToOrderConfirmationPage = function(message)
  {
    Session.set("showScreen",{screen_name: "orderConfirmation", message:message});
  };
  
  Template.page.showOrderConfirmationPage = function()
  {
    return (getCurrentPageName()=="orderConfirmation");
  };
  
  //home template 
 
  Template.home.events({
    "click #send_flowers_btn": function(){
      switchToSendFlowersPage();
    }
  });
  
  //sendFlowers template
  
  Template.sendFlowers.events({
    "click #continue": function(){
      switchToPayForFlowersPage();
    }
  });
  
  //payForFlowers template
  
  Template.payForFlowers.events({
    "click #finish_order_btn": function(){
      switchToOrderConfirmationPage();
    }
  });
  
  //orderConfirmation template
  
  Template.orderConfirmation.events({
    "click #send_another_btn": function(){
      switchToHomePage();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
