# Event DP

#### (Case study Engineering Career Expo, Unilag)

This is a volunteer project to create social media awareness for the student run event. Attendees input their name and upload an image to generate a customize ECX event dp.

You can find an online demo at [ECX](https://ecx.website/dp).

![eventDp homepage](https://github.com/geektutor/dp/blob/master/screenshot.png)

# Tools Used

- jquery.min.js - for dom event and manipulation
- jquery.cropit.js - client side cropping of user uploaded image
- JS - for client side image processing and merging
- themify-icon - to display icons

# Folder structure and files

```
- src/
	css/
		style.css 			:css to customize the page, hint: code from scratch
	fonts/
		kenyan_coffee/		:folder contains font files
		themify-icon.css 	:font css
		themify-*			:others themify css file
	img/
		frame.jpg 			: base image frame where user image will be place/merge
		noimage.png 		:a fallback default image
	js/
		jquery.cropit.js 	:simple jquery image cropping plugin
		jquery.min.js 		:jquery official library
		main.js 			:custom js where the magic happens
- .htacess					:custom server file for file dir access
- index.html 				:main html file where magic happens

```

# How to run locally

- Open your command prompt and clone the repository by running

`git clone https://github.com/geektutor/dp.git`

- Copy the folder to your **WAMP** www root or **XAMPP** htdots or run php -S 127.0.0.1:1000 from your folder in your terminal
- Then run in a browser

---

# How to use

The jQuery CropIt plugin was used for image upload. The inherent resize feature of the plugin was overriden due to certain design compromises.

JavaScript was used to place the uploaded image on top of a base frame, and export the resulting composite image to jpeg format. The base frame is a 1200 x 1200 picture. The alloted space for uploaded image is 800 x 800.

The naming style for the image is set on line 38, you can edit the `ECX_DP_` to suit your needs.

You can set the height and width of the uploaded image in the createDP function on line 92.

# Contributors

#### [jnafolayan](https://github.com/jnafolayan)

#### [Geektutor](https://github.com/geektutor)

#### This project is based on [KwaraBuildDP](https://github.com/Ahmzyjazzy/generatedp) by [Ahmad Olarenwaju](https://ng.linkedin.com/in/ahmzyjazzy)
.
