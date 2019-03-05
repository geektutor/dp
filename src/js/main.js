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

  	$('.image-editor').cropit();

	$('form').submit(function(e) {
		e.preventDefault();
		var username = $("#fullname").val();
		// Move cropped image data to hidden input
		var imageData = $('.image-editor').cropit('export', {
      type: 'image/jpeg',
      quality: 1.0,
      originalSize: true
    });
		$('.hidden-image-data').val(imageData);

		$(".create-dp").attr("disabled","disabled").html('...processing');

    createDP(username, imageData, function(url) {
      navigateTo("yourdp", createHTMLForImage(url));

      function createHTMLForImage(url) {
        return `
          <section class="dp-container">
            <a href="?" class="arrow-back "><i class="ti-arrow-left"></i></a>
            <div>
            <img id="dp_result" src=${url} title="Your DP"/>
            <br>
            <a class="download-dp" href="${url}" download="ECX_DP_${username}">Download Image</a>
          <section>
        `;
      }
    });

		// appendFileAndSubmit(username, imageData, function(res){
	 //        if(res.status == "ok"){
	 //            let temp = res.msg;
	 //            navigateTo("yourdp", temp);
	 //            return true;
	 //        }
	 //        return false;
		// });
	});

	/* file input */
	fileInput.on("change", function(e) {
		fileInpbtn.css({display:"none"});
		changebtn.css({display:"inline-block"});
		deletebtn.css({display:"inline-block"});
	})

	/* change image btn */
	changebtn.on("click", function(){
		fileInput.click();
	})

	/* remove image btn */
	deletebtn.on("click", function(){
		let file = document.querySelector('input[type=file]').files[0];
		file.value = null;

		fileInpbtn.css({display:"inline-block"});
		changebtn.css({display:"none"});
		deletebtn.css({display:"none"});

		$(".cropit-preview-image").attr("src","");

	})


	function b64toBlob(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
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


		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	}

  function createDP(username, imageUrl, cb){
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),

      grayCanvas = document.createElement('canvas'),
      grayCtx = grayCanvas.getContext('2d'),

      imageCount = 2,
      viewW = 800,
      viewH = 800;

    var userImg = loadImage(imageUrl);
    var frameImg = loadImage('src/img/frame.jpeg');

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

      var fillWidth = 800;
      var r0 = 800 / 800;
      var r1 = userImg.width / userImg.height;

      console.log(userImg.width, userImg.height)

      ctx.drawImage(frameImg, 0, 0);

      ctx.drawImage(userImg, 0, 0, viewW, viewH);

      cb(canvas.toDataURL('image/jpeg', 1.0));
    }
  }

	// function appendFileAndSubmit(username,ImageURL, cb){
	// 	// Split the base64 string in data and contentType
	// 	var block = ImageURL.split(";");

	// 	// Get the content type
	// 	var contentType = block[0].split(":")[1];

	// 	// get the real base64 content of the file
	// 	var realData = block[1].split(",")[1];

	// 	// Convert to blob
	// 	var blob = b64toBlob(realData, contentType);

	// 	// Create a FormData and append the file
	// 	var fd = new FormData();
	// 	fd.append("avatar", ImageURL);
	// 	fd.append("fullname", username);
	// 	fd.append("timestamp", new Date().getTime());

	// 	// Submit Form and upload file
	// 	$.ajax({
	// 		url:"dp/auth/process.php",
	// 		data: fd,// the formData function is available in almost all new browsers.
	// 		type:"POST",
	// 		contentType:false,
	// 		processData:false,
	// 		cache:false,
	// 		dataType:"json", // Change this according to your response from the server.
	// 		error:function(err){
	// 			console.error(err);
	// 		},
	// 		success:function(data){
	// 			(cb && cb !== undefined) && cb(data);	
	// 		},
	// 		complete:function(){
	// 			console.log("Request finished.");
	// 		}
	// 	});
		
	// }

	function navigateTo(view, temp = ""){
	    switch(view){
	        case "yourdp":
	            main.html(temp);
	            main.css({background :"none"});
	        break;
	        default:
	            main.style.background = "rgb(108, 86, 123)";
	            main.innerHTML = mainContent;
	    }
	}

	//remove host ads
	const oohost = document.querySelector("body > div");
	oohost.remove();
	console.log("DOM fully loaded and parsed");

});
