/***********************************************
 * Orders: orders for flowers
 * to_name Name of the person receiving flowers
 * dest e.g. {address: "47 Olmsted Rd",
 *   city: "Stanford", state: "CA", zip: "94305"}
 * to_phone
 * special_instructions
 */

Orders = new Meteor.Collection("orders");

Orders.allow({   //don't let the client write directly to the db for now
  insert: function(userId, meal){
    return false;
  },
  update: function(userId, docs, fieldNames, modifier){
    return false;
  },
  remove: function(userId, docs){
    return true; //TODO should disable this and add a delete function in the methods below
  }
});

if(Meteor.isServer)
{
  Orders.validateOrder = function(order_data)
  {
    return true; //TODO make it smarter
  };
  
  Meteor.methods({
    createOrder: function(order_data)
    {
      order_data = order_data || {};
      if(!order_data.owner)
      {
        order_data.owner = this.userId;
      }
      if(!Orders.validateOrder(order_data))
	  {
		console.log("Error in createOrder: invalid order " + JSON.stringify(order_data));
		throw new Meteor.Error(400, "Invalid order");
	  }
	  order_id = Orders.insert(order_data);
	  return order_id; 
    }
  });
}