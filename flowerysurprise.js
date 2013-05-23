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
  
  var switchToPayForFlowersPage = function(order_id, message)
  {
    if(!order_id)
      return; //do nothing if we don't have an order id to attach to
    Session.set("showScreen",{screen_name:"payForFlowers", order_id:order_id, message:message});
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
  
  Template.sendFlowers.events({  //TODO fix the commented code -- there is some bug there
    "click #continue": function(){
      name = document.getElementById("name").value.trim();
      address = document.getElementById("address").value.trim();
      city = document.getElementById("city").value.trim();
      state = document.getElementById("state").value.trim();
      zip = document.getElementById("zip").value.trim();
      phone = document.getElementById("phone").value.trim();
      special_instructions = document.getElementById("special_instructions").value.trim();
      order_data = {name: name,
                    dest: {address: address,
                           city: city,
                           state: state,
                           zip: zip},
                    phone: phone,
                    special_instructions: special_instructions};
      alert(JSON.stringify(order_data));
      Meteor.call("createOrder",order_data, function(e, r){
        if(!e)
        {
          switchToPayForFlowersPage(r /*order id*/);
        }
        else{
          alert(JSON.stringify(e));
        }
      });
//       switchToPayForFlowersPage("abc"); //call with temporary dummy id
    }
  });
  
  //payForFlowers template
  
  Template.payForFlowers.events({
    "click #finish_order_btn": function(){
      switchToOrderConfirmationPage();
    }
  });
  
  Template.payForFlowers.orderId = function(){
    return Session.get("showScreen").order_id || "[unset]";
  };
  
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