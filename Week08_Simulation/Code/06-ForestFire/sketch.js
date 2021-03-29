/*
FOREST FIRE
Jeff Thompson | 2011/21 | jeffreythompson.org

Based on a classic chaotic algorithm (citation is tricky)
described in James Gleick's amazing book "Chaos." This 
example uses the grid of pixels instead of discreet 
objects: green are trees and black is empty space. A 
single random pixel (the seed) is started on fire. Each
frame we test every pixel: if it's on fire, we set fire
to any neighboring trees.

This kind of grid-based system works great for terrain-
generation too!

SEE ALSO
+ A much more detailed paper that uses a similar approach:
  https://www.intechopen.com/books/forest-fire/forest-fire-model
+ Mathematician John Conway's "Game of Life"
  http://pi.math.cornell.edu/~lipa/mec/lesson6.html
  https://www.youtube.com/watch?v=C2vgICfQawE

CHALLENGES
1. Can you keep track of the number of pixels burned each
   frame and reset the simulation when it's zero?
2. Can you add wind that makes the fire move faster in
   one direction?
3. Can you add other elements to our landscape, perhaps ones
   like rocks or ponds that don't burn?
 
*/

// the overall chance a given pixel will be a tree or
// the ground – try playing with this value!
let treeDensity = 60;   // can be range of 0–100

// variables for trees, ground, and burned spots
// (this isn't necessary, but makes our code below
// much more readable)
let ground =  0;
let tree =    1;
let burned = -1;

let groundColor, treeColor, burnedColor;
let forest;


function setup() {
  createCanvas(400, 400);
  noCursor();

  // our colors for different terrain
  groundColor = color(65, 35, 0);
  treeColor =   color(60, 150, 50);
  burnedColor = color(30, 20, 10);

  // create the forest as a 2D array
  // (one element for each pixel)
  forest = [];
  
  // initialize our terrain with randomly-placed trees
  for (let y=0; y<height; y++) {
    forest[y] = [];
    for (let x=0; x<width; x++) {
      if (random(100) < treeDensity) {
        forest[y][x] = tree;
      }
      else {
        forest[y][x] = ground;
      }
    }
  }
  
  // set fire to the center pixel
  // (could also be random, or multiple locations!)
  let x = int(width/2);
  let y = int(height/2);
  forest[y][x] = burned;
}


function draw() {
  
  // go through all the values in our forest...
  loadPixels();
  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      
      // update the burn
      burn(x, y);
      
      // draw the forest
      let value = forest[y][x];
      if (value === ground) {
        set(x, y, groundColor);
      }
      else if (value === tree) {
        set(x, y, treeColor);
      }
      else if (value === burned) {
        set(x, y, burnedColor);
      }
    }
  }
  updatePixels();
}


// any key to reset the simulation
function keyPressed() {
  setup();
}


function burn(x, y) {
  
  // if already not burned yet, skip
  // (since it's not on fire!)
  if (forest[y][x] != burned) {
    return;
  }
  
  // otherwise, burn this pixel's neighbors...
  
  // neighbor to the left
  if (x-1 >= 0 && forest[y][x-1] === tree) {
    forest[y][x-1] = burned;
  }
  
  // right
  if (x+1 < width && forest[y][x+1] === tree) {
    forest[y][x+1] = burned;
  }
  
  // up
  if (y-1 >= 0 && forest[y-1][x] === tree) {
    forest[y-1][x] = burned;
  }
  
  // down
  if (y+1 < height && forest[y+1][x] === tree) {
    forest[y+1][x] = burned;
  }
}

