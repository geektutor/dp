<?php

class EVENT_DP {
 
   protected $image_name;

   function __construct($name)
    {
    	//name of the uploaded file e.g ahmzy.jpg
        $this->image_name = $name;
    }
 
   function __destruct()
    {
     	$this->image_name = null;   
    }

	public function mergeImage($txt, $fr_img, $av_img, $merge_right, $merge_bottom, $destination_path){

		/*
		$frame - frame image path
		$avatar - avatar image path
		$merge_right - margin from right of image
		$merge_bottom - margin from left of image
		*/
		 
		$mime_fr = getimagesize($fr_img);
		$mime_av = getimagesize($av_img);

		// Load the avatar and the frame to apply the watermark to
	    if($mime_fr['mime']=='image/png') { 
			$frame = imagecreatefrompng($fr_img);
	    }
	    if($mime_fr['mime']=='image/jpg' || $mime_fr['mime']=='image/jpeg' || $mime_fr['mime']=='image/pjpeg') {
			$frame = imagecreatefromjpeg($fr_img);
	    } 

		if($mime_av['mime']=='image/png') { 
			$avatar = imagecreatefrompng($av_img);
	    }
	    if($mime_av['mime']=='image/jpg' || $mime_av['mime']=='image/jpeg' || $mime_av['mime']=='image/pjpeg') {
			$avatar = imagecreatefromjpeg($av_img);
	    } 

		$sx = imagesx($avatar);
		$sy = imagesy($avatar);

		// Merge the stamp onto our photo with an opacity of 100%
		imagecopymerge($frame, $avatar, imagesx($frame) - $sx - $merge_right, imagesy($frame) - $sy - $merge_bottom, 0, 0, imagesx($avatar), imagesy($avatar), 100);

		$final_image = $this->addtext($txt, $frame, $av_img, 250, 140);

		return $this->saveFile($final_image, $destination_path, $this->image_name);

	}

	public function createThumbnail($image_name,$new_width,$new_height,$uploadDir,$moveToDir)
	{
		/*
		$image_name - Name of the image which is uploaded
		$new_width - Width of the resized photo (maximum)
		$new_height - Height of the resized photo (maximum)
		$uploadDir - Directory of the original image
		$moveToDir - Directory to save the resized image
		*/

	    $path = $uploadDir . $image_name;
	    $mime = getimagesize($path);

	    if($mime['mime']=='image/png') { 
	        $src_img = imagecreatefrompng($path);
	    }
	    if($mime['mime']=='image/jpg' || $mime['mime']=='image/jpeg' || $mime['mime']=='image/pjpeg') {
	        $src_img = imagecreatefromjpeg($path);
	    }   

	    $old_x          =   imageSX($src_img);
	    $old_y          =   imageSY($src_img);

	    if($old_x > $old_y) 
	    {
	        $thumb_w    =   $new_width;
	        $thumb_h    =   $old_y*($new_height/$old_x);
	    }

	    if($old_x < $old_y) 
	    {
	        $thumb_w    =   $old_x*($new_width/$old_y);
	        $thumb_h    =   $new_height;
	    }

	    if($old_x == $old_y) 
	    {
	        $thumb_w    =   $new_width;
	        $thumb_h    =   $new_height;
	    }

	    $dst_img = ImageCreateTrueColor($thumb_w,$thumb_h);
		imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 

	    // New save location
	    $new_thumb_loc = $moveToDir . $image_name;

	    if($mime['mime']=='image/png') {
	        $result = imagepng($dst_img,$new_thumb_loc,8);
	    }
	    if($mime['mime']=='image/jpg' || $mime['mime']=='image/jpeg' || $mime['mime']=='image/pjpeg') {
	        $result = imagejpeg($dst_img,$new_thumb_loc,80);
	    }

	    imagedestroy($dst_img); 
	    imagedestroy($src_img);

	    return $result;
	}

	private function addtext($txt, $frame, $av_img, $merge_right, $merge_bottom)
	{

		// Set the enviroment variable for GD
		putenv('GDFONTPATH=' . realpath('.'));

		// Set the content-type
		// header('Content-type: image/jpeg');

		// Create Image From Existing File
		$jpg_image = $frame;

		// Allocate A Color For The Text
		$white = imagecolorallocate($jpg_image, 87, 15, 140);

		// Set Path to Font File
		$font_path = '../src/fonts/kenyan_coffee/kenyan coffee rg.ttf';

		// Set Text to Be Printed On Image
		$username  = $txt;
		$names = explode(" ", $username);
		$ycounter = 185;
		$indexCounter = 0;

		foreach ($names as $text) {
		    // Print Text On Image
			imagettftext($jpg_image, 15, 0, 20, $ycounter, $white, $font_path, $text);
			$ycounter += 23;
			$indexCounter += 1;
			if($indexCounter == 3){
				break;
			}
		}

		$text = $txt;		

		// Send Image to Browser
		// imagejpeg($jpg_image);

		// Using imagepng() results in clearer text compared with imagejpeg()
		// imagepng($frame);

		return $jpg_image;
	}

	private function saveFile($final_image, $destination_path, $new_file_name){
		// Save the image to file and free memory
		imagepng($final_image, $destination_path.$new_file_name);
		// imagejpeg($jpg_image);
		return imagedestroy($final_image);
	}

}

?>


