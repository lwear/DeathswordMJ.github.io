// global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetHeight;


const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;


const ballHeight = document.getElementById("ball").offsetHeight;


const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

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


window.addEventListener('load', function(){
	startBall();
});

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
	
	
});

// moves right paddle
document.addEventListener('keydown', function(r) {
	//console.log("key down" + e.keyCode);
	if (r.keyCode == 38 || r.which == 38){ // Up arrow
		speedOfPaddle2 = -10;
	}
	if (r.keyCode == 40 || r.which == 40){ // down arrow
	speedOfPaddle2 = 10;	
	}
	
	
});

// Stops right paddle
document.addEventListener('keyup', function(e) {
	//console.log("key up" + e.keyCode);
	if (e.keyCode == 38 || e.which == 38){ // Up arrow
		speedOfPaddle2 = 0;
		
	}

	
});


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
			leftSpeedOfBall *= -1; 
		}else{
			
		startBall();
		
	} // else
	
	}// if
	
	// ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		
		// if ball hits right paddle, change direction
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
			leftSpeedOfBall *= -1; 
		}else{
			
		startBall();
	} // else
	}

	
	
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";


}, 1000/60); // show



