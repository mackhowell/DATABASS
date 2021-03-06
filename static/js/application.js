var inbox = new ReconnectingWebSocket("ws://"+ location.host + "/receive");
var outbox = new ReconnectingWebSocket("ws://"+ location.host + "/submit");

var possibleImages = ["bass__jurassic_park.gif", "bass_windows.gif", "bass_dolls.gif", "bass_bootstrap.gif", "bass_eclipse.gif", "bass_beesandbombs.gif", "bass_daily_task.gif", "bass_tje.gif", "bass_city.gif", "bass_badblueprints.gif"];
var possibleSounds = ["synth.wav", "1-kyle cuisine.wav", "sine.wav", "Violet.wav"];

var myID = "";
var myImage = "nothing.png";
var mySound = "nothing.wav";
var myText = "";

//jQuery speak for onload
$(function(){
  myID = randomString();
  myImage = randomImage();
  mySound = randomSound();
});

//generates a unique ID for each user. 
function randomString(){
  var randString = "";
  var possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0 ; i < 12; i++){
    var index = parseInt(Math.random()*possibleLetters.length);
    var randLetter = possibleLetters.charAt(index);
    randString+=randLetter;
  }
  return randString;
}

//choose a random image
function randomImage(){
  var index = parseInt(Math.random()*possibleImages.length);
  return possibleImages[index];
}
//choose a random sound file
function randomSound(){
  var index = parseInt(Math.random()*possibleSounds.length);
  return possibleSounds[index];
}

function getChatMessage(){
  return $(data.text);
}

var lastMove = 0;
var eventThrottle = 1000;
$("body").click(function(event) {
  console.log("hihi");
    var position = {
      x : event.clientX,
      y : event.clientY
    };
    outbox.send(JSON.stringify({ 
      id : myID,
      image : myImage,
      position : position,
      sound : mySound, 
    }));
 });

//below is code to make chat send on pressing return key i think? 
function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if(e.which == 13) {
      // myText = getChatMessage();
      // outbox.send(JSON.stringify({ 
      // text : myText
    // }));
var text   = $("#input-text")[0].value;
  outbox.send(JSON.stringify({text: text }));
  $("#input-text")[0].value = "";
    }
}

inbox.onmessage = function(message) {
  var data = JSON.parse(message.data);
// message's image and sound
  var picElement = $("#"+data.id);
  //if there's already an html element
  if (picElement.length > 0){
    picElement.animate({
      left : data.position.x,
      top: data.position.y
    }, 1000, "linear");
  //else make one
  } else {
    var el = $("<div></div>").appendTo($("#container")).attr({"id" : data.id, "class" : "partyGoer"});
    el.append("<img src ='../static/images/" + data.image + "'>");
    el.append("<audio src='../static/sounds/" + data.sound + "' autoplay loop preload='auto'>");
    el.append(data.text).html();
  }
};

inbox.onclose = function(){
    console.log('inbox closed');
    this.inbox = new WebSocket(inbox.url);
};

outbox.onclose = function(){
    console.log('outbox closed');
    this.outbox = new WebSocket(outbox.url);
};


$("#input-form").on("submit", function(event) {
  var text   = $("#input-text")[0].value;
  event.preventDefault();
  outbox.send(JSON.stringify({ 
    id : myID,
    image : myImage,
    sound : mySound,
    text: myText,
    position : {
      x : 0,
      y : 0
    }
  }));
});