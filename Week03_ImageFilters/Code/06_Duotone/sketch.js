/*
DUOTONE
Jeff Thompson | 2017/21 | jeffreythompson.org

A popular image filter technique, seen a lot on social
media and websites, is duotone. While it looks complicated,
the code to do this is actually easy and builds on
examples we've already seen!

The lerpColor() command is key here: it takes two colors
and smoothly interpolates between them using a value
from 0–1. We just grab the grayscale value of each
pixel, divide by 255, and plug it into lerpColor().

CHALLENGES
1. What kinds of colors seem to work best with the
   duotone filter? Hint: complementary colors
   (opposite each other on the color wheel) will
   give the most contrast.
   
*/

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
  
  // specify colors for pure white and pure black
  // pixels – all other values will be replaced with
  // a color between the two
  img = duotone(img, color(0,50,174), color(255,255,0));
}


function draw() {
  image(img, 0,0); 
}


function duotone(input, c1, c2) {
  
  // go through all pixels in the image
  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
      
      // get the red pixel value (an approx
      // of brightness)
      let bright = input.get(x, y)[0];      
      
      // lerpColor() needs values 0–1, so
      // divide by 255
      bright /= 255;
      
      // create a new color for the pixel that's
      // somewhere between the two colors we
      // specified, then set the pixel to that color
      let newColor = lerpColor(c1, c2, bright);
      input.set(x, y, newColor);
    }
  }
  
  // all done, send the processed image back!
  input.updatePixels();
  return input;
}

