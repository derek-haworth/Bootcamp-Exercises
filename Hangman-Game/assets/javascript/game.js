var wordsArr = ["Angry Beavers", "Animaniacs", "Dexters Lab", "Doug", "DuckTales", "PowerPuff Girls", "Rugrats", "TaleSpin", "Simpsons" ];


var wins = 0;
var losses = 0;
var guesses = 0;



// Execute Game after refresh/inital load
window.onload = newGame();

function newGame() {

	var word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
	// Use RegEx to add underscores
	var underscores = word.replace(/.{1}/g, "_ ");
	document.getElementById("placeholder").innerHTML = underscores;
	
	//Add underscores
	var underscores = "";
	for ( i = 0; i < word.length; i++) {
		//if (word contains spaces) {
			//split the word
		//} else {
			underscores = underscores + "_ "
		//}
	}
}



document.onkeyup = function(event) {
	var userGuess = event.key.toLowerCase();
	var choices = /[a-z]+/g;
	var res = userGuess.match(choices);

	if (!res) {
		alert("Letters Only, Please");  
	}

	// var word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
	// var underscores = word.replace(/.{1}/g, "_ ");

	// document.getElementById("placeholder").innerHTML = underscores;
}
