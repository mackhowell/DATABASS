var inbox = new ReconnectingWebSocket("ws://"+ location.host + "/receive");
var outbox = new ReconnectingWebSocket("ws://"+ location.host + "/submit");

var possibleImages = ["982897.gif", "brandmark.gif", "crate.gif", "elephant.gif", "frog.gif", "stars.gif"];

var myID = "";
var myImage = "nothing.png";

//jQuery speak for onload
$(function(){
  myID = randomString();
  myImage = randomImage();
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
      position : position
    }));
 });


inbox.onmessage = function(message) {
  var data = JSON.parse(message.data);

  var picElement = $("#"+data.id);
  //if there's already an html element
  if (picElement.length > 0){
    picElement.animate({
      left : data.position.x,
      top: data.position.y
    }, 1000, "linear");
  //else make one
  } else {
    //first time
    var el = $("<div></div>").appendTo($("#container")).attr({"id" : data.id, "class" : "partyGoer"});
    el.append("<img src ='../static/images/" + data.image + "'>");
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
  event.preventDefault();
  outbox.send(JSON.stringify({ 
    id : myID,
    image : myImage,
    position : {
      x : 0,
      y : 0
    }
  }));
});
