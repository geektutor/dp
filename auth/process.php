<?php

include_once("EVENT_DP.php");

$year = date("Y");

$uploadDir = "../uploads/".$year."/";
$thumbnailDir = "../uploads/".$year."/";

$destination_folder_for_dp = "../uploads/".$year."/dp/";
$frameImg = "../src/img/frame.jpeg";

// image dimension variable
$img_width = 800;
$img_height = 800;

// image position right:bottom
$margin_right = 400;
$margin_bottom = 400;


if(isset($_POST["avatar"])) {

    $time = checkInput($_POST['timestamp']);
    $txt = checkInput($_POST['fullname']);

    $validextensions = array("jpeg", "jpg", "png");
    $temp1 = explode(";", $_POST["avatar"]);
    $temp2 = explode(":", $temp1[0]); //e.g data:image/png;
    $filetype = $temp2[1]; //file type e.g image/png

    $temp3 = explode("/", $filetype); //e.g image/png
    $file_extension = $temp3[1]; //png

    $imagetempfile = explode(",", $temp1[1]);
    $imagefile = $imagetempfile[1];

    $name = preg_replace('/\s+/', '_', $txt);
    $newfilename = $name.$time .".".$file_extension;
  /* $data = base64_decode($imagefile);
    $file = $uploadDir . $newfilename;
    $success = file_put_contents($file, $data);
    $gf = $thumbnailDir.$newfilename;
    $img = imagecreatefromjpeg($gf);
    imagefilter($img, IMG_FILTER_GRAYSCALE); //first, convert to grayscale
    imagefilter($img, IMG_FILTER_CONTRAST, -255); //then, apply a full contrast
    $data = base64_decode(imagejpeg($img));
    $file = $uploadDir . $newfilename;
    $success = file_put_contents($file, $data);
*/
    $data = base64_decode($imagefile);
    $file = $uploadDir . $newfilename;
    $success = file_put_contents($file, $data);
   // print $success ? $file : 'Unable to save the file.';

    if($success){

      // //create dp instance 
      $dp = new EVENT_DP($newfilename);

      //create thumnail
      if($dp->createThumbnail($newfilename, $img_width, $img_height, $uploadDir, $thumbnailDir)){

        //merge picture
        if($dp->mergeImage($txt, $frameImg, $thumbnailDir.$newfilename, $margin_right, $margin_bottom, $destination_folder_for_dp)){
          
          //send merge picture to browser
          $message = 
          '<section class="dp-container">
              <a href="?" class="arrow-back "><i class="ti-arrow-left"></i></a>
              <div>
                  <img id="dp_result" src="/dp/uploads/2019/dp/'.$newfilename.'">                
                  <a class="kb-button download-dp btn" href="/dp/uploads/2019/dp/'.$newfilename.'" download="'.$name.'"_ecx'.$year.'">Download Image</a>      
              </div>
          <section>';

          $response = array('status' => 'ok', 'msg' => $message);
          echo json_encode($response);

        }else{
          $message = "Image processing failed, please try again.";
          $response = array('status' => 'error', 'msg' => $message);
          echo json_encode($response);
        }

      }else{
        $message = "Image processing failed, please try again.";
        $response = array('status' => 'error', 'msg' => $message);
        echo json_encode($response);
      }       

    }else{
        $message = "Image processing failed, please try again.";
        $response = array('status' => 'error', 'msg' => $message);
        echo json_encode($response);
    }


}else{
  $message = "No file selected";
  $response = array('status' => 'error', 'msg' => $message);
  echo json_encode($response);
}

 function checkInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


?>