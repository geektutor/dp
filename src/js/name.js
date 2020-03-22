$(function() {
    // Get name from URL
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
    });
        return vars;
    }
    var name = getUrlVars()["x"];
    var surname = getUrlVars()['text'];

    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;
  
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
  
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
  
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
  
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
  
      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }

    function createDP(name, imageUrl, cb) {
      var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        imageCount = 2,
        viewW = 800,
        viewH = 800;
  
      var userImg = loadImage(imageUrl);
      var frameImg = loadImage("src/img/frame.jpeg");
  
      function loadImage(src) {
        var img = new Image();
        img.onload = transformImage;
        img.src = src;
        return img;
      }
  
      function transformImage() {
        if (--imageCount !== 0) return;
  
        canvas.width = frameImg.width;
        canvas.height = frameImg.height;
  
        ctx.drawImage(frameImg, 0, 0);
  
        ctx.drawImage(userImg, 0, 0, viewW, viewH);
  
        cb(canvas.toDataURL());
      }
    }
  
    function navigateTo(view, temp = "") {
      switch (view) {
        case "yourdp":
          main.html(temp);
          main.css({ background: "none" });
          break;
        default:
          main.style.background = "rgb(108, 86, 123)";
          main.innerHTML = mainContent;
      }
    }
  
    console.log("DOM fully loaded and parsed");
    console.log(name)
    console.log(surname)
});
  