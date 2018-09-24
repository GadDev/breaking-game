var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
// Initiate Ball position 
var x = canvas.width/2;
var y = canvas.height - 30;
//**Create Ball  */
// Initialise directions variables for our ball
// x direction
var dx = 3;
// y direction
var dy = -3;
// Radius Ball
var ballRadius = 10;
//**Create Paddle  */
// Initialise variables for our paddle
//Height Paddle
var paddleHeight = 10;
//Width Paddle
var paddleWidth = 75;
// Paddle x position
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
// Instance end state to fix refreshing issue on alert box
var endState = false;
// 5.0 Instance variables for bricks  (CREATING THE BRICK FIELDS)
var brickRowCount = 2;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// 7. Keeping track of the score
var score = 0;
// 9 Adding player lives
var lives = 3;
//10.1 Create level 
var level = 1;
// Set up number of level
var maxLevel= 5;
// Pause variable initiate
var paused = false;

// 5.0.1 create an array
var bricks = [];
//10.6 Function to initialise Bricks field
function initBricks(){
  // Create Array bidimensionnal
  // generate Columns
  for (c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    // for rows
    for (r=0; r < brickRowCount; r++) {
      // Initiate Brick position to x 0 and y 0
      bricks[c][r] = { x: 0, y: 0, status: 1};
    }
  }
}
initBricks();
//3.1 ADDING handle LISTENERs TO PRESS KEY
// key pressed down
document.addEventListener("keydown", keyDownHandler);
//key is released
document.addEventListener("keyup", keyUpHandler);

