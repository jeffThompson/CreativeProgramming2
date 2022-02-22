/*
COLOR TRACKING
Jeff Thompson | 2017/21 | jeffreythompson.org

So far, we've looked at how to process images but 
we haven't been extracting much information from 
them (ie the "vision" part of "computer vision"). 
Detecting things like faces is very complex and is 
the result of decades of research, so we'll start
much more simply: detecing if a single color is 
present in an image. 

If you have control over the context (ie objects in
the scene, lighting, and background) this can work 
really well. In the real world, though, light and
cameras can be really variable. The "tolerance"
variable helps here a bit, giving more flexibility
for matching.

CHALLENGES
1. Can you save the previously selected color so,
   when the user comes back, they start where they
   left off? (Hint: see storeItem() for details.)
2. You'll notice that our tracking is a bit jumpy. 
   One way to fix that is to perform a running 
   average of the location, a process called 
   "smoothing." Can you implement this? (Hint: you'll 
   need an array of points, which is constantly 
   shifted and  averaged.)
3. Another way we might improve our system is by
   first looking for the color in the region it was
   last found; if it's not there, then looking at
   the entire image. Can you implement this?

*/

// how much wiggle-room is allowed when
// matching the color?
let tolerance = 5;

// color to look for (set with mouse click)
let colorToMatch;

let video;


function setup() {
  createCanvas(windowWidth, windowHeight);

  // an initial color to look for
  colorToMatch = color(255,150,0);

  // webcam capture
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}


function draw() { 
  image(video, 0,0);

  // get the first matching pixel
  // in the image
  let firstPx = findColor(video, colorToMatch, tolerance);
  
  // if we got a result (is not undefined)
  // then draw a circle in that location
  if (firstPx !== undefined) {
    fill(colorToMatch);
    stroke(255);
    strokeWeight(2);
    circle(firstPx.x, firstPx.y, 30);
  }
}


// use the mouse to select a color to track
function mousePressed() {
  loadPixels();
  colorToMatch = get(mouseX, mouseY);

  // note we use get() here, which is probably
  // ok since it's one pixel – could def do this
  // with pixels[index] too
}


// find the first instance of a color 
// in an image and return the location
function findColor(input, c, tolerance) {
  
  // if we don't have video yet (ie the sketch
  // just started), then return undefined
  if (input.width === 0 || input.height === 0) {
    return undefined;
  }

  // grab rgb from color to match
  let matchR = c[0];
  let matchG = c[1];
  let matchB = c[2];

  // look for the color!
  // in this case, we look across each row 
  // working our way down the image – depending 
  // on your project, you might want to scan 
  // across instead
  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
 
      // current pixel color
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];

      // if our color detection has no wiggle-room 
      // (either the color matches perfectly or isn't 
      // seen at all) then it won't work very well in 
      // real-world conditions to overcome this, we 
      // check if the rgb values are within a certain 
      // range – if they are, we consider it a match
      if (r >= matchR-tolerance && r <= matchR+tolerance &&
          g >= matchG-tolerance && g <= matchG+tolerance &&
          b >= matchB-tolerance && b <= matchB+tolerance) {

          // send back the x/y location immediately
          // (faster, since we stop the loop)
          return createVector(x, y);
      }
    }
  }

  // if no match was found, return 'undefined'
  return undefined;
}

