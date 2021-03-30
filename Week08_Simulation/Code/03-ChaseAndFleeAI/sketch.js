/*
CHASE AND FLEE
Jeff Thompson | 2015/17/21 | www.jeffreythompson.org

While there is a ton of really cool work on games and AI, 
the tech is really complicated and mathy. This example shows 
a VERY basic chase and flee behavior. 

The p5.js vector object simplifies a lot of this math for us.
We can calculate the direction an entity should move towards
another by subtracting their positions, calculate the distance
between two vectors, and even use those values to move an
entity in a particular direction!

For more ideas, see Valentino Braitenberg's "vehicles", which
do things like seek light and hide from each other:
http://en.wikipedia.org/wiki/Braitenberg_vehicle

SEE ALSO
+ https://gamedevelopment.tutsplus.com/series/understanding-
  steering-behaviors--gamedev-12732
+ https://www.gamasutra.com/blogs/JuanBelonPerez/20140724/221421/
  Introduction_to_Steering_Behaviours.php
+ https://natureofcode.com/book/chapter-6-autonomous-agents

CHALLENGES
1. Our chase ball bounces around when it hits you. Can you stop
   that behavior by checking if it's position is within the
   player's circle, and not updating if that's true?
2. Can you make the chase ball turn to face the player? Use a shape
   like a triangle and vector's angleBetween() function. Hint:
   you'll need to use push/pop() too.
3. Can you make the fleeing ball move faster or slower the close
   we get to it?

*/

let chaseSpeed = 2.0;     // speed to chase
let fleeSpeed =  0.5;     // try changing and see what happens

let player, chase, flee;  // position of the 3 elements


function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  // set initial positions onscreen (x and y)
  player = createVector(0, 0);
  chase =  createVector(width/2 - 100, height/2);
  flee =   createVector(width/2 + 100, height/2);
}


function draw() {
  background(240);

  // player, which follows our cursor
  player.x = mouseX;
  player.y = mouseY;
  fill(255, 0, 0);
  noStroke();
  circle(player.x, player.y, 30);

  // now for the AI!
  
  // the chasing ball checks which direction
  // the player is in, then moves incrementally
  // that direction
  let dir = p5.Vector.sub(player, chase);  // easy!
  dir.normalize();                         // set to range of 0-1
  dir.mult(chaseSpeed);                    // scale by the speed
  chase.add(dir);                          // add the direction to the chaser's position
  fill(0);
  circle(chase.x, chase.y, 30);
  
  // flee is basically like chase, except we subtract
  // the direction instead of add!
  // here we also only flee if the player is within
  // 100px, which gives a more natural interaction
  let distBetween = player.dist(flee);  // how far apart are we?
  if (distBetween < 100) {              // if closer than 100px, flee!
    dir = p5.Vector.sub(player, flee);  // same as chase above...
    dir.normalize();
    dir.mult(fleeSpeed);
    flee.sub(dir);                      // ...except subtract instead of add
  }
  fill(0,150,255);
  circle(flee.x, flee.y, 30);
}

