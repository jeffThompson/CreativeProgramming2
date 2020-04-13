
/*
FOREST FIRE
Jeff Thompson | jeffreythompson.org | 2011/20

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

CHALLENGES
+ Can you keep track of the number of pixels burned each
  frame and reset the simulation when it's zero?
+ Can you use Perlin noise to create the pattern of trees?
+ Can you add wind that makes the fire move faster in
  one direction?
+ Can you add other elements to our landscape, perhaps ones
  like rocks or ponds that don't burn?
+ What about some terrain that burns faster or slower? (Hint:
  you'll probably need to use a class, keeping track of
  whether an element is burning or not and how long it
  takes to fully burn.)
 
*/


// the overall chance a given pixel will be a tree or
// the ground – try playing with this value!
float treeDensity = 60;   // can be range of 0–100

// variables for trees, ground, and burned spots
// (this isn't necessary, but makes our code below
// much more readable)
int ground =  0;
int tree =    1;
int burned = -1;

color groundColor = color(65, 35, 0);
color treeColor =   color(60, 150, 50);
color burnedColor = color(30, 20, 10);

// we store our "forest" as a 2D array
int[][] forest;


void setup() {
  size(800, 800);
  surface.setLocation(0, 0);
  noCursor();

  // create the forest array (one for each pixel)
  forest = new int[height][width];
  
  // initialize our terrain with randomly-placed trees
  for (int y=0; y<height; y++) {
    for (int x=0; x<width; x++) {
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
  int x = int(width/2);
  int y = int(height/2);
  forest[y][x] = burned;
}


void draw() {
  
  // go through all the values in our forest...
  loadPixels();
  for (int y=0; y<height; y++) {
    for (int x=0; x<width; x++) {
      
      // update the burn
      burn(x, y);
      
      // draw the forest
      float value = forest[y][x];
      int position = y * width + x;
      if (value == ground) {
        pixels[position] = groundColor;
      }
      else if (value == tree) {
        pixels[position] = treeColor;
      }
      else if (value == burned) {
        pixels[position] = burnedColor;
      }
    }
  }
  updatePixels();
}


// any key to reset the simulation
void keyPressed() {
  setup();
}
