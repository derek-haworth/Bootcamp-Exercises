$(document).ready(function() {

    var randomNumber,
        crystalNumber,

        wins = 0,
        losses = 0,
        totalScore = 0,

        scoreWins = $(".score-wins"),
        scoreLosses = $(".score-losses"),
        message = $(".message"),
        crystalImage = $(".crystal"),
        totalScoreWrite = $(".total-score");

    $("#ready").append("<button class='start btn btn-primary'>START</button>");

    function Start() {
        $("#ready").hide();
        $(".container").removeClass('hidden');
    }

    function gameStart() {
        totalScore = 0;
        randomNumber = Math.floor(Math.random() * 102) + 19;
        $(".number-to-guess").text(randomNumber);
        crystalImage.each(function(i, obj) {
            crystalNumber = Math.floor(Math.random() * 12) + 1;
            $(this).attr("value", crystalNumber);
        });

        totalScoreWrite.text("0");
        
    }

    gameStart();

    crystalImage.on("click", function() {

        var crystalValue = ($(this).attr("value"));
        crystalValue = parseInt(crystalValue);
        
        totalScore += crystalValue;
        totalScoreWrite.text(totalScore);

        if (totalScore === randomNumber) {
            message.text("You Win!");
            wins++;
            scoreWins.text(wins);
            gameStart();
        }

        else if (totalScore >= randomNumber) {
            message.text("You Lose!");
            losses++;
            scoreLosses.text(losses);
            gameStart();
        }
    });

    $(".start").on("click", Start);
});