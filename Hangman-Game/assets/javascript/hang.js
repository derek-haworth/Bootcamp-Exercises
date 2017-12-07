var wins = 0,
    losses = 0,
    guessesRemain = "?",
    imageOuput,
    gameStarted = false,

    //arrays
    wordArr = ["Angry Beavers", "Animaniacs", "Dexters Lab", "Doug", "Ducktales", "Powerpuff Girls", "Rugrats","Simpsons", "Talespin", "Tiny Toon Adventures", "Pokemon", "Rockos Modern Life", "Hey Arnold", "CatDog", "Ren and Stimpy"],
    keys = [],
    currentWord = [],
    wrongGuesses = [],
    randomWord = [],
    chosenWord = [],
    imageOuput,
    imageLetters = [];


document.getElementById("wins").innerHTML = wins;
document.getElementById("losses").innerHTML = losses;
document.getElementById("guessesRemain").innerHTML = guessesRemain;


// Creates alphabet array
for (var i = 65; i <= 90; i++) {
    keys[keys.length] = String.fromCharCode(i); // will spit out Uppercase
};

function initialize() {

    gameStarted = true;
    currentWord = [];
    wrongGuesses = [];
    imageLetters = [];
    
    randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    chosenWord = randomWord.toUpperCase();
    guessesRemain = randomWord.length + 2;
   
    for (var i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === " ") {
            // Puts a space if word has spance
            currentWord[i] = " ";
        } else {
            // Puts underscores as placeholders
            currentWord[i] = "_"; 
            // Creating array to be used for image source
            imageLetters[i] = randomWord[i].toLowerCase();
        }

        var placeHolder = currentWord.join("");    
    };

    document.getElementById("currentWord").innerHTML = placeHolder;
    //image source
    imageOuput = imageLetters.join("");
};

initialize();
    
document.onkeyup = function(event) {
    var userGuess = event.key.toUpperCase();
    var isGuessCorrect = false;

    // Is keys part of the alphabet?
    if(keys.includes(userGuess)) {        
        // Checks for a match
        for (var j = 0; j < chosenWord.length; j++) {    
            if (chosenWord[j] === userGuess) {
                currentWord[j] = userGuess;
                isGuessCorrect = true;
            }
        }
    }

    // Subtract from guess && add letter to guessed letters
    if(!wrongGuesses.includes(userGuess) && keys.includes(userGuess) && !chosenWord.includes(userGuess)) {
        guessesRemain--;
        wrongGuesses.push(userGuess);
    }

    // Concatenate correctly guessed letters
    var winningWord = currentWord.join("");
    
    //wins
    if (winningWord === chosenWord) {
        document.getElementById("image").setAttribute("src", "assets/images/" + imageOuput +".jpg");
        wins++;
        initialize();
    }
    //losses
    if (guessesRemain === 0) {
        alert(`The word was ${randomWord}`);
        document.getElementById("image").setAttribute("src", "assets/images/" + imageOuput +".jpg");
        losses++;
        initialize();
    }

    document.getElementById("guessLetters").innerHTML = wrongGuesses.join(" ");
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guessesRemain").innerHTML = guessesRemain;
    document.getElementById("currentWord").innerHTML = currentWord.join("");
    

};