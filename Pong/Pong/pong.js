// global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1 = positionOfPaddle1 = document.getElementById("paddle1").offsetTop;


var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

var paddleHeight1 = document.getElementById("paddle1").offsetHeight;
var paddleHeight2 = document.getElementById("paddle2").offsetHeight;
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

var counter = 0;
var counter2 = 0;

var buzzer = new sound("Buzzer.mp3");
var bounce = new sound("Bounce.mp3");
var powerup = new sound("Powerup.mp3");

// used to control game start/stop
var controlPlay;


// power
document.addEventListener('keydown', function(e) {

if (e.keyCode == 81 || e.which == 81){ // q
power1();
}
});

function power1() {
	counter++;

	
if (counter <=3){
	powerup.play();
document.getElementById("paddle1").style.height = "300px";
paddleHeight1 = document.getElementById("paddle1").offsetHeight;
setTimeout(depower1, 3000)
} // if
}//power1

function depower1() {
document.getElementById("paddle1").style.height = "150px";
paddleHeight1 = document.getElementById("paddle1").offsetHeight;
}


// power2
document.addEventListener('keydown', function(e) {

if (e.keyCode == 96 || e.which == 96){ // 0
power2();
}
});

function power2() {
	counter2++;

	if (counter2 <=3){
	powerup.play();
document.getElementById("paddle2").style.height = "300px";
paddleHeight2 = document.getElementById("paddle2").offsetHeight;
setTimeout(depower2, 3000)

} // if

}//power2

function depower2() {
document.getElementById("paddle2").style.height = "150px";
paddleHeight2 = document.getElementById("paddle2").offsetHeight;
}


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
function show() {

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
if (positionOfPaddle1 >= gameboardHeight - paddleHeight1){
  positionOfPaddle1 = gameboardHeight - paddleHeight1;
}
if (positionOfPaddle2 >= gameboardHeight - paddleHeight2){
  positionOfPaddle2 = gameboardHeight - paddleHeight2;
}

// if the ball hits top, or bottom, of gameboard, change direction
if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
topSpeedOfBall *= -1;

}

// ball on left edge of gameboard
if (leftPositionOfBall <= paddleWidth){

// if ball hits left paddle, change direction
if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight1){
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
if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight2){
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




}// show


// resume game play
function resumeGame() {
if (!controlPlay){
 controlPlay = window.setInterval(show, 1000/60 );
}
} // resumeGame


// pause game play
function pauseGame() {
  window.clearInterval(controlPlay);
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

} // startGame

//stop game play
function stopGame() {
  window.clearInterval(controlPlay);
  controlPlay = false;
 
  // showLightBox with score
  let message1 = "Tie Game";
  let message2 = "Close to continue";
 
  if (score2 > score1){
 message1 = "Player 2 wins with " + score2 + " points!";
 message2 = "Player 1 had " + score1 + " points!";
} else if (score1 > score2){
 message1 = "Player 1 wins with " + score1 + " points!";
 message2 = "Player 2 had " + score2 + " points!";
} // else
	
counter = 0;
counter2 = 0;

showLightBox(message1, message2);



} // stopGame

function Instructions(){

 let message1 = "Welcome to Pong"
let message2 = "Each player will have a powerup which makes their paddle bigger for a few seconds. Q is the left player's button and 0 on the number pad is for the right-side player. Each player has 3 powerups.Press Resume Game to continue"
showLightBox(message1, message2);	
  window.clearInterval(controlPlay);
  controlPlay = false;
	
	
	
	
	
	
}


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