Meteor.publish("customer_list", function() {
	return Customers.find({}, {transform:function(doc) { var sum = 0; Goodmans.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
});

Meteor.publish("customers", function() {
	return Customers.find({}, {});
});

Meteor.publish("customers_empty", function() {
	return Customers.find({_id:null}, {});
});

Meteor.publish("customer", function(customerId) {
	return Customers.find({_id:customerId}, {});
});

