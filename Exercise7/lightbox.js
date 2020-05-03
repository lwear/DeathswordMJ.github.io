// change the Visibility of divID

function changeVisibility(divID){
		var element = document.getElementById(divID);
		
		
		//if element exists, toggle it's class
		// between hidden and unhidden
		if(element) {
			element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
		} // if
} // changeVisability

// dispaly light box with bigImage in it
function displayLightBox(imageFile, alt){
	
	var image = new Image();
	var bigImage = document.getElementById("bigImage");

	image.src = "images/" + imageFile;
	image.alt = alt;
	console.log(image.src);
	
	image.onload = function (){
		var width = image.width;
		document.getElementById("boundaryBigImage").style.width = width + "px";
	
	
	
};
	
	
	bigImage.src = image.src;
	bigImage.alt = image.alt;
	console.log(bigImage.src);
	changeVisibility('lightbox');
	changeVisibility('boundaryBigImage');


}