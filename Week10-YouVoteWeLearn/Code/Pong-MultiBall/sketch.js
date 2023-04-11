/*
PONG: MULTI-BALL
Jeff Thompson | 2023 | jeffreythompson.org

CHALLENGES
1. Can you make the balls random colors?
2. How might you make certain balls give you
   power-ups or take away more points?

*/

let numBalls = 10;
let score =    0;

let balls;
let paddle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  // instead of one ball, create a list of them!
  balls = [];
  for (let i=0; i<numBalls; i++) {
    let b = new Ball();
    balls.push(b);
  }

  paddle = new Paddle();
}

function draw() {
  background(220);

  fill(0);
  noStroke();
  text('SCORE: ' + score, 15,20);
  
  // update and display all the balls
  for (let i=0; i<balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }

  // nothing else is different!
  // that's what's so cool about object-oriented
  // programming, you can create a template and
  // add tons more instances with no extra work!
  
  paddle.update();
  paddle.display();
}

