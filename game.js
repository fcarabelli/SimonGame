var btnColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
        }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}

function nextSequence(){
    // Level Up
    level++
    $("#level-title").text("Level " + level);

    // clear user clicked pattern
    userClickedPattern = []

    // Random add color to game
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = btnColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

$( ".btn" ).click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function playSound(colorName){
    var audio = new Audio(colorName + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $( "#" + currentColor ).addClass( "pressed" );
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
