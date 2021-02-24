/*
DISTORTING IMAGES
Jeff Thompson | 2021 | jeffreythompson.org

So far, we've only thought about images in terms of x/y
coordinates, changing or looking at pictures as a grid.
But things can get really interesting if we use start
using sin() and even polar coordinates (which see position
as angle and distance from a central point)!

There are two functions in this demo:
Distort: pushes pixels using sin(), try changing
         the variables below to see their effect
Fisheye: uses polar coordinates and some math to
         do a bunch of different, fun distortions!

BASED ON
Created from examples in 'An Interdisciplinary Introduction
to Image Processing: Pixels, Numbers, and Programs' by
Steven L. Tanimoto (thanks!)

CHALLENGES
1. Experiment with some of the settings for each filter
   and catalog the results – can you start to get a sense
   of how each parameter effects the output?

*/

// settings to control the distort filter
// (tbh, not really understanding how these values
// interact – try playing with them!)
let wavinessX = 10;  // smaller number = fewer repetitions
let wavinessY = 10;
let periodX =   15;  // smaller number = more
let periodY =   15;

let img;


function preload() {
  img = loadImage('assets/test.jpg');
}


function setup() {
  
  // resize the image to fit the window, then 
  // create the canvas at that size
  img.resize(windowWidth, 0);
  createCanvas(img.width, img.height);
  noLoop();
}


function draw() {
  
  // run the distort filter, which creates freaky, wavy
  // blobs of pixels
  img = distort(img, wavinessX,wavinessY, periodX,periodY);
  
  // fisheye filter (see the code for some other options too!)
  // img = fisheye(img, width/2,height/2);
  
  // display the resulting image
  image(img, 0,0);
}


function distort(input, wavinessX, wavinessY, periodX, periodY) {
  let output = createImage(input.width, input.height);
  input.loadPixels();
  output.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {      
      
      // this formula is where the magic happens!
      // we calculate new x/y position and grab pixels
      // from the source image at that location
      let tempX = x + wavinessX * sin(x/periodX);
      let tempY = y + wavinessY * sin(y/periodY);
      let px = input.get(tempX, tempY);
      
      // then put those colors into the output
      // image at the regular x/y position
      output.set(x,y, px);
    }
  }
  output.updatePixels();
  return output;
}


function fisheye(input, centerX, centerY) { 
  let distances = [ 
    dist(centerX,centerY, 0,0),
    dist(centerX,centerY, input.width,0),
    dist(centerX,centerY, input.width,input.height),
    dist(centerX,centerY, 0,input.height)
  ];
  let distanceMax = max(distances);
  
  let output = createImage(input.width, input.height);  
  input.loadPixels();
  output.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
      
      // calculate the angle and distance between our
      // center point and the current x/y position
      // (these are 'polar' coordinates – a position defined
      // not by x/y but by angle and distance!)
      let distance = dist(x,y, centerX,centerY);  // also called 'rho'
      let angle = atan2(y-centerY, x-centerX);    // also called 'theta'
      
      // the magic!
      // first, a fisheye effect
      // transform distance my squaring it, then dividing
      // by the max possible distance from the center
      // the angle value stays the same
      distance = distance * distance / distanceMax;
      
      // ...or try these (comment out the others)
      
      // ripple effect
      // use distance with sin(), keep angle the same
      // distance = distance + 8 * sin(distance/2);
      
      // freaky twist
      // square angle and divide by 360º, keep distance the same
      // angle = angle * angle / TWO_PI;
      
      // convert back to cartesian (x/y) coordinates 
      // using some trig so we can grab a pixel from the
      // the source image
      let tempX = centerX + cos(angle) * distance;
      let tempY = centerY + sin(angle) * distance;
      
      // get the pixel and put it into the output image
      let px = input.get(tempX, tempY);
      output.set(x,y, px);
    }
  }
  output.updatePixels();
  return output;
}

