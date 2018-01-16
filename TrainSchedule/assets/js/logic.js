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

	$("#addTrain").on("click", function() {

		event.preventDefault();

		var firstTrain = $("#time").val().trim();
		var date = new Date();
		newHourMin = firstTrain.split(':');
		date.setHours(newHourMin[0]);
		date.setMinutes(newHourMin[1]);

		var start = moment(date).unix();
		var name = $("#name").val().trim();
		var destination = $("#destination").val().trim();
		var frequency = $("#frequency").val().trim();

		var newTrain = {
			name: name,
			destination: destination,
			start: start,
			frequency: frequency
		}

		// Upload to the database
		database.ref().push(newTrain);

		//clear out the fields after submitting
		name = $("#name").val("");
		destination = $("#destination").val("");
		frequency = $("#frequency").val("");
		firstTrain = $("#time").val("");

	});// end on-click event

	database.ref().on("child_added", function(childSnapshot) {

		// Store it
		var name = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var start = childSnapshot.val().start;
		var frequency = childSnapshot.val().frequency;

		var now = moment();
		var newTime = moment.unix(start);
		var away = moment(now).diff(newTime, "minutes") % frequency;
		var minAway = frequency - away;
		var arrival = moment(now).add(minAway, "minutes");
		var nextArrival = moment(arrival).format('HH:mm');


		// childSnapshot.key = unique id in firebase
		$("#trainRows").prepend(
			"<tr id=" + "'" + childSnapshot.key + "'" + "><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td><td>" + "<input type='submit' value='Remove' class='remove-train btn btn-primary btn-sm'></td></tr>"
		);

	});

	$("body").on("click", ".remove-train", function() {

		// When clicking delete, find the row associated with the button - delete it
		// Next find the id of said row and remove that key value from the database
    	$(this).closest("tr").remove();
    	var getKey = $(this).parent().parent().attr("id");
    	database.ref().child(getKey).remove();
	});



});














