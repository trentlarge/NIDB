var pageSession = new ReactiveDict();

Template.GoodsonsEdit.rendered = function() {
	
};

Template.GoodsonsEdit.events({
	
});

Template.GoodsonsEdit.helpers({
	
});

Template.GoodsonsEditEditForm.rendered = function() {
	

	pageSession.set("goodsonsEditEditFormInfoMessage", "");
	pageSession.set("goodsonsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.GoodsonsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("goodsonsEditEditFormInfoMessage", "");
		pageSession.set("goodsonsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var goodsonsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(goodsonsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("goodsonsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("goodsons", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("goodsonsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Goodsons.update({ _id: t.data.goodson._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("goodsons", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.GoodsonsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("goodsonsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("goodsonsEditEditFormErrorMessage");
	}
	
});
