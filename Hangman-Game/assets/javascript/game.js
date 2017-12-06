var words = ["Angry Beavers", "Animaniacs", "Dexters Lab", "Doug", "DuckTales", "PowerPuff Girls", "Rugrats", "TaleSpin", "Simpsons" ];

var wins = 0;
var losses = 0;
var guesses = 0;



document.onkeyup = function(event) {
	var userGuess = event.key;
	var choices = /[a-zA-Z]+/g;
	var res = userGuess.match(choices);

	document.getElementById("demo").innerHTML = res;

	 if (!res){
	    alert("Letters Only, Please");  
	 }

}
