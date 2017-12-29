$(document).ready(function() {

    var audio = new Audio("assets/theme-song.mp3");
    audio.play();

    var correctAnswers = 0,
        incorrectAnswers = 0,
        unanswered = 0,
        questionNumber = 0,
        lastQuestion = 10,
        correctAnswerHolder,
        timeSetting = 30,   // time for each question
        timeOut = 1000 * 3, // time between questions
        intervalId,
        timerRunning = false,
        timedOut = false,
        isCorrect = false,
        questionsWrapper = $(".questions-wrapper");

    // Questions
    var questions = [
        {
            // Question 1
            question: "What is the film's famous tagline?",
            optionA: "An Adventure 60 Million Years in the Making",
            correctAnswer: "An Adventure 65 Million Years in the Making",
            optionC: "An Adventure 160 Million Years in the Making",
            optionD: "An Adventure 165 Million Years in the Making",
            image: "tagline.jpg"
        },
        {
            // Question 2
            question: "What does Juanito say when he inspects the mosquito trapped in amber?",
            optionA: "Que linda estas...",
            optionB: "Que lindo estas...",
            optionC: "Que linda eres...",
            correctAnswer: "Que lindo eres...",
            image: "juanito-quote.jpg"
        },
        {
            // Question 3
            question: "What is Dr. Ellie Sattler's occupation",
            optionA: "Paleontologist",
            correctAnswer: "Paleobotanist",
            optionC: "Paleoclimatologist",
            optionD: "Paleoarchaeologist",
            image: "ellie-occupation.jpg"
        },
        {
            // Question 4
            question: "Who is the first character in the film to say \"Jurassic Park\"?",
            optionA: "Dr. Alan Grant",
            correctAnswer: "John Hammond",
            optionC: "Dr. Ian Malcolm",
            optionD: "Donald Gennaro",
            image: "jp-quote.jpg"
        },
        {
            // Question 5
            question: "According to Muldoon, at what age do the velociraptors become lethal?",
            optionA: "Two months",
            optionB: "Four months",
            optionC: "Six months",
            correctAnswer: "Eight months",
            image: "muldoon-raptors.jpg"
        },
        {
            // Question 6
            question: "What is the first stop on the Jurassic Park tour?",
            optionA: "Brachiosaurus enclosure",
            optionB: "T. rex paddock",
            correctAnswer: "Dilophosaurus paddock",
            optionD: "Gallimimus enclosure",
            image: "jp-tour.jpg"
        },
        {
            // Question 7
            question: "What is Ray Arnold's famous line?",
            correctAnswer: "Hold on to your butts.",
            optionB: "Hold on to your bottoms.",
            optionC: "English, Motherf*cker, Do You Speak It?",
            optionD: "I Have Had It With These Motherf*cking Snakes On This Motherf*cking Plane!",
            image: "rays-line.jpg"
        },
        {
            // Question 8
            question: "What does the triceratops eat to make it sick?",
            correctAnswer: "West Indian lilac berries",
            optionB: "East Indian lilac berries",
            optionC: "West African lilac berries",
            optionD: "East African lilac berries",
            image: "tri-eats.jpg"
        },
        {
            // Question 9
            question: "What are Lex's eating habits?",
            optionA: "She's a vegan",
            optionB: "She's a pescetarian",
            optionC: "She's a pollotarian",
            correctAnswer: "She's a vegetarian",
            image: "lexs-habits.jpg"
        },
        {
            // Question 10
            question: "Which dinosaur embryo is NOT stolen by Dennis Nedry?",
            optionA: "Gallimimus",
            optionB: "Velociraptor",
            correctAnswer: "Triceratops",
            optionD: "Stegosaurus",
            image: "dennis-stealing.jpg"
        },
        {
            // Question 11
            question: "What does Gennaro say when he first sees the T. rex?",
            correctAnswer: "Oh Jesus",
            optionB: "Oh God.",
            optionC: "Oh Lord.",
            optionD: "Oh Christ.",
            image: "gennaro-ohjesus.jpg"
        },
        {
            // Question 12
            question: "What does Dr. Grant tell Tim NOT to do when climbing a tree?",
            optionA: "Lose your footing",
            correctAnswer: "Look down",
            optionC: "Go too fast",
            optionD: "Stop paying attention",
            image: "grant-tim-tree.jpg"
        },
        {
            // Question 13
            question: "What does the brachiosaurus do to Lex?",
            optionA: "It coughs on her",
            correctAnswer: "It sneezes on her",
            optionC: "It throws up on her",
            optionD: "It bites her",
            image: "brach-sneezing.jpg"
        },
        {
            // Question 14
            question: "According to Ray, what would the \"lysine contingency\" do to the dinosaurs?",
            optionA: "They would stop reproducing",
            optionB: "They would starve",
            correctAnswer: "They would slip into a coma and die",
            optionD: "They would stop breathing",
            image: "ray-lysine.jpg"
        },
        {
            // Question 15
            question: "What does the T. rex NOT eat during the film?",
            optionA: "A Velociraptor",
            optionB: "A lawyer",
            optionC: "A goat",
            correctAnswer: "A Triceratops",
            image: "trex-eats.jpg"
        },
        {
            // Question 16
            question: "What is Muldoon's famous last line?",
            optionA: "We're being hunted.",
            correctAnswer: "Clever Girl.",
            optionC: "Straight ahead in the bushes.",
            optionD: "I've got her.",
            image: "muldoon-famousline.jpg"
        },
        {
            // Question 17
            question: "What does Dr. Grant call Tim in the visitors center?",
            correctAnswer: "Big Tim, the human piece of toast.",
            optionB: "Little Tim, the human piece of toast.",
            optionC: "Little Timmy, the human piece of toast.",
            optionD: "Big Timmy, the human piece of toast.",
            image: "tim-toast.jpg"
        },
        {
            // Question 18
            question: "Where do Tim and Lex trap the velociraptor in the kitchen?",
            optionA: "A utility room",
            optionB: "A storage closet",
            correctAnswer: "A meat locker",
            optionD: "An oven",
            image: "raptor-locker.jpg"
        },
        {
            // Question 19
            question: "What does Hammond say after Dr. Grant tells him he's decided not to endorse his park?",
            optionA: "Me too.",
            optionB: "I know.",
            correctAnswer: "So have I.",
            optionD: "That makes two of us.",
            image: "noendorsement.jpg"
        },
        {
            // Question 20
            question: "How many humans are ACTUALLY eaten in the film?",
            optionA: "2",
            optionB: "3",
            optionC: "4",
            correctAnswer: "5",
            image: "humans-eaten.jpg"
        },
        {
            // Question 21
            question: "How many dinosaurs are ACTUALLY eaten in the film?",
            optionA: "1",
            optionB: "2",
            correctAnswer: "3",
            optionD: "4",
            image: "dinos-eaten.jpg"
        }
    ];

    // Intro Animation
    var gameWrapper = $(".game-wrapper"),
        startButton = $(".start-button"),
        logoTrivia = $(".trivia");

    // setTimeout(bodyAnimation, 1000 * 12);
    setTimeout(logoTriviaAnimation, 1000 * 2);
    setTimeout(startButtonAnimation, 1000 * 4);

     // Animates Trivia word
    function logoTriviaAnimation() {
        logoTrivia.animate({
            marginRight: "0.5em",
            opacity: "1"
        }, 500);
    };

    // Animates start button
    function startButtonAnimation() {
        startButton.animate({
            opacity: "1"
        }, 500);
    };


    // Starts a new game
    function newGame() {

        // Resets game
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        questionNumber = 0;

        // Sorts the questions in random order
        questions.sort(function(a,b){return 0.5 - Math.random()});

        nextQuestion();

    };

    // Timer
    var timer = {

        // time for each question
        timeRemaining: timeSetting,

        start: function() {

            // Sets the interval if timer is not running
            if (!timerRunning) {
                intervalId = setInterval(timer.count, 1000);
                timerRunning = true;
            }
        },

        stop: function() {
      
            // Clears the timer and resets
            clearInterval(intervalId);
            timerRunning = false;
            timer.timeRemaining = timeSetting;
        },

        count: function() {

            // Subtract one from time remaining
            timer.timeRemaining--;
            $(".timer-display").text(timer.timeRemaining);

            // Go to time out screen once timer reaches 0
            if (timer.timeRemaining === 0) {
                timedOut = true;
                timer.stop();
                outOfTime();
            }
        }
    };

    // Variables for the iterations
    var currentQuestion,
        questionOption,
        questionImage;

    function nextQuestion() {

        var timedOut = false;
        var isCorrect = false;

        // Empties the question wrapper for each new question
        $(".questions-wrapper").empty();

        // Creating timer elements
        var timerWrapper = $("<div>").addClass("timer-wrapper").html("<span class='time-remaining'>Time Remaining:</span>");
        var timerDisplay = $("<span>").addClass("timer-display").text(timer.timeRemaining);
    
        // Append and prepend timer elements
        questionsWrapper.prepend(timerWrapper);
        timerWrapper.append(timerDisplay);

        timer.start();
            
        // Variables for the iterations
        var questionItem = 0;

        // Iterates through the properties of each question in the questions array
        for(var questionProperty in questions[questionNumber]) {

            // Variable to hold the contents of each property
            var questionItemContent = questions[questionNumber][questionProperty];

            if ( questionItem === 0 ) {

                // Puts the current question in an H3
                currentQuestion = $("<h3>").text(questionItemContent).addClass("current-question");
    
                // Appends to the questions wrapper
                questionsWrapper.append(currentQuestion);

            }

            else if ( questionItem === 1 ||  questionItem === 2 ||  questionItem === 3 ||  questionItem === 4 ) {

                // Puts the question options in anchor tags
                questionOption = $("<a>").text(questionItemContent).addClass("question-option " + questionProperty).attr("value", questionProperty);
    
                // Appends to the questions wrapper
                questionsWrapper.append(questionOption);

            }

            else if ( questionItem === 5 ) {

                // Creates the image for the question
                questionImage = $("<img>").attr("src", "assets/images/" + questionItemContent).addClass("img-responsive");

            }

            questionItem++;

          }

          // Putting the correct answer into a variable
          correctAnswerHolder = $(".correctAnswer").text();

    };

    function answerReveal() {

        if (isCorrect) {

            // Clears the screen
            $(".questions-wrapper").empty();

            // Creating out of time messages
            var message = $("<div>").addClass("message").text("Correct!");
            var correctMessageDiv = $("<div>").addClass("correct-message").text("You answered:");
            var correctAnswerDiv = $("<div>").addClass("correct-answer").text(correctAnswerHolder);
        
            // Append and prepend messages
            questionsWrapper.append(message);
            questionsWrapper.append(correctMessageDiv);
            questionsWrapper.append(correctAnswerDiv);

            // Appends image to the questions wrapper
            questionsWrapper.append(questionImage);

            if ( questionNumber === lastQuestion ) {
                // Go to game over if last question
                setTimeout(gameOver, timeOut);
            }
            else {
                // Otherwise, move to next question
                setTimeout(nextQuestion, timeOut);
            }

        } 
        
        else {

            // Clears the screen
            $(".questions-wrapper").empty();

            // Creating messages
            var message = $("<div>").addClass("message").text("Sorry!");
            var correctMessageDiv = $("<div>").addClass("correct-message").text("The correct answer was:");
            var correctAnswerDiv = $("<div>").addClass("correct-answer").text(correctAnswerHolder);
        
            // Append and prepend messages
            questionsWrapper.append(message);
            questionsWrapper.append(correctMessageDiv);
            questionsWrapper.append(correctAnswerDiv);

            // Appends image to the questions wrapper
            questionsWrapper.append(questionImage);

            if ( questionNumber === lastQuestion ) {
                // Go to game over if last question
                setTimeout(gameOver, timeOut);
            }
            else {
                // Otherwise, move to next question
                setTimeout(nextQuestion, timeOut);
            }

        }
    };

    function outOfTime() {

        // Adds 1 to unanswered score
        unanswered++;

        // Adds 1 to the question number
        questionNumber++;

        // Clears the screen
        $(".questions-wrapper").empty();

        // Creating messages
        var message = $("<div>").addClass("message").text("Out of Time!");
        var correctMessageDiv = $("<div>").addClass("correct-message").text("Sorry, the correct answer was:");
        var correctAnswerDiv = $("<div>").addClass("correct-answer").text(correctAnswerHolder);
    
        // Append messages
        questionsWrapper.append(message);
        questionsWrapper.append(correctMessageDiv);
        questionsWrapper.append(correctAnswerDiv);

        // Appends image to the questions wrapper
        questionsWrapper.append(questionImage);

        if ( questionNumber === lastQuestion ) {
            // Go to game over if last question
            setTimeout(gameOver, timeOut);
        }
        else {
            // Otherwise, move to next question
            setTimeout(nextQuestion, timeOut);
        }
        
    };

    function gameOver() {

        // Clears the screen
        $(".questions-wrapper").empty();

        // Creating messages
        var message = $("<div>").addClass("message").text("Here are your results!");
        var correctDiv = $("<div>").addClass("correct-answer").text("Correct Answers: " + correctAnswers);
        var incorrectDiv = $("<div>").addClass("correct-answer").text("Incorrect Answers: " + incorrectAnswers);
        var unansweredDiv = $("<div>").addClass("correct-answer").text("Unanswered: " + unanswered);

        // Creating Play Again button
        var playButton = $("<a>").addClass("btn btn-primary start-button").text("Play Again").css({opacity: "1"});
    
        // Append messages
        questionsWrapper.append(message);
        questionsWrapper.append(correctDiv);
        questionsWrapper.append(incorrectDiv);
        questionsWrapper.append(unansweredDiv);
        questionsWrapper.append(playButton);

    };

    // Start game and hides button
    $(".questions-wrapper").on("click", ".start-button", function() {
        $(this).hide();
        audio.pause();
        newGame();
    });
    
    // Question options
    $(".questions-wrapper").on("click", ".question-option", function() {

        // Grabs the value in the value attribute
        var chosenAnswer = $(this).text();

        // If correct answer was chosen
        if (chosenAnswer === correctAnswerHolder) {
            isCorrect = true;
            correctAnswers++;
            questionNumber++;
            timer.stop();
            answerReveal();
        }

        // If wrong answer was chosen
        else {
            isCorrect = false;
            incorrectAnswers++;
            questionNumber++;
            timer.stop();
            answerReveal();
        }        
    });
});