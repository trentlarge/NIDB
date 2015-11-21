var pageSession = new ReactiveDict();

Template.GoodsonsInsert.rendered = function() {
	
};

Template.GoodsonsInsert.events({
	
});

Template.GoodsonsInsert.helpers({
	
});

Template.GoodsonsInsertInsertForm.rendered = function() {
	

	pageSession.set("goodsonsInsertInsertFormInfoMessage", "");
	pageSession.set("goodsonsInsertInsertFormErrorMessage", "");

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

Template.GoodsonsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("goodsonsInsertInsertFormInfoMessage", "");
		pageSession.set("goodsonsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var goodsonsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(goodsonsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("goodsonsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("goodsons", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("goodsonsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Goodsons.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.GoodsonsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("goodsonsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("goodsonsInsertInsertFormErrorMessage");
	}
	
});
