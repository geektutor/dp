$(function() {
  /* global variables */
  const button = $(".create-dp");
  const fileInput = $("input[type=file]");
  const preview = $("img");
  const changebtn = $(".change");
  const deletebtn = $(".delete");
  const fileInpbtn = $(".fileinput-button");
  const main = $("main");
  const mainContent = main.innerHTML;

  $(".image-editor").cropit();

  $("form").submit(function(e) {
    e.preventDefault();
    var username = $("#fullname").val();
    // Move cropped image data to hidden input
    var imageData = $(".image-editor").cropit("export", {
      type: "image/jpeg",
      quality: 1.0,
      originalSize: true
    });
    $(".hidden-image-data").val(imageData);

    $(".create-dp")
      .attr("disabled", "disabled")
      .html("...processing");

    // x, y, width, height
    const picData = [247, 41, 585, 572];
    // name, y
    const nameData = [username, 920];

    createDP(username, imageData, picData, nameData, function(url) {
      navigateTo("yourdp", createHTMLForImage(url));

      function createHTMLForImage(url) {
        return `
          <section class="dp-container">
            <a href="?" class="arrow-back"><i class="ti-arrow-left"></i></a>
            <div>
            <img id="dp_result" src=${url} title="Your DP"/>
            <br>
            <a class="download-dp" href="${url}" download="Fitila_DP_${username}">Download Image</a>
          <section>
        `;
      }
    });
  });

  /* file input */
  fileInput.on("change", function(e) {
    fileInpbtn.css({ display: "none" });
    changebtn.css({ display: "inline-block" });
    deletebtn.css({ display: "inline-block" });
  });

  /* change image btn */
  changebtn.on("click", function() {
    fileInput.click();
  });

  /* remove image btn */
  deletebtn.on("click", function() {
    let file = document.querySelector("input[type=file]").files[0];
    file.value = null;

    fileInpbtn.css({ display: "inline-block" });
    changebtn.css({ display: "none" });
    deletebtn.css({ display: "none" });

    $(".cropit-preview-image").attr("src", "");
  });

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

  function createDP(username, imageUrl, pic, name, cb) {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      imageCount = 2,
      view = {
        x: pic[0],
        y: pic[1],
        width: pic[2],
        height: pic[3]
      },
      innerText = {
        x: view.width * 0.7,
        y: view.height - 80
      };

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

      ctx.drawImage(userImg, view.x, view.y, view.width, view.height);

      //ctx.textBaseline = "bottom";e
      //ctx.font = "bold 30px Arial";eeeee
      //ctx.fillStyle = "#fff";e
      //ctx.fillText("#TalkNow", 750, view.y + innerText.y);

      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.font = "italic 50px Caveat";
      ctx.fillStyle = "#000";
      ctx.fillText(name[0], 750, name[1]);

      cb(canvas.toDataURL("image/jpeg", 1.0));
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
});
