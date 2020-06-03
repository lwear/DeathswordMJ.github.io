 const levels = [
	// level 0
		["flag", "rock","","","",
		"fence", "rock","","","",
		"", "tree","animate","animate","animate",
		"", "water","","","",
		"", "fence","","boyup",""],
		
	// level 1
	
		["flag", "rock","","","",
		"fence", "rock","","","wings",
		"", "tree","animate","animate","animate",
		"", "water","","","",
		"", "fence","","boyup","" ],
		
	// level 2
	
		["flag", "rock","","","",
		"fence", "rock","","","wings",
		"", "tree","animate","animate","animate",
		"", "water","","","",
		"", "fence","","boyup","" ]
  
  ]; // end of levels
  
  const gridBoxes = document.querySelectorAll("#gameBoard div")
  var currentLevel = 0; // starting level
  var wingson = false;
  var currentLocationOfBoy = 0;
  var currentAnimation; // alows 1 animation per level
  
  
  window.addEventListener("load",function (){
	  loadLevel();
  });
  
  // load levels 0 - maxlevel
  function loadLevel(){
	  let levelMap = levels[currentLevel];
	  let animateBoxes;
	  riderOn = false;
	  
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
	  }
	currentAnimation = setTimeout(function(){
		animateEnemy(boxes, index, direction);
	}, 750);
	





	  
	  
  } // animateEnemy