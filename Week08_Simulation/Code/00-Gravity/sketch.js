/*
GRAVITY
Jeff Thompson | 2015/21 | www.jeffreythompson.org

Simulating physics can be pretty easy (like this gravity
example) or REALLY complicated. Here we move a ball downward
using gravity and control its "bounciness" with a friction
variable.

For an example with directional movement, see "Bouncy Bubbles"
in the "Motion" section of the p5.js examples. For REALLY fancy 
(but complicated) physics, try the Box2D engine for Processing, 
explained in Daniel Shiffman's great book "Nature of Code".

CHALLENGES
1. Try moving this code to an object-oriented approach, randomly
   adding balls to a list and dropping them across the screen
   from random X coordinates like bouncing raindrops.
2. Instead of just the bottom of the screen, can you make the ball
   bounce off of a box? What about a list of balls bouncing 
   off a list of boxes?

*/

let dia =        50;   // size of the ball
let gravity =    0.5;  // strength of gravity - try changing!
let bounciness = 0.8;  // aka friction - also change!

let x, y;              // position
let speed = 0;         // initial speed is 0


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  x = width/2;  // start ball at center
  y = dia*2;    // and just below the top
}


function draw() {
  background(50);
  
  // incrementally adding gravity to the speed
  // makes the ball accelerate
  speed += gravity;
  
  // then add speed to the position
  y += speed;
  
  // bounce!
  // first we set the position of the ball to the 
  // bottom, otherwise it drifts down below the bottom,
  // then we reverse the direction and reduce the speed
  // by multiplying it by "bounciness"
  if (y + dia/2 > height) {
    y = height-dia/2;
    speed *= -bounciness;
  }
  
  // draw the ball
  fill(255);
  noStroke();
  ellipse(x, y, dia, dia);
}


// any key to drop the ball again
function  keyPressed() {
  setup();
}

