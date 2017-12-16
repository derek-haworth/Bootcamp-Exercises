$(document).ready(function() {

	var character = false,
		enemies = false,
		defender = false,
		playersArray = [],
		defeatedCount = 0;
	
	var Player = function(name, hp, attackPower, attackPowerConst, counter) {
	  this.name = name;
	  this.hp = hp;
	  this.attackPower = attackPower;
	  this.attackPowerConst = attackPowerConst;
	  this.counter = counter;
	}
	
	var playerOne = new Player("Derek", 100, 20, 1, 25);
	var playerTwo = new Player("Derek", 100, 20, 1, 25);
	var playerThree = new Player("Derek", 100, 20, 1, 25);
	var playerFour = new Player("Derek", 100, 20, 1, 25);
	
	//Look into jQuery method for Constructors
	
	playersArray.push(playerOne);
	playersArray.push(playerTwo);
	playersArray.push(playerThree);
	playersArray.push(playerFour);

	function init() {
        character = false;
        enemies = false;
        defender = false;
    }

    $("#ready").append("<button class='start btn btn-primary'>START</button>");

    function Start() {
        $("#ready").hide();
        $(".container").removeClass('hidden');
    }

    function selectOpponents(event) {
        event.preventDefault();
        var v = $(this);
        if(v.hasClass("selected")) {
            return;
        } else {
            v.addClass("selected");
        }

        if (character === false) {
            
            $(".player").after(v);
            character = playersArray[v.data("player") - 1];
            character.element = v;
            v.addClass("selectedOpponent");
            v.removeClass('')

            if (character) {
                $(".enemies").after($(".inactive .character"));
            }

        } else if (defender === false) {
            $(".defender").after(v);
            defender = playersArray[v.data("player") - 1];
            defender.element = v;
            v.addClass("selectedDefender")
            $(".lost").html('');
        }
    }

    function fight(x, y) {
    	//make sure something selected
        if (defender === false) {
            alert("Players not selected");
            return;
        }

        // HP deduction
        var attacksIncrement = character.attackPowerConst++;
        var attackPowerIncrement = attacksIncrement * x.attackPower
        y.hp -= attackPowerIncrement;
        y.element.find(".score").html(y.hp);


        if (y.hp <= 0) {
            y.element.hide();
            defender = false;
            $(".lost").html(y.name + " is defeated");
            defeatedCount++;

            // Winner
            if (defeatedCount === 3) {
                $(".won").html("<h1 class='winningText'>" + "You Won" + "</h1>")
            }

        } else {
            x.hp -= y.counter;
            x.element.find(".score").html(x.hp);
        }

        if (x.hp <= 0) {
            x.element.hide();
            $(".attack").hide();
            alert("Loser!")
            return;
        }

        $(".playerAttacks").html("You Attacked " + y.name + " for " + attackPowerIncrement);
        $(".defenderAttacks").html(y.name + " attacked you for " + y.counterAttackPower);
    }


    $(".character").on("click", selectOpponents);
    $(".attack").on("click", function() {
        fight(character, defender);
    });

    $(".start").on("click", Start);
	
});