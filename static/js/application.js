var inbox = new ReconnectingWebSocket("ws://"+ location.host + "/receive");
var outbox = new ReconnectingWebSocket("ws://"+ location.host + "/submit");

inbox.onmessage = function(message) {
  var data = JSON.parse(message.data);
  $("#chat-text").append("<div class='panel panel-default'><div class='panel-heading'>" +
  $('<span/>').text(data.handle).html() + "</div><div class='panel-body'>" +
  $('<span/>').text(data.text).html() + "</div></div>" +
  $('<span/>').text(data.avatar).html() + "</div></div>");

  // //added this
  // $("#testImage").show();

  //     $.ajax({ 
  //     type: "GET", 
  //     url: "media.giphy.com/media/CdAh3Sh0Mvtdu/giphy.gif", 
  //     dataType: "jsonp", 
  //     cache : false, 
  //     jsonp : "onJSONPLoad", 
  //     jsonpCallback: "newarticlescallback", 
  //     crossDomain: "true", 
  //     success: function(response) { 
  //       $("#LoadingImage").hide();
  //       alert("Success"); 
  //     }, 
  //     error: function (xhr, status) {  
  //       $("#LoadingImage").hide();
  //       alert('Unknown error ' + status); 
  //     }    
  //  });  


  // $("#chat-text").stop().animate({
  //   scrollTop: $('#chat-text')[0].scrollHeight
  // }, 800);
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
  //added this
  // var avatar = $("#avatar").show();
  var handle = $("#input-handle")[0].value;
  var text   = $("#input-text")[0].value;
  outbox.send(JSON.stringify({ handle: handle, text: text }));
  // outbox.send(avatar);
  $("#input-text")[0].value = "";

  var testGif = "../static/images/982897.gif"
  document.write("<img src=" + testGif + ">");
});

window.onload=function(){
  console.log("HEIII");
};
