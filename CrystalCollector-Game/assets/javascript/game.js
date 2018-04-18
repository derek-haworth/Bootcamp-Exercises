$(document).ready(function() {

    var randomNumber,
        crystalNumber,

        wins = 0,
        losses = 0,
        totalScore = 0,

        scoreWins = $(".score-wins"),
        scoreLosses = $(".score-losses"),
        crystalImage = $(".crystal"),
        totalScoreWrite = $(".total-score");

    $("#ready").append("<button class='start btn btn-primary'>START</button>");

    function start() {
        $("#ready").hide();
        $(".container").removeClass('hidden');
    }

    function replay(){
        $(".crystal-move.play").removeClass("play");
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


    $(crystalImage).on("click", function() {

        var crystalValue = ($(this).attr("value"));
        crystalValue = parseInt(crystalValue);
        
        totalScore += crystalValue;
        totalScoreWrite.text(totalScore);

        if (totalScore === randomNumber) {
            $(".message.alert-success").each(function(){
                $(this).fadeIn(1000).text("You Win!").fadeOut(3000);
            });
            wins++;
            scoreWins.text(wins);
            gameStart();

        } else if (totalScore >= randomNumber) {
            $(".message.alert-danger").each(function(){
                $(this).fadeIn(1000).text("You Lose!").fadeOut(3000);
            });  
            losses++;
            scoreLosses.text(losses);
            gameStart();
        }
    
        // var color = $(this).attr("data-name");
        // $(color).addClass("play");
        // $(this).addClass("play");

        // setTimeout(function() {
        //     $(this).removeClass("play");
        // }, 700)

        if ($(".crystal-move").hasClass("play")) {
            replay();
        } else {
            $(".crystal-move").addClass("play");
            setTimeout(function() {
                $(".crystal-move").removeClass("play");
            }, 700)
        }

    });


    $(".start").on("click", start);
});