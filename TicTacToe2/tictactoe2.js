let currentPlayer = "X";
let gameStatus = "";   // "" - continue game, "Tie", "X wins","O wins"
let numTurns = 0;
let idNames = ["one","two","three","four","five","six","seven","eight","nine"];



// reset board and all variables
function newGame(){

	// reset game
	for (var i = 0; i < idNames.length; i++){
	document.getElementById(idNames[i]).innerHTML = "";

	} // for	
		
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";

	changeVisibility("controls");
}

function computerTakeTurn(){
 let cb = []; // curent board
 cb[0] = ""; // not going to use
 cb[1] = document.getElementById("one").innerHTML;
 cb[2] = document.getElementById("two").innerHTML;
 cb[3] = document.getElementById("three").innerHTML;
 cb[4] = document.getElementById("four").innerHTML;
 cb[5] = document.getElementById("five").innerHTML;
 cb[6] = document.getElementById("six").innerHTML;
 cb[7] = document.getElementById("seven").innerHTML;
 cb[8] = document.getElementById("eight").innerHTML; 
 cb[9] = document.getElementById("nine").innerHTML;
 let idName = "";
 
		// top row
 if(cb[3] == "" && cb[1] != "" && cb[1] == cb[2]){
	  cb[3] = document.getElementById("three").innerHTML = currentPlayer;
		// top row
 }else if(cb[2] == "" && cb[1] != "" && cb[1] == cb[3]){
	  cb[2] = document.getElementById("two").innerHTML = currentPlayer;
	 // top row
}else if(cb[1] == "" && cb[2] != "" && cb[2] == cb[3]){
	  cb[1] = document.getElementById("one").innerHTML = currentPlayer;  
	  // left column
}else if(cb[7] == "" && cb[1] != "" && cb[1] == cb[4]){
	  cb[7] = document.getElementById("seven").innerHTML = currentPlayer;
	  // left column
}else if(cb[1] == "" && cb[4] != "" && cb[4] == cb[7]){
	  cb[1] = document.getElementById("one").innerHTML = currentPlayer;
	// left column	  
}else if(cb[4] == "" && cb[1] != "" && cb[1] == cb[7]){
	  cb[4] = document.getElementById("four").innerHTML = currentPlayer;
      // middle row	  
}else if(cb[6] == "" && cb[4] != "" && cb[4] == cb[5]){
	  cb[6] = document.getElementById("six").innerHTML = currentPlayer;
	  // middle row
}else if(cb[4] == "" && cb[5] != "" && cb[5] == cb[6]){
	  cb[4] = document.getElementById("four").innerHTML = currentPlayer; 
	  // middle row
}else if(cb[5] == "" && cb[4] != "" && cb[4] == cb[6]){
	  cb[5] = document.getElementById("five").innerHTML = currentPlayer; 
	  // middle column
}else if(cb[8] == "" && cb[2] != "" && cb[2] == cb[5]){
	  cb[8] = document.getElementById("eight").innerHTML = currentPlayer; 
	  // middle column
}else if(cb[2] == "" && cb[5] != "" && cb[5] == cb[8]){
	  cb[2] = document.getElementById("two").innerHTML = currentPlayer; 
	  // middle column
}else if(cb[5] == "" && cb[2] != "" && cb[2] == cb[8]){
	  cb[5] = document.getElementById("five").innerHTML = currentPlayer; 
	  // bottom row
}else if(cb[9] == "" && cb[7] != "" && cb[7] == cb[8]){
	  cb[9] = document.getElementById("nine").innerHTML = currentPlayer; 
	  // bottom row
}else if(cb[7] == "" && cb[8] != "" && cb[8] == cb[9]){
	  cb[7] = document.getElementById("seven").innerHTML = currentPlayer; 
	  // bottom row
}else if(cb[8] == "" &&  cb[7] != "" && cb[7] == cb[9]){
	  cb[8] = document.gtElementById("eight").innerHTML = currentPlayer;
	  // right column
}else if(cb[9] == "" && cb[3] != "" && cb[3] == cb[6]){
	  cb[9] = document.getElementById("nine").innerHTML = currentPlayer; 
	  // right column
}else if(cb[3] == "" && cb[6] != "" && cb[6] == cb[9]){
	  cb[3] = document.getElementById("three").innerHTML = currentPlayer;
	  // right column
}else if(cb[6] == "" && cb[3] != "" && cb[3] == cb[9]){
	  cb[6] = document.getElementById("six").innerHTML = currentPlayer;
	  // right diagonal
}else if(cb[5] == "" && cb[7] != "" && cb[7] == cb[3]){
	  cb[5] = document.getElementById("five").innerHTML = currentPlayer;
	  // right diagonal
}else if(cb[7] == "" && cb[3] != "" && cb[3] == cb[5]){
	  cb[7] = document.getElementById("seven").innerHTML = currentPlayer;
	  // right diagonal
}else if(cb[3] == "" && cb[5] != "" && cb[5] == cb[7]){
	  cb[3] = document.getElementById("three").innerHTML = currentPlayer;
	  // left diagonal
}else if(cb[9] == "" && cb[1] != "" && cb[1] == cb[5]){
	  cb[9] = document.getElementById("nine").innerHTML = currentPlayer; 
	  // left diagonal
}else if(cb[5] == "" && cb[1] != "" && cb[1] == cb[9]){
	  cb[5] = document.getElementById("five").innerHTML = currentPlayer; 
	  // left diagonal
}else if(cb[1] == "" && cb[5] != "" && cb[5] == cb[9]){
	  cb[1] = document.getElementById("one").innerHTML = currentPlayer;
 	  
	  
}else { 	  
 
	// chose random boxes until empty box is found
	do {
	  let rand = parseInt(Math.random()*9) + 1; // 1-9
	  idName = idNames[rand-1];

	  // check if box is empty
	  
	  if (document.getElementById(idName).innerHTML == ""){
		 document.getElementById(idName).innerHTML = currentPlayer;
		 break;
	  } // if
	  
	} while(true);
	
}


} // computerTakeTurn



 // take player turn
