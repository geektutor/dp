function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
  var name = getUrlVars()["x"];
  var surname = getUrlVars()['text'];

window.onload = function(){
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  var imageObj = new Image();
  imageObj.onload = function(){
      context.drawImage(imageObj, 10, 10);
      context.font = "40pt Calibri";
      context.fillText(name, 20, 20);
  };
  imageObj.src = "src/img/frame.jpeg"; 
};