// 5.1 Drawing Bricks
function drawBricks(){
  for (c=0; c < brickColumnCount; c++) {
    // for rows
    for (r=0; r < brickRowCount; r++) {
      // if brick was not hit,// If the brick is active
      if(bricks[c][r].status == 1){
        //5.2 Instance Exposition x and y of the bricks
        // Managing the positioning for each iteration
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        // Initiate Brick position to x 0 and y 0
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#' + r + 'ff' + r + c + r;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Create Element
// 1.1 Drawing Ball
function drawBall(){
  // drawing Code
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle ="#0095DD";
  ctx.fill();
  ctx.closePath();
}
// 2.1 Drawing Paddle
function drawPaddle(){
  ctx.beginPath;
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath;
}
//6.0 Collision Detection
function collisionDetection(){
  for(c=0; c < brickColumnCount; c++){
    for(r =0; r < brickRowCount; r++){
      //Stored the brick object in each loop
      var b = bricks[c][r];
      // If the brick is active
      if(b.status == 1){
        // If ball HIT the brick it change the direction
        if( x > b.x && x < b.x + brickWidth && y > b.y && y < b.y+brickHeight ){
          dy= -dy;
          b.status = 0;
          //7.2 Hit brick 1 point
          score ++;
          // Statement if you win 
          if(score == brickColumnCount*brickRowCount) {
            //10.1 if you completed all the levels
            if(level === maxLevel) {
              alert("You win, Congratulations");
              document.location.reload();
            } else {
              level++;
              brickRowCount++
              initBricks();
              score = 0;
              //10.2 start the next level
              // Increase speed of the ball
              dx += 1;
              dy -= -dy;
              dy -= 1;
              // Reset ball positionnning
              x = canvas.width/2;
              y = canvas.height-30;
              // Reset Paddles position
              paddleX = (canvas.width-paddleWidth)/2;
              paused = true;
              // Pause Message
              pauseMessage();
              setTimeout(function(){
                paused = false;
                draw();
              },3000);
            }  
          }
        }
      }     
    }
  }
}
//7.1 Draw Score function
function drawScore(){
  ctx.font = "16px Arial ";
  ctx.fillStyle = "#0095dd ";
  ctx.fillText("SCORE: " + parseInt(score), canvas.width-90, 20 );
}
//9.1 Draw Lives function
function drawLives(){
  ctx.font = "16px Arial ";
  ctx.fillStyle = "#0095dd ";
  ctx.fillText("Lives: " + lives , 15 , 20 );
}
//10.4 Draw Level function
function drawLevel(){
  ctx.font = "16px Arial ";
  ctx.fillStyle = "#0095dd ";
  ctx.fillText("Level: " + level , 300 , 20 );
}

function pauseMessage(){
  ctx.beginPath();
  ctx.rect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "#0ff000";
  ctx.fill();
  ctx.font = "80px Arial ";
  ctx.fillStyle = "#0095dd ";
  ctx.fillText("PAUSE" , canvas.width/2-135 , canvas.height/2 );
  ctx.closePath();
}
// 3.2 KEY DOWN HANDLER FUNCTION
// when the key is pressed
// when you press a key down this info is stored
// in a variable (e) and passed into the function
function keyDownHandler(e){
  // right arrow
  if(e.keyCode == 39){
    rightPressed = true;
   
    //left arrow
  }else if(e.keyCode == 37){
    leftPressed = true;
  }else if(e.keyCode == 32){
    if(!paused){
      paused = true;     
    }else {
      paused = false;
      draw();
    }
  }
}
// 3.2 KEY UP (released) HANDLER FUNCTION
// when the key is released
function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  }else if(e.keyCode == 37){
    leftPressed = false;
  }
}
// 0.1 Main Draw function
function draw(){
  //Clear canvas ()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Drawing ball function
  drawBall();
  //Drawing paddle function
  drawPaddle();
  //5.4 Drawing the bricks
  drawBricks();
  //7.4 Drawing Score
  drawScore();
  //9.2 Drawing Lives text
  drawLives();
  //10.5 Drawing Level text
  drawLevel();
  //6.3 Collision Fonction for the brick
  collisionDetection();
  // 1.3 Collision detection for the ball
  // top and bottom cover if the ball touch the edges, ball take the other direction
  //Updating 10 and canvas.height-ballRadius
  // IF the ball touch the top it bounces back
  if( y + dy < ballRadius){
    // Change the direction of the ball 
    dy = -dy;  
  } else if (y + dy > canvas.height-ballRadius){
    //4.2 Paddle touch the ball
    // the ball touch the paddle it bounces back in the other direction
    if( x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    } else {
      //4.1 Game over state
      // IF the ball touch the bottom i=> Game over!!!   
      // Instance variable to TRUE to avoid the refreshing isssue on the alert box
      // endState = true;
      // Reomve live 
      lives--;
      // no more live left => GAME OVER !!!
      if(!lives){
        //end game alert
        alert("GAME OVER");
        // refresh the game
        document.location.reload();
      } else {
        // STILL ALIVE reset the ball and paddle
        //reset ball postion to continue
        x = canvas.width/2;
        y = canvas.height/2;
        //reset padle
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
  // left and right cover if the ball touch the edges, ball take the other direction
  if( x + dx < ballRadius || x + dx > canvas.width-ballRadius){
    // Change the direction of the ball 
    dx = -dx;
  }
  // 2.2 Moving Paddle 
  // 2.3 Collision detection for the paddle right and left
  if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0){
    paddleX -=7;
  }
  // 1.2 MOVING THE BALL
  // Adding dx to x and dy to y position for the next frame
  x += dx;
  y += dy;
  // the draw function is now getttting executed again and again within the request animation frame
  // control of the frame back to the browser
  // it will sink the frame rate accordingly and render the shapes only when needed;
  // If not paused run the game
  if(!paused){
    requestAnimationFrame(draw);
  }
  
}
//8.0 Adding Mouse controls
document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
  // X position of the mouse
  relativeX = e.clientX - canvas.offsetLeft;
  // Collision lock
  if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width - paddleWidth/2) {
    // Center the cursor control 
    paddleX = relativeX - paddleWidth/2;
  }

}

//10.0 Request animation Frame within draw function => improve the rendering
draw();
// Loop at the end to be sure all the variable are initialised
// Gaming LOOPING
// setInterval(draw, 10);