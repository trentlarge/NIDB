Meteor.publish("goodsons", function() {
	return Goodsons.publishJoinedCursors(Goodsons.find({}, {}));
});

Meteor.publish("goodsons_empty", function() {
	return Goodsons.publishJoinedCursors(Goodsons.find({_id:null}, {}));
});

Meteor.publish("goodson", function(customerId) {
	return Goodsons.publishJoinedCursors(Goodsons.find({_id:customerId}, {}));
});

