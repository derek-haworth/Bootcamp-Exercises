$(document).ready(function(){

// Initialize Firebase
	var config = {
    	apiKey: "AIzaSyDxW5Q7ji3Dw1-6cF5KpdNL9Ih_gG1httc",
    	authDomain: "train-schedule-bfc3e.firebaseapp.com",
    	databaseURL: "https://train-schedule-bfc3e.firebaseio.com",
    	projectId: "train-schedule-bfc3e",
    	storageBucket: "train-schedule-bfc3e.appspot.com",
    	messagingSenderId: "619410174523"
  	};

  	firebase.initializeApp(config);

	var database = firebase.database();

	$("#addEmployee").on("click", function() {

		event.preventDefault();

		var name = $("#name").val().trim();
		var role = $("#role").val().trim();
		var frequency = $("#frequency").val().trim();
		var time = $("#time").val();

		var newEmployee = {
			name: name,
			role: role,
			start: time,
			frequency: frequency
		}

		// Upload to the database
		database.ref().push(newEmployee);

		//clear out the fields after submitting
		name = $("#name").val("");
		role = $("#role").val("");
		frequency = $("#frequency").val("");
		start = $("#time").val("");

	});// end on-click event

	database.ref().on("child_added", function(childSnapshot) {

		// Store it
		var name = childSnapshot.val().name;
		var role = childSnapshot.val().role;
		var start = childSnapshot.val().start;
		var frequency = childSnapshot.val().frequency;

		$("#trainRows").prepend("<tr><td>" + name + "</td><td>" + role + "</td><td>" + frequency + "</td><td>" + start + "</td><td>" + "x" + "</td></tr>");

	});


});














