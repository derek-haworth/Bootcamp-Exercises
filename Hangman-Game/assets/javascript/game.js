var wordArr = ["angrybeavers", "animaniacs", "dexterslab", "doug", "ducktales", 
                "powerpuffgirls", "rugrats","simpsons", "talespin"];

var randWord = wordArr[Math.floor(Math.random() * wordArr.length)].toLowerCase();
var wins = 0;
var losses = 0;
var wordString;
var guessesLeft = 10;
var guessArr = [];

function initialize() {
  guessesLeft = 10;
  for (var i = 0; i < randWord.length; i++) {
    guessArr[i] = "__ ";
  }

  wordString = guessArr.join("");
  document.getElementById("currentWord").innerHTML = wordString;
}


document.onkeyup = function(event) {
  var res = "";
  var userGuess = event.key;
  var choices = /[a-zA-Z0-9]+/g;
  res = userGuess.match(choices);
  var guesses = 0;
  document.getElementById("guessLetters").innerHTML += res;    

  if (res) {
    for (var i = 0; i < randWord.length; i++) {
      if (randWord[i] === res) {
        alert("working");
        guessArr[i].appendChild(res);
      }
    }
    guesses++;
    document.getElementById("guessRemain").innerHTML = guessesLeft--;
    document.getElementById("currentWord").innerHTML = guessArr.join(" ");

    if (guesses === 0) {
      guessesLeft--;
    }
    if (guessesLeft === -1) {
      losses++;
      document.querySelector("#losses").innerHTML = losses;
      initialize();
    } else if ( guessArr[i].indexOf("__") == -1) {
      wins++;
      document.querySelector("#wins").innerHTML = wins;
      initialize();
    }
  //non number or letter entered
  } else {
    alert("Please use alpha-numerical values");
  }

} // end onkeyup


//start game
initialize();


