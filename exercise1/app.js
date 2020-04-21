// Write your JS in here
var pics = [
	"imgs/dog.jpg",        //0 
	"imgs/dog2.jpg",       //1
	"imgs/dog3.jpg",       //2
	"imgs/dog4.jpg",       //3
	"imgs/dog5.jpg",       //4
	"imgs/dog6.jpg"        //5 	

]

var btn = document.querySelector("button");
var img = document.querySelector("img");
var counter = 1;

btn.addEventListener("click", function(){
	if(counter === 6){
		counter = 0;
	}
	img.src = pics[counter]
	counter = counter + 1;
});