function playerTakeTurn(e) {

 if(e.innerHTML == ""){
	e.innerHTML = currentPlayer;// this is the line that adds X or O to the board
	checkGameStatus();

	// if game is not over, computer goes
	if (gameStatus == ""){
		setTimeout(function() {
		    computerTakeTurn();
		    checkGameStatus();
		}, 500
		);
	} // if

		
 }else{
	showLightBox("This box is already selected.", "Please try another.");
	return;
 } // else
	 
 

} // playerTakeTurn

// after each turn, check for a winner, a tie 
// or continue playing

function checkGameStatus(){
	numTurns++ // count turn


	// check for win
	if(checkWin()){
		showLightBox(gameStatus = currentPlayer + " wins!","Game Over!");
		return true;
	} // if
	
	// check for tie
	if(numTurns == 9){
		gameStatus = "Tie Game";
		showLightBox(gameStatus = "Tie Game", "Game Over!");
		
	} // if
	
	
	// switches current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
} // checkGameStatus

// check for a Win, there 8 win paths
function checkWin() {
 let cb = []; // curent board
 cb[0] = ""; // not going to use
 cb[1] = document.getElementById("one").innerHTML;
 cb[2] = document.getElementById("two").innerHTML;
 cb[3] = document.getElementById("three").innerHTML;
 cb[4] = document.getElementById("four").innerHTML;
 cb[5] = document.getElementById("five").innerHTML;
 cb[6] = document.getElementById("six").innerHTML;
 cb[7] = document.getElementById("seven").innerHTML;
 cb[8] = document.getElementById("eight").innerHTML; 
 cb[9] = document.getElementById("nine").innerHTML;
	
 // top row
 if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
	 return true;
 }// if
 
 // second row
 if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
	 return true;
 }// if
 
 // third row
 if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
	 return true;
 }// if
 
 // left collum
 if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
	 return true;
 }// if
 
 // mid collum
 if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
	 return true;
 }// if
 
 // right collum
 if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
	 return true;
 }// if
 
 // right diagonal
 if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
	 return true;
 } // if
 
 // left diagonal
 if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
	 return true;
 } // if
 


	
} // checkWin

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
  if (gameStatus != ""){
	  changeVisibility("controls");
	  
  } // if

}