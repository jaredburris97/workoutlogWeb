$(function(){
	$.extend(WorkoutLog, {	

		signup: function(){								//signup method			
			console.log("WorkoutLog.signup");

			var username = $("#su_username").val();		//username & password variables
			var password = $("#su_password").val();			
			var user = {								//user object
				user: {
					username: username,
					password: password
				}
			};

			var signup = $.ajax({						//signup post
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify( user ),
				contentType: "application/json"
			});

			//signup done/fail
		
			signup.done(function(data) {				//signup done/fail
				if (data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
					console.log("You made it!");
					console.log("Here is the data.sessionToken: " + data.sessionToken);
				}

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");

				$('a[href="#define"]').tab('show');
				$("#su_username").val("");
				$("#su_password").val("");

				console.log("Great job signing up!");

			}).fail(function() {
				$("#su_error").text("There was an issue with sign up").show();
			});
		},


		//login method
		login: function() {		//SYNTAX ERROR???

			
			//login variables
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = {
				user: {
					username: username,
					password: password
				}
			};
			//login POST
			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify( user ),
				contentType: "application/json"
			});
			//login done/fail
			login.done(function(data) {
				if (data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
										}
					$("#login-modal").modal("hide");
					$(".disabled").removeClass("disabled");
					// $("#loginout").text("Logout");
					$("#loginout").replaceWith($("#su_username"));

					$("#li_username").val("");
					$("#li_password").val("");
					$('a[href="#define"]').tab("show");

			}).fail(function() {
				$("#li_error").text("There was an issue with login").show();
			});
		},
		
		loginout: function() {							//logout method
			if (window.localStorage.getItem("sessionToken")) {
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}
			//TODO: on logout make sure stuff is disabled
			$(".tab1").addClass("disabled");
			//need to clear history, Log list, hide logout button
			$("#logoutBtn").style.display = 'none';

			console.log("Logged out.")
		}
	}); //end workoutlog

	$("#signup-modal").on("shown.bs.modal", function(){
		$("#su_username").focus();
	});

	$("#login-modal").on("shown.bs.modal", function(){
		$("#li_username").focus();
	});

	//bind events
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	

	if(window.localStorage.getItem("sessionToken")) {
		$("#loginout").text("User");
	}
}); //end outside function