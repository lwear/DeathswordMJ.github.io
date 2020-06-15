 const levels = [
	// level 0
		["flag", "rock","","tree","wings",
		"", "rock","","","",
		"", "fencetop","animate","animate","animate",
		"rock", "water","fenceside","","",
		"", "","","boyup",""],
		
	// level 1
	
		["flag", "water","rock","rock","rock",
		"fenceside", "water","","tree","wings",
		"", "bridge","","animate","",
		"", "water","","animate","",
		"bush", "water","tree","animate","boyup" ],
		
	// level 2
	
		["flag", "rock","","","",
		"fenceside", "rock","","","wings",
		"", "tree","animate","animate","animate",
		"", "water","","","",
		"", "fence","","boyup","" ]
  
  ]; // end of levels
  
  const gridBoxes = document.querySelectorAll("#gameBoard div");
  const noPassObstacles = ["rock", "tree", "water"];
  
  
  var currentLevel = 0; // starting level
  var wingsOn = false;
  var currentLocationOfBoy = 0;
  var currentAnimation; // alows 1 animation per level
  var widthOfBoard = 5;
  var controlPlay;  // used to control game start/stop
  
  
  window.addEventListener("load",function (){
	  loadLevel();
  });
  
  document.addEventListener("keydown", function (e){
	  
	  switch (e.keyCode){
		  case 37: // left arrow
		     if (currentLocationOfBoy % widthOfBoard !== 0){
				tryToMove("left");		
			}
		    break;
		  
		  case 38: // up arrow
		     if (currentLocationOfBoy - widthOfBoard >= 0){
				tryToMove("up");		
			 }
			 break;
		  
		  case 39: // right arrow
		     if (currentLocationOfBoy % widthOfBoard < widthOfBoard - 1){
				tryToMove("right");		
			 }
			 break;
		  
		  case 40: // down arro
			 if (currentLocationOfBoy + widthOfBoard < widthOfBoard * widthOfBoard){
				tryToMove("down");		
			 }
			 break;
			 
	  } // switch
		  
	  });
	  
	  // try to move boy
	  function tryToMove(direction){
		
		// location before move
		let oldLocation = currentLocationOfBoy;
		
		// class of location before move
		let oldClassName = gridBoxes[oldLocation].className;
		
		let nextLocation = 0; // location we wish to move to
		let nextClass = ""; // class of location we wish to move to
		
		let nextLocation2 = 0;
		let nextClass2 = "";
		
		let newClass = ""; // new class to switch to if move successful
		
		
		
		
		
		switch (direction){
		  case "left":
		    nextLocation = currentLocationOfBoy - 1;
			break;
		  case "right":
		    nextLocation = currentLocationOfBoy + 1;
			break;
		  case "up":
		    nextLocation = currentLocationOfBoy - widthOfBoard;
			break;
	      case "down":
		    nextLocation = currentLocationOfBoy + widthOfBoard;
			break;
		  		  
	  } // switch
	  
	  nextClass = gridBoxes[nextLocation].className;
	  
	  // if the obsolcleis is not passable, don't move 
	  if (noPassObstacles.includes(nextClass)){ return; }
	  
	  // if it's a fence, and there are are no wings, don't move
    console.log("newClass " + newClass);
	  if (!wingsOn && nextClass.includes("fence")) { return; }
    console.log("this should not print");
	  
	  //if there is a fence, move two spaces with animation
	  if (nextClass.includes("fence")){
		  
		  // rider must be on to jump
		  if (wingsOn){
			 gridBoxes[currentLocationOfBoy].className = "";
  			 oldClassName = gridBoxes[nextLocation].className;
		  
		  // set values according to direction
		  if (direction == "left"){
			  nextClass = "boyjumpleft";
			  nextClass2 = "boywingsleft";
			  nextLocation2 = nextLocation - 1;
		  } else if (direction == "right"){
			  nextClass = "boyjumpright";
			  nextClass2 = "boywingsright";
			  nextLocation2 = nextLocation + 1;
		  } else if (direction == "up"){
			  nextClass = "boyjumpup";
			  nextClass2 = "boywingsup";
			  nextLocation2 = nextLocation - widthOfBoard;
     	  } else if (direction == "down"){
			  nextClass = "boyjumpdown";
			  nextClass2 = "boywingsdown";
			  nextLocation2 = nextLocation + widthOfBoard;
		  }
		  
		  // show boy jumping
		  gridBoxes[nextLocation].className = nextClass;
		  
		  setTimeout(function(){
		  
		   // set jump back to just a fence
		   gridBoxes[nextLocation].className = oldClassName;
		   
		   // update current location of boy to be 2 spaces past take off
		   currentLocationOfBoy = nextLocation2;
		   
		   // get class of box after jump
		   nextClass = gridBoxes[currentLocationOfBoy].className;
		   
		   // show boy and wings after landing   
		   gridBoxes[currentLocationOfBoy].className = nextClass2;
		   
		   // if next box is a flag, go up a level
		   levelUp(nextClass);
		  
		  }, 350);
			return;
	  } // if wingsOn

	  
   } // if class has fence


	  // if there is are wings, add wings
	  if (nextClass == "wings"){
		  wingsOn = true;
	  }
	  
	  // if there is a bridge in the old location, keep it
	  if (oldClassName.includes("bridge")){
		  gridBoxes[oldLocation].className = "bridge";
	  } else {
		gridBoxes[oldLocation].className = "";
	  } // else
	  
	  // build name of new class
	  newClass = (wingsOn) ? "boywings" : "boy";
	  newClass += direction;
	  
	  
	  // if there is a bridge in the next location, keep it
	  if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";  
	 
	  }

	  console.log("new class is " + newClass);
	  // move 1 spaces
	  currentLocationOfBoy = nextLocation;
	  gridBoxes[currentLocationOfBoy].className = newClass;
	  
	  
	  // if its is an enemy
	  if (nextClass.includes("KLup")){
		  document.getElementById("lose").style.display = "block";
	  }
	  // move up to next level if needed
	  levelUp(nextClass);
			
			
			

	  } // tryToMove
	  
	  
