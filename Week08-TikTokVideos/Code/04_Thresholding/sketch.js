/*
THRESHOLDING
Jeff Thompson | 2017/21 | jeffreythompson.org

One of the simplest filters we can write ourselves
is a threshold filters. If a pixel's brightness is
above a set threshold we make the pixel white, if
below we make it black. The threshold can be tuned
based on the source image.

Thresholding is a useful first step for blob
detection, as we'll see later!

(For a fancier version that takes into account
regions of light and dark in an image, see the
Adaptive Threshold example.)

CHALLENGES:
1. Can you make this example interactive, where
   the mouse controls the threshold value? (Hint:
   use map() to convert the mouse coords into
   the range 0–255.)
2. This demo uses get() and set(), which can be
   slow with large images – can you convert this
   to use the pixels array instead?

*/

let threshold = 127;  // range of 0–255
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
  
  // go through the pixels in the image...
  img.loadPixels();
  for (let y=0; y<img.height; y++) {
    for (let x=0; x<img.width; x++) {
      
      // get the red value, an approximation
      // for the brightness
      let r = img.get(x, y)[0];
      
      // if the brightness is below our threshold,
      // set the pixel to black
      if (r < threshold) {
        img.set(x, y, color(0));
      }
      
      // if above, set it to white
      else {
        img.set(x, y, color(255));
      }
    }
  }
  img.updatePixels();
  
  // display the processed image
  image(img, 0,0);
}



















