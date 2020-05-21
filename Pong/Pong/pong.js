// global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;


const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;


const ballHeight = document.getElementById("ball").offsetHeight;


const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;


var score1 = 0;
var score2 = 0;

var buzzer = new sound("Buzzer.mp3");
var bounce = new sound("Bounce.mp3");





// start the ball movement
function startBall() {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	// 50% chance of starting in either direcion(right or left)
	if (Math.random() < 0.5){
	  direction = 1;
	}else{
	  direction = -1;
	}
	topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);
	
}

/* start ball moving
window.addEventListener('load', function(){
	startBall();
});
*/
// moves paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down" + e.keyCode);
	if (e.keyCode == 87 || e.which == 87){ // W
		speedOfPaddle1 = -10;
	}
	if (e.keyCode == 83 || e.which == 83){ // S
	speedOfPaddle1 = 10;	
	}
	
	
});

// Stops left paddle
document.addEventListener('keyup', function(e) {
	//console.log("key up" + e.keyCode);
	if (e.keyCode == 87 || e.which == 87){ // W
		speedOfPaddle1 = 0;
		
	}
	if (e.keyCode == 83 || e.which == 83){ // S
	speedOfPaddle1 = 0;	
	}
	
});

// moves right paddle
document.addEventListener('keydown', function(e) {
	//console.log("key down" + e.keyCode);
	if (e.keyCode == 38 || e.which == 38){ // Up arrow
		speedOfPaddle2 = -10;
	}
	if (e.keyCode == 40 || e.which == 40){ // down arrow
	speedOfPaddle2 = 10;	
	}
	
	
});

// Stops right paddle
document.addEventListener('keyup', function(e) {
	//console.log("key up" + e.keyCode);
	if (e.keyCode == 38 || e.which == 38){ // Up arrow
		speedOfPaddle2 = 0;	
	}
	if (e.keyCode == 40 || e.which == 40){ // down arrow
	speedOfPaddle2 = 0;	
	}
	
});

// object constructor to play sounds
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src){
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("preload", "auto");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
		
	}
	this.stop = function(){
		this.sound.pause();
	
		
	
	
	}

}




// updates locations of paddles and ball
window.setInterval(function show() {

	const gameboardHeight = document.getElementById("gameBoard").offsetHeight;

	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;

	
	

	// stops the paddle from leaving top the gameboard
	if(positionOfPaddle1 <= 0){
	positionOfPaddle1 = 0;	
	}
	if(positionOfPaddle2 <= 0){
	positionOfPaddle2 = 0;	
	}
	
	// stops the left paddle from leaving below the gameboard
	if (positionOfPaddle1 >= gameboardHeight - paddleHeight){
	   positionOfPaddle1 = gameboardHeight - paddleHeight;	
	}	
	if (positionOfPaddle2 >= gameboardHeight - paddleHeight){
	   positionOfPaddle2 = gameboardHeight - paddleHeight;	
	}	
	
	// if the ball hits top, or bottom, of gameboard, change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
		topSpeedOfBall *= -1;

	}
	
	// ball on left edge of gameboard
	if (leftPositionOfBall <= paddleWidth){
		
		// if ball hits left paddle, change direction
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 +paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1; 
		}else{	
			buzzer.play();
			startBall();
			score2 = score2 + 1;


	} // else
	}// if
	
	// ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		
		// if ball hits right paddle, change direction
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1; 
		}else{	
		buzzer.play();
		startBall();
		score1 = score1 + 1;
		

	} // else
	
	}

	
	
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	
	document.getElementById("score1").innerHTML = score1;
	document.getElementById("score2").innerHTML = score2;
	
	


}, 1000/60); // show


// resume game play
function resumeGame() {
	if (!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60 );
	}
} // resumeGame


// pause game play
function pauseGame() {
  window.setInterval(controlPlay);
  controlPlay = false;
} // pauseGame

// start game play
function startGame() {
	
	// reset score,paddles and ball
	score1 = 0;
	score2 = 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	
	startBall();
	

	if (!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60 );
	}

} // resumeGame
//stop game play
function stopGame() {
  window.setInterval(controlPlay);
  controlPlay = false;
  
  // showLightBox with score
  let message1 = "Tie Game";
  let message2 = "Close to continue";
  
  if (score2 > score1){
	  message1 = "Player 2 wins with" + score2 + " points!";
	  message2 = "Player 1 had" + score1 + " points!";
} else if (score1 > score2){
	  message1 = "Player 1 wins with" + score1 + " points!";
	  message2 = "Player 2 had" + score2 + " points!";
} // else
	
	showLightBox(message1, message2)



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
