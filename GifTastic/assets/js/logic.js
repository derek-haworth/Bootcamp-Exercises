// Creating an array for topics 
var topics = [];
var prependString = "";
var appendString = "";
var globalObj = {};


// Create the buttons
function buildButton(value) {
	var $newButton = $("<button>");
	var inputValue = value;
	$newButton.attr("data-query", inputValue);
	$newButton.attr("data-delete", false);
	$newButton.text(inputValue);
	$newButton.addClass("btn btn-primary api-query");
	$("#buttons-container").append($newButton);
}


// Creates the images from API call.
function createImg(imgObj) {
	var $newImg = $("<img>", {
		data: {
			"stop": imgObj.images.fixed_width_still.url,
			"animate": imgObj.images.fixed_width.url,
			"rating": imgObj.rating.toUpperCase(),
			"state": "stop"
		},
		class: "img-responsive image-gifs",
		src: imgObj.images.fixed_width_still.url
	});

	var $rating = $('<p class="h4 text-center">').text("Rating: " + $newImg.data("rating"));

	$("#gif-container").append($("<li>", {
		class: "img-container"
	}).append($newImg, $rating));

}


// Ajax call 
function postAjaxObject(doThis, search, numItems) {

	search = prependString + search + appendString;

	// function to call rating in ajax request
	var queryURL = function(gifRating) {
		return "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=c3ycttCoAtqr4njPM7TLCrQRNefONEHY&rating=" + gifRating;
	}

	$.ajax({
		url: queryURL("PG-13"),
		method: "GET"
	}).done(function(response) {
		console.log(response);

		var data = response.data;
		var dataSize = data.length;
		var randIndex;
		var prevRandIndexes = [];

		// at least 1 gif in respone
		if (dataSize != 0) {
			// on each click, randomly select gifs from data and push into empty array to display on page
			for (var i = 0; i < numItems; i++) {
				randIndex = Math.floor(Math.random() * dataSize);
				while (prevRandIndexes.indexOf(randIndex) !== -1) {
					randIndex = Math.floor(Math.random() * dataSize);
				}
				prevRandIndexes.push(randIndex);
				doThis(data[randIndex]);
			}
			prevRandIndexes = [];

		// error-handling
		} else {
			alert("Giphy could not find any results for " + search);
		}

	}); // ajax function
}


$(document).ready(function() {

	// get the localStorage items if any
	if (localStorage.getItem("topicsArray")) {
		topics = localStorage.getItem("topicsArray").split(",");
	}

	for (var i = 0; i < topics.length; i++) {
		buildButton(topics[i]);
	}

	$("#submit-input").on("click", function(event) {
		//prevent form submission
		event.preventDefault();

		var searchTerm = $("#input-bar").val();
		if ($("#input-bar").val()) {
			buildButton(searchTerm);
			topics.push(searchTerm);
			$("#input-bar").val("");
		}
	});


	$("#buttons-container").on("click", ".api-query", function() {
		if ($(this).attr("data-delete") !== "true") {
			$("#gif-container").empty();
			postAjaxObject(createImg, $(this).attr("data-query"), 12);
		}
	});


	// change gif from static to animated
	$("#gif-container").on("click", ".image-gifs", function() {

		var state = $(this).data("state");

		if (state == "stop") {
			$(this).attr("src", $(this).data("animate"));
			$(this).data("state", "animate")
		} else {
			$(this).attr("src", $(this).data("stop"));
			$(this).data("state", "stop")
		}

	});

	// Save topics to localStorage for later use  
	$("#save-button").on("click", function() {
		localStorage.setItem("topicsArray", topics);
	});

	// Delete saved topics
	$("#delete-button").on("click", function() {
		//will delete save topics
	});

}); // end document.ready

