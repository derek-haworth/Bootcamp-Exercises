var game = {
  words: {
    angryBeavers: {
      title: "AngryBeavers",
      image: "assets/images/angryBeavers.png",
    },
    animaniacs: {
      title: "Animaniacs",
      image: "assets/images/animaniacs.jpg",
    },
    dextersLab: {
      title: "DextersLab",
      image: "assets/images/dextersLab.jpg",
    },
    doug: {
      title: "Doug",
      image: "assets/images/doug.jpg",
    },
    duckTales: {
      title: "DuckTales",
      image: "assets/images/duckTales.jpg",
    },
    powerPuff: {
      title: "PowerPuffGirls",
      image: "assets/images/powerPuff.jpg",
    },
    rugrats: {
      title: "Rugrats",
      image: "assets/images/rugrats.jpg",
    },
    talespin: {
      title: "Talespin",
      image: "assets/images/taleSpin.jpg",
    },
    simpsons: {
      title: "Simpsons",
      image: "assets/images/Simpsons.jpg",
    }
  },
  	word: null,
  	letters: [],
	  matchedLetters: [],
  	guessedLetters: [],
  	totalGuesses: 0,
  	wins: 0,
	  losses: 0,

	getGame: function() {
		placeholder = "";
		guessesLeft = 10;
		lettersGuessed = "";

		var objKeys = Object.keys(this.words);
		this.word = objKeys[Math.floor(Math.random() * objKeys.length)].toLowerCase();
		this.letters = this.word.split("");
		this.wordView();
	},

	wordView: function() {

    var wordView = "";
    for (var i = 0; i < this.letters.length; i++) {

      if (this.matchedLetters.indexOf(this.letters[i]) !== -1) {
        wordView += this.letters[i];
      }
      else {
        wordView += "_ <span></span>";
      }
    }

    	document.querySelector("#currentWord").innerHTML = wordView;
  	},

};

var lettersGuessed = "";
var guessesLeft;
var placeholder;
game.getGame();


document.onkeyup = function(event) {
	lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	var correct = 0;

	document.getElementById("guessLetters").innerHTML += lettersGuessed;
	document.getElementById("guessRemain").innerHTML = guessesLeft;

	for (var i = 0; i < game.letters.length; i++) {
		if (lettersGuesssed == game.word.substring(i, i + 1)) {
			correct++;
			placeholder = placeholder.substring(0, i) + userGuess + placeholder.substring(i +1, placeholder.length +1);
			document.getElementById("currentWord").innerHTML = placeholder;
		}
	}
	
	if (correct === 0) {
	  	guessesLeft--;
	}

	if (placeholder.indexOf("_") == -1) {
		game.wins++;
		var userWins = game.wins;
		document.querySelector("#wins").innerHTML = userWins;
		document.getElementById("image").src = game.words[game.word].image;

		var correctGuess = " ";
		document.querySelector("#guessLetters").innerHTML = correctGuess;
		game.getGame();
	}
	
	if (guessesLeft === -1) {
		game.losses++;
		var userLoses = game.losses;
		document.querySelector("#losses").innerHTML = userLoses;
		game.getGame();
	}
}

