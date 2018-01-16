var nextTrain = '',
	nextTrainFormatted = '',
	minutesAway = '',
	firstTimeConverted = '',
	currentTime = '',
	diffTime = '',
	timeRemain = '',
	minutesTilTrain = '';


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

		var name = $("#name").val().trim();
		var destination = $("#destination").val().trim();
		var frequency = $("#frequency").val().trim();
		var firstTrain = $("#time").val().trim();

		firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
		currentTime = moment();
		diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		timeRemain = diffTime % frequency;
		minutesTilTrain = frequency = timeRemain;
		nextTrain = moment().add(minutesTilTrain, "minutes");
		nextTrainFormatted = moment(nextTrain).format("hh:mm");

		var newTrain = {
			name: name,
			destination: destination,
			//start: firstTrain,
			frequency: frequency,
			//nextTrainFormatted: nextTrainFormatted,
			minutesTilTrain: minutesTilTrain
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

		var rowId = database.ref().key;
		console.log(rowId);

		// Store it
		var name = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var start = childSnapshot.val().start;
		var frequency = childSnapshot.val().frequency;
		var nextTrain = childSnapshot.val().nextTrainFormatted;
		var minAway = childSnapshot.val().minutesTilTrain;

		$("#trainRows").prepend(
			"<tr id=" + "'" + rowId + "'" + "><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td><td>" + "<input type='submit' value='Remove' class='remove-train btn btn-primary btn-sm'></td></tr>"
		);

	});

	$("body").on("click", ".remove-train", function() {
		debugger;

		// DEBUGGING

		// When clicking delete, find the row associated with the button - delete it
		// Next find the id of said row and remove that key value from the database
    	$(this).closest("tr").remove();
    	var getKey = $(this).parent().parent().attr("id");
    	database.ref().child(getKey).remove();
	});



});














