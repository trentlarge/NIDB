var pageSession = new ReactiveDict();

Template.Goodsons.rendered = function() {
	
};

Template.Goodsons.events({
	
});

Template.Goodsons.helpers({
	
});

var GoodsonsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("GoodsonsViewSearchString");
	var sortBy = pageSession.get("GoodsonsViewSortBy");
	var sortAscending = pageSession.get("GoodsonsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["customerId", "date", "one", "two", "three", "four", "five", "six", "six"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var GoodsonsViewExport = function(cursor, fileType) {
	var data = GoodsonsViewItems(cursor);
	var exportFields = ["date", "one", "two", "three", "four", "five", "six", "six"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.GoodsonsView.rendered = function() {
	pageSession.set("GoodsonsViewStyle", "table");
	
};

Template.GoodsonsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("GoodsonsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("GoodsonsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("GoodsonsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("goodsons.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		GoodsonsViewExport(this.goodsons, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		GoodsonsViewExport(this.goodsons, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		GoodsonsViewExport(this.goodsons, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		GoodsonsViewExport(this.goodsons, "json");
	}

	
});

Template.GoodsonsView.helpers({

	

	"isEmpty": function() {
		return !this.goodsons || this.goodsons.count() == 0;
	},
	"isNotEmpty": function() {
		return this.goodsons && this.goodsons.count() > 0;
	},
	"isNotFound": function() {
		return this.goodsons && pageSession.get("GoodsonsViewSearchString") && GoodsonsViewItems(this.goodsons).length == 0;
	},
	"searchString": function() {
		return pageSession.get("GoodsonsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("GoodsonsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("GoodsonsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("GoodsonsViewStyle") == "gallery";
	}

	
});


Template.GoodsonsViewTable.rendered = function() {
	
};

Template.GoodsonsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("GoodsonsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("GoodsonsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("GoodsonsViewSortAscending") || false;
			pageSession.set("GoodsonsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("GoodsonsViewSortAscending", true);
		}
	}
});

Template.GoodsonsViewTable.helpers({
	"tableItems": function() {
		return GoodsonsViewItems(this.goodsons);
	}
});


Template.GoodsonsViewTableItems.rendered = function() {
	
};

Template.GoodsonsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("goodsons.details", {customerId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Goodsons.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Goodsons.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("goodsons.edit", {customerId: this._id});
		return false;
	}
});

Template.GoodsonsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
