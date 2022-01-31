var level = 1;
var gamePattern = [];
var myPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var clickCount = 0;


$(document).keypress(function() {
  if(gamePattern.length == 0)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
  }
});

$(".btn").click(function() {
  if(gamePattern.length ==0)
  {
    //gameOver($(this).attr('id')); // Do Nothing
  }
  else
  {
    debugger;
    animatePress($(this).attr('id'));
    playSound($(this).attr('id'));
    myPattern.push($(this).attr('id'));
    console.log("myPattern = "+myPattern);console.log("gamePattern = "+gamePattern);console.log(compareArrays(gamePattern, myPattern));
    clickCount++;
    if(compareArrays(gamePattern, myPattern))
    {
      if(clickCount == gamePattern.length)
      {
        level++
        myPattern.length =0;

        setTimeout(function(){
          nextSequence();
          $("#level-title").text("Level "+ level);
        }, 1000);
      }
      //console.log("myPattern = "+myPattern);console.log("gamePattern = "+gamePattern);

    }
    else
      gameOver("wrong");
  }
});



function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  buttonflash(randomChoosenColour);
  playSound(randomChoosenColour);
  clickCount = 0;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function buttonflash(name) {
  $("#" + name).fadeOut(100).fadeIn(100);
}

function animatePress(name) {
  $("#"+name).addClass("pressed");

  setTimeout(function(){
     $("#"+name).removeClass("pressed");
   }, 100);
}

function gameOver(name){
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  playSound(name);
  gamePattern.length=0;
  myPattern.length=0;
  level = 1;
  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
}

function compareArrays(a, b){
  var check = true;
  for(var i=0; i<a.length; i++)
  {
    for(var j=0; j<b.length; j++)
    {
      if(i==j && a[i]!=b[j])
      {
          check = false;
          break;
      }
    }
    if(check == false)
      break;
  }
  return check;
}
