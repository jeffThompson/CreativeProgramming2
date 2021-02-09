/*
TEXT TO POINTS (the easy way)
Jeff Thompson | 2021 | jeffreythompson.org

What if we want to transform our text into different shapes?
Or if we want the letters to have physics or other cool
effects applied to them? There are a few ways we might approach
this, but the easiest is to simply draw the text onscreen,
then look at the pixels to see if a letter is present in a
particular spot or not!

Use the mouseX position to make the letters spread into
a cloud and back again.

SEE ALSO
+ The next example (the 'hard way') shows how to get points
  from the outline of a text!

CHALLENGES
1. Play with the parameters here and see how those changes
   affect the overall look and feel of the sketch! Try dot 
   size, the shape that's drawn, and the amount of distortion
   as a starting point
2. Can you make the shapes rotate as they distort too? Don't
   use circles though, duh :)
2. Since randomSeed(0) keeps the randomness exactly the same, 
   when the letters become spread out the result is always 
   the same. Can you come up with a way to change that seed
   value when a certain condition is met?

*/


let gridSize = 10;  // spacing of dots (and their diameter)
let points = [];    // list of points to draw dots at
let font;


function preload() {
  font = loadFont('assets/ZXX-Bold.otf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // to get the locations of the dots, we draw
  // some text onscreen in setup() where it won't
  // actually be seen
  background(255);
  textFont(font);
  textSize(300);
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
  text('LOL', width/2,height/2);
  
  // then, by reading the pixel value onscreen
  // and, if it's black (we'll talk lots
  // more about this in the next project), we
  // capture the position in our list
  loadPixels();
  for (let y=0; y<height; y+=gridSize) {
    for (let x=0; x<width; x+=gridSize) {
      let r = get(x, y)[0];    // get the red value of the pixel
      if (r < 127) {           // at x/y (will be 0–255)
        
        // vectors are super useful objects!
        // they store x/y (or x/y/z) positions in
        // a single variable – really helpful when
        // you want to store a list of coordinates!
        points.push(createVector(x,y));
      }
    }
  }
}


function draw() {
  background(220);
  
  // mouseX will change the amount of mutation in
  // the letters (note: we use randomSeed(0) every frame
  // so the letters don't just become a noisy cloud
  // but behave in a consistent way – try removing the
  // line and see what happens!)
  let mutationAmt = map(mouseX, 0,width, 3,width/6);
  randomSeed(0);
  
  // draw the points, with their mutations!
  for (let i=0; i<points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    x += random(-mutationAmt,mutationAmt);
    y += random(-mutationAmt,mutationAmt);

    fill(0,50);     // shadow
    noStroke();
    circle(x+2,y+2, gridSize);
    
    fill(220);      // regular circle
    stroke(0, 100);
    circle(x,y, gridSize);
  }
}

