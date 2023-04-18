/*
WIND
Jeff Thompson | 2015/21 | www.jeffreythompson.org

A simple simulation of wind blowing a tree. The angle of the 
tree (which is bent by the "wind") moves back-and-forth randomly
using Perlin noise, a more realistic way to get random motion.
Invented in the 1980s by Ken Perlin, it has been used in movies
and games for 35+ years to generate clouds, terrain, and other
organic features.

Our "tree" is really just a line and a circle: a fancier version, 
commented out, using a recursive function to draw a Pythagoras 
Tree instead of a line-and-circle.

SEE ALSO
+ https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)

CHALLENGES
1. How might you visualize the wind onscreen?
2. Can you draw grass or other elements that are effected by the
   same global wind value?
3. Can you draw a leaf at the end of each branch? What about just
   the branches where recursion reaches the minimum length?

*/

let trunkLen =    300;   // length of the trunk
let windInc =     0.01;  // how quickly wind changes speed (try changing)

let windSpeed =   0;     // speed, which will = angle of bend
let noisePos =    0;     // "position" in the Perlin noise

// for the fancier Pythagoras tree
let branchAngle = 30;    // angle between two branches
let minLen =      10;    // minimum size of branches


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // nothing else here!
}


function draw() {
  background(50);
  
  // draw a simple tree
  push();
  translate(width/2, height);
  rotate(radians(windSpeed));
  stroke(10);
  strokeWeight(5);
  line(0,0, 0,-trunkLen);
  fill(255, 100);
  noStroke();
  circle(0,-trunkLen, trunkLen); 
  pop();
  
  // or a fancier "Pythagoras Tree" - a kind
  // of fractal pattern using a recursive function
  // translate(width/2, height);
  // stroke(255);
  // strokeWeight(3);
  // line(0,0, 0,-trunkLen);
  // branch(trunkLen);
  
  // update wind speed using 1D Perlin noise
  // noise() returns a value 0 to 1, so mult by 30 means
  // the wind speed will result in an angle of 0-30º
  windSpeed = noise(noisePos) * 30;
  noisePos += windInc;
  
  // random() will generate movement that is jerky and unrealistic
  // try this instead and see what happens
  // windSpeed += random(-0.6,0.5);
}


// a recursive function to draw the tree (for more information
// on recursive functions, see Basics > Recursion)
function branch (len) {
 
  // store previous and reduce branch length
  let prevLen = len;
  len *= 0.5 * sqrt(2);    // experiment with changing this and see what happens
  
  // keep going until the branches are too small
  if (len > minLen) {
    
    // larger branches are stiffer than little ones
    let stiffness = map(len, minLen, trunkLen, 1.0, 0.2);
  
    // add some twist based on the wind speed and stiffness
    let twist = windSpeed * stiffness;
    
    // draw left branches
    push();                                 // local mode
    translate(0, -prevLen);                 // move up to top of prev branch
    rotate(radians(-branchAngle + twist));  // rotate to new position + twist from wind*
    line(0, 0, 0, -len);                    // draw as a line
    branch(len);                            // call again!
    pop();

    // *NOTE we only add twist to branches on the left side
    // it's more realistic but try it with both to see what happens

    // draw right branches too
    push();
    translate(0, -prevLen);
    rotate(radians(branchAngle));
    line(0, 0, 0, -len);
    branch(len);
    pop();
  }
}

