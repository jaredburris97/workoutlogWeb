// $(document).ready(function(){	//anonymous function// When the html doc has loaded run all code
// 	$("#testAPI").on("click", function(){			// When the #testAPI ID is click
// 		console.log("It is working! Holy cow!");	// Print to the console "it works..etc"
// 	});

// 	var test = $.ajax({									// Assigns the ajax request to test
// 		type: "GET",									// Request for "GETTING" data
// 		url: "http://localhost:3000/api/test"			// Location of data
// 	})
// 	.done(function(data){								// When "test", the ajax call, is run
// 		console.log(data);								// Print the ajax call's data to the console
// 	})
// 	.fail(function(){									// If the ajax call request fails,
// 		console.log("Oh no! No data! Epic fail!")		// Print to the console "Oh no!"
// 	});
// });

$(function(){

	var WorkoutLog = (function($, undefined) {
		var API_BASE = "http://localhost:3000/api/";
		var userDefinitions = [];

		var setAuthHeader = function(sessionToken) {
			window.localStorage.setItem("sessionToken", sessionToken);
			// Set the authorization header
			// This can be done on individual calls
			// here we showcase ajaxSetup as a global tool
			$.ajaxSetup({
				"headers": {
					"Authorization": sessionToken
				}
			});
		};

		// public
		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		};

	})(jQuery);

	// Ensure .disabled are not clickable
	$('.nav-tabs a[data-toggle="tab"]').on("click", function(e) {
		var token = window.localStorage.getItem("sessionToken");
		if ($(this).hasClass("disabled") && !token) {
			e.preventDefault();
			return false;
		}
	});

	//bind tab change events
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var target = $(e.target).attr("href"); // activated tab
		if (target === "#log") {
			WorkoutLog.log.setDefinitions("log");
		}

		if (target === "#update-log") {
			WorkoutLog.log.setDefinitions("update");
		}

		if (target === "#history") {
			WorkoutLog.log.setHistory();
		}
	});

	//bind enter key
	$(document).on("keypress", function(e) {
		if (e.which === 13) { //enter key
			if ($("#singup-modal").is(":visible")) {
				$("#signup").trigger("click");
			}
			if ($("#login-modal").is(":visible")) {
				$("#login").trigger("click");
			}
		}
	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var target = $(e.target).attr("href"); //activated tab
		if (target === "#log") {
			WorkoutLog.log.setDefinitions();
		}

		if(target === "#history") {
			WorkoutLog.log.setHistory();
		}
	});


	//setHeader if we
	var token = window.localStorage.getItem("sessionToken");
	if (token) {
		WorkoutLog.setAuthHeader(token);
	}
	//expose this to the other workoutlog modules
	window.WorkoutLog = WorkoutLog;
});