
var buttonColors = ["green","red","yellow","blue"];
var colourSequence = [];
var level=0;
var index=0;


function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function nextSequence(){
  level++;
  $("#level-title").text("Level "+ level);

  var random=Math.floor(Math.random()*4);
  colourSequence.push(buttonColors[random]);
  playSound(buttonColors[random]);
  $("#" + buttonColors[random]).fadeOut()
  $("#" + buttonColors[random]).fadeIn();

}

function animatePress(id){
  $("#"+id).toggleClass("pressed");
  setTimeout(function(){$("#"+id).toggleClass("pressed")},100);
}

$(document).keypress(function(){
  nextSequence();
  $(document).off('keypress');
  $('.btn').on('click',onClick);
});

function onClick(){
  var userChosenColor=$(this).attr("id");

  if(userChosenColor==colourSequence[index]){
    playSound(userChosenColor);
    animatePress(userChosenColor);
    index++;

    if(index==colourSequence.length){
      setTimeout(function(){console.log(userChosenColor)},10000);
      index=0;
      nextSequence();
    }
  }
  else{
    $("#level-title").html("Game Over!<br>Your Score : " + (level-1) + "<br>Press any key to Restart.");
    playSound("wrong");
    animatePress(userChosenColor);
    $("body").toggleClass("game-over");
    setTimeout(function(){
      $("body").toggleClass("game-over");
    },100);
    $('.btn').off('click');


    colourSequence = [];
    level=0;
    index=0;
    $(document).on('keypress',function(){
      nextSequence();
      $(document).off('keypress');
      $('.btn').on('click',onClick);
    });
  }

}
