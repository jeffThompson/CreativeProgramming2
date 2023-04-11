/*
PONG
Jeff Thompson | 2023 | jeffreythompson.org

https://www.ponggame.org

CHALLENGE
1. Can you make the speed of the ball increase
   as the score goes up? Or make the paddle shorter?

*/

let score = 0;
let ball;
let paddle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  
  ball = new Ball();
  paddle = new Paddle();
}

function draw() {
  background(220);

  fill(0);
  noStroke();
  text('SCORE: ' + score, 15,20);
  
  ball.update();
  ball.display();
  
  paddle.update();
  paddle.display();
}

