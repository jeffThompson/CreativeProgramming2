
/*
GRAVITY (WITH PVECTOR)
Jeff Thompson | 2015/20 | www.jeffreythompson.org
 
A version of the Gravity example, but using PVector instead
so we can add additional motion or forces! In many ways, this
cleans up our code, removing the need for separate x/y
values for position and complex forces like wind.

WHY IS "BOUNCINESS" NOT A PVECTOR?
Some forces are vectors (like speed, which can go in 2 directions)
but others are "scalar" forces, single values. Friction is a
scalar, meaning it applies equally both the x and y direction.
 
Want to go really deep? Check out this article that talks about
the many (many!) forces at play with a simple bouncing ball:
https://en.wikipedia.org/wiki/Bouncing_ball

CHALLENGES:
+ Can you make the ball reverse direction when it hits
  the right and left side of the screen?
 
*/


float dia =        50;      // size of the ball

float bounciness = 0.8;     // see note above

PVector position;           // position and forces can
PVector gravity;            // be listed as PVectors
PVector speed;          


void setup() {
  size(800, 800);

  float x = dia;                 // start ball the top-left
  float y = dia;                
  position = new PVector(x, y);  // create a PVector with those positions

  // we can create PVectors for force too!
  // (note this only has force in the Y, or downward, direction)
  gravity = new PVector(0, 0.5);

  // speed starts at zero in the y direction
  // but we can give it some motion in the x direction too!
  speed = new PVector(3, 0);
}


void draw() {
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
  ellipse(position.x, position.y, dia, dia);
}


// any key to drop the ball again
void keyPressed() {
  setup();
}
