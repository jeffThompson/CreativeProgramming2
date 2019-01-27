
/*
THRESHOLDING
Jeff Thompson | 2017 | jeffreythompson.org

One of the simplest filters we can write ourselves is the
a threshold filter. If a pixel's brightness is above a
set threshold we make the pixel white, if below we make it
black. The threshold can be tuned based on the source image.

Thresholding is a useful first step for blob detection, as
we'll see later.

For a fancier version that takes into account regions of light
and dark in an image, see the Adaptive Threshold example.

CHALLENGE:
+ Can you make this example interactive, where the mouse controls
  the threshold value? (Hint: use map() to convert the mouse coords
  into the range 0–255.)

*/


// threshold at which a pixel is decided to be black or white
float threshold = 127;      // range of 0–255


void setup() {
  size(900,700);
  
  // load and display the image
  PImage img = loadImage("../Test.jpg");
  image(img, 0,0);
  
  // load and iterate through the pixels
  loadPixels();
  for (int i=0; i<pixels.length; i++) {
    
    // get the brightness of the pixel (approximate
    // with the red value)
    float r = pixels[i] >> 16 & 0xFF;
    
    // if the brightness is below our threshold, set
    // the pixel to black (and if above, set to white)
    if (r < threshold) {
      pixels[i] = color(0);
    }
    else {
      pixels[i] = color(255);
    }    
  }
  updatePixels();
}