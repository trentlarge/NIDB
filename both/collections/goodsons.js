this.Goodsons = new Mongo.Collection("goodsons");

this.Goodsons.userCanInsert = function(userId, doc) {
	return true;
}

this.Goodsons.userCanUpdate = function(userId, doc) {
	return true;
}

this.Goodsons.userCanRemove = function(userId, doc) {
	return true;
}
