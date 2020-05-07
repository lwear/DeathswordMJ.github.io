let currentPlayer = "X";
let gameStatus = "";   // "" - continue game, "Tie", "X wins","O wins"
let numTurns = 0;

 // take player turn
function playerTakeTurn(e) {

 if(e.innerHTML == ""){
	e.innerHTML = currentPlayer;// this is the line that adds X or O to the board
	checkGameStatus();	
 }else{
	showLightBox("This box is already selected.", "Please try another.");
	console.log("This box is already selected, please try another.");	
	return;
 } // else
	 
 // game is over
 if (gameStatus != ""){
	 console.log("game is over, " + gameStatus);
 }

} // playerTakeTurn

// after each turn, check for a winner, a tie 
// or continue playing

function checkGameStatus(){
	numTurns++ // count turn


	// check for win
	if(checkWin()){
		console.log("Game status: " + gameStatus);
		showLightBox(gameStatus = currentPlayer + " wins!","Game Over!");
		return true;
	} // if
	
	// check for tie
	if(numTurns == 9){
		gameStatus = "Tie Game";
		console.log("Game status: " + gameStatus);
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
  

}