// move up a level
function levelUp(nextClass){
	
	if (nextClass == "flag" && wingsOn){
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout(function(){
		document.getElementById("levelup").style.display = "none";
		currentLevel++;
		loadLevel();
		
		}, 1000);
	
	} // if

} // levelUp

	  
	  
  // load levels 0 - maxlevel
  function loadLevel(){
	  let levelMap = levels[currentLevel];
	  let animateBoxes;
	  wingsOn = false;
	  
	  // load board
	  for (i = 0; i < gridBoxes.length; i++){
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("boyup")) currentLocationOfBoy = i;
	  } // for
	  
	  animateBoxes = document.querySelectorAll(".animate");
	  
	  animateEnemy(animateBoxes, 0, "right");
	  
  } // loadLevel
  
  
	
	  
	  // animate enemy left to right (could add up and down to this)
	  function animateEnemy(boxes, index, direction){
		  
		  // exit function if no animation
		  if (boxes.length <=0) { return; }
		  
		  // update images
		  if (direction == "right"){
			 boxes[index].classList.add("lionright") 
		  }else{
			 boxes[index].classList.add("lionleft") 
		  }
		  
		  // remove images from other boxes 
		  for (i = 0; i < boxes.length; i++){
			 if (i != index){
				boxes[i].classList.remove("lionleft") 
				boxes[i].classList.remove("lionright") 
		  } // if
	  } // for
	  
	  
	  // moving right
	  if(direction == "right"){
		 // turn around if hit right side
		 if (index == boxes.length - 1){
			 index--;
			 direction = "left";
		 }else{
		  index++;
		 } // else	 
	
	  // moving left
	  }else{
		
		// turn around if hit left side
		 if (index == 0){
			 index++;
			 direction = "right";
		 }else{
		  index--;
		 } // else
	  } // if else
		  
	currentAnimation = setTimeout(function(){
		animateEnemy(boxes, index, direction);
		
		// if enemy hits boy
		if (boxes[index].className.includes("KL")){
			document.getElementById("lose").style.display = "block";
			return;
		}

			
	
	}, 750);
	

	  
  } // animateEnemy
  
  function Instructions(){

  let message1 = "Welcome to My Game"
  let message2 = "The goal is to reach the flag before dying from the lion. You need the wings to pass the big obstacles"

 showLightBox(message1, message2);	
  window.clearInterval(controlPlay);
  controlPlay = false;


} // Instructions

// resume game play
function resumeGame() {
if (!controlPlay){
 controlPlay = window.setInterval(tryToMove, 1000/60 );
}
} // resumeGame


// pause game play
function pauseGame() {
  window.clearInterval(controlPlay);
  controlPlay = false;
} // pauseGame

// start game play
function startGame() {



	loadlevel();




if (!controlPlay){
 controlPlay = window.setInterval(tryToMove, 1000/60 );
}

} // startGame

//stop game play
function stopGame() {
  window.clearInterval(controlPlay);
  controlPlay = false;
 
  // showLightBox with score
  let message1 = "You died!!!";
  let message2 = "Press start to try again";
  window.clearInterval(controlPlay);
  controlPlay = false;
 

showLightBox(message1, message2);



} // stopGame

  
  
  
  /****** Light Box Code ******/

function changeVisibility(divID){
var element = document.getElementById(divID);


//if element exists, toggle it's class
// between hidden and unhidden
if(element) {
element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
} // if
} // changeVisability

// display message in lightbox
function showLightBox(message, message2){
// set messages
document.getElementById("message").innerHTML = message;
document.getElementById("message2").innerHTML = message2;
// show lightbox
changeVisibility("lightbox");
changeVisibility("boundaryMessage");
}

// close lightbox
function continueGame(){

  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
 
  // if the game is over, show controls
changeVisibility("controls");


}

/****** End Light Box Code ******/
