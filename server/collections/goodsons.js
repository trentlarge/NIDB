Goodsons.allow({
	insert: function (userId, doc) {
		return Goodsons.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Goodsons.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Goodsons.userCanRemove(userId, doc);
	}
});

Goodsons.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Goodsons.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Goodsons.before.remove(function(userId, doc) {
	
});

Goodsons.after.insert(function(userId, doc) {
	
});

Goodsons.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Goodsons.after.remove(function(userId, doc) {
	
});
