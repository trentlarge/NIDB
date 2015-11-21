var pageSession = new ReactiveDict();

Template.GoodsonsDetails.rendered = function() {
	
};

Template.GoodsonsDetails.events({
	
});

Template.GoodsonsDetails.helpers({
	
});

Template.GoodsonsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("goodsonsDetailsDetailsFormInfoMessage", "");
	pageSession.set("goodsonsDetailsDetailsFormErrorMessage", "");

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

Template.GoodsonsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("goodsonsDetailsDetailsFormInfoMessage", "");
		pageSession.set("goodsonsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var goodsonsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(goodsonsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("goodsonsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("goodsonsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("goodsons", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("goodsons", {});
	}

	
});

Template.GoodsonsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("goodsonsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("goodsonsDetailsDetailsFormErrorMessage");
	}
	
});
