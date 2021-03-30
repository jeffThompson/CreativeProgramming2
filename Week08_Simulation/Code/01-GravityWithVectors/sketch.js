
/*
GRAVITY (with vectors)
Jeff Thompson | 2015/21 | www.jeffreythompson.org
 
A version of the Gravity example, but using vectors instead
so we can add additional motion or forces! In many ways, this
cleans up our code, removing the need for separate x/y
values for position and complex forces like wind.

WHAT IS A VECTOR?
A vector is an object that can store 2D (or 3D) values...
simple as that! This might be a position (x, y), a value
like speed (in the direction x, y) or another force.

Vectors are great because they help us keep things tidy but
also because they offer us some additional math. For example,
we can add two vectors together:

  position.add(speed);

So simple! Compare to using separate x/y values:

  x += speedX;
  y += speedY;

The vector object can also calculate the distance between
two vectors, the angle between them, etc!

WHY IS "BOUNCINESS" NOT A VECTOR?
Some forces are vectors (like speed, which can go in 2 directions)
but others are "scalar" forces, single values. Friction is a
scalar, meaning it applies equally both the x and y direction.
 
Want to go really deep? Check out this article that talks about
the many (many!) forces at play with a simple bouncing ball:
https://en.wikipedia.org/wiki/Bouncing_ball

CHALLENGES:
1. Can you make the ball reverse direction when it hits
   the right and left side of the screen?
 
*/


let dia =        50;   // size of the ball

let bounciness = 0.8;  // see note above

let position;          // position and forces can
let gravity;           // be listed as PVectors
let speed;          


function setup() {
  createCanvas(windowWidth, windowHeight);

  let x = dia;                    // start ball the top-left
  let y = dia;                
  position = createVector(x, y);  // create a PVector with those positions

  // we can create vectors for force too!
  // (note this only has force in the Y, or downward, direction)
  gravity = createVector(0, 0.5);

  // speed starts at zero in the y direction
  // but we can give it some motion in the x direction too!
  speed = createVector(3, 0);
}


function draw() {
  background(50);

  // add gravity to the speed so the ball accelerates
  speed.add(gravity);

  // then add speed to the position to make the ball move
  position.add(speed);

  // bounce by multiplying the speed by the bounciness
  if (position.y + dia/2 > height) {
    position.y = height-dia/2;
    speed.y *= -bounciness;      // negative to bounce up, as before
    speed.x *= bounciness;       // slow the rate of forward
  }                              // motion each time

  // draw the ball
  fill(255);
  noStroke();
  circle(position.x, position.y, dia);
}


// any key to drop the ball again
function keyPressed() {
  setup();
}

