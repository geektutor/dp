# Event DP 
#### (Case study Engineering Career Expo, Unilag)
This is a volunteer project to create social media awareness for the student run event. Attendees input their name and upload an image to generate a customize ECX event dp.

You can find an online demo at [KwarabuildDP](https://olanrewajuahmed095.000webhostapp.com/).

![eventDp homepage](https://github.com/Geektutor/generatedp/blob/master/screenshot.PNG)

# Tools Used

- jquery.min.js - for dom event and manipulation
- jquery.cropit.js - client side cropping of user uploaded image 
- PHP - for server side image processing and merging
- Kenyan_coffee - font used for writing user name on image
- themify-icon - to display icons

# Folder structure and files

```
- auth/							
	EVENT_DP.php 			:class for image manipulation
	process.php 			:process image input before manipulation
- src/							
	css/
		style.css 			:css to customize the page, hint: code from scratch
	fonts/
		kenyan_coffee/		:folder contains font files
		themify-icon.css 	:font css
		themify-*			:others themify css file
	img/
		frame.jpg 			:image frame where user image will be place/merge
		noimage.png 		:a fallback default image
	js/
		jquery.cropit.js 	:simple jquery image cropping plugin
		jquery.min.js 		:jquery official library
		main.js 			:custom js where the magic happens
- uploads/
	2019/
		dp/					:folder contains all dp generated
		thumbnail/			:folder contains all crop image thumbnails
- .htacess					:custom server file for file dir access
- index.html 				:main html file where magic happens
- serviceworker.js          :js file to serve file requests and make app work locally

```

# How to run locally

- Open your command prompt and clone the repository by running 

``` git clone https://github.com/Geektutor/generatedp.git ```

- Copy the folder to your **WAMP** www root or **XAMPP** htdots
- Then run in a browser


------------------------------------------------------------------------

# PHP Classes Used

## imagettftext

imagettftext( resource $image , float $size , float $angle , int $x , int $y , int $color , string $fontfile , string $text )

image : An image resource, returned by one of the image creation functions, such as imagecreatetruecolor().

size : The font size in points.

angle : The angle in degrees, with 0 degrees being left-to-right reading text. Higher values represent a counter-clockwise rotation. For example, a value of 90 would result in bottom-to-top reading text.

x :The coordinates given by x and y will define the basepoint of the first character (roughly the lower-left corner of the character). This is different from the imagestring(), where x and y define the upper-left corner of the first character. For example, "top left" is 0, 0.

y : The y-ordinate. This sets the position of the fonts baseline, not the very bottom of the character.

color : The color index. Using the negative of a color index has the effect of turning off antialiasing. See imagecolorallocate().

fontfile : The path to the TrueType font you wish to use.

## imagecopy vs imagecopymerge

int imagecopy ( resource dest_image, resource source_image, int dest_x, int dest_y, 
int source_x, int source_y, int source_width, int source_height)

int imagecopymerge ( resource dest_image, resource source_image, int dest_x, int dest_y, 
int source_x, int source_y, int source_width, int source_height, int merge_percentage)

1. The destination image you're copying to

2. The source image you're copying from

3. The X co-ordinate you want to copy to

4. The Y co-ordinate you want to copy to

5. The X co-ordinate you want to copy from

6. The y co-ordinate you want to copy from

7. The width in pixels of the source image you want to copy

8. The height in pixels of the source image you want to copy

Parameters **three** and **four** allow you to position the source image where you want it on the destination image, 
and parameters **five, six, seven, and eight** allow you to define the rectangular area of the source image that 
you want to copy. Most of the time you will want to leave parameters five and six at 0 
(copy from the top-left hand corner of the image), and parameters seven and eight at the width of the source image
 (the bottom-right corner of it) so that it copies the entire source image.

The way these functions differ is in the last parameter: **imagecopy()** always overwrites all the pixels in the 
destination with those of the source, whereas **imagecopymerge()** merges the destination pixels with the source 
pixels by the amount specified in the extra parameter: 0 means "keep the source picture fully", 100 means 
"overwrite with the source picture fully", and 50 means "mix the source and destination pixel colours equally". 
The **imagecopy()** function is therefore equivalent to calling **imagecopymerge()** and passing in 100 as the last parameter.
