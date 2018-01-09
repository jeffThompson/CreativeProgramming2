
/*
DUOTONE FILTER
Jeff Thompson | 2017 | jeffreythompson.org

Instagram is full of fun ways to tweak your images, but
a very popular one is a filter called "Duotone". While it
looks complicated, the code to do this is actually easy
and builds on examples we've already seen.

*/      


void setup() {
  size(900,700);
  
  // load our image
  PImage img = loadImage("../Test.jpg");
  
  // colors for pure white and pure black pixels
  // all other values will be replaced with a color between
  // these two – note that complementary colors (those opposite
  // each other on the color wheel) will give the most contrast,
  // but try playing with a variety of colors!
  img = duotone(img, color(0,50,175), color(255,255,0));
  
  // display the result
  image(img, 0,0);
}


PImage duotone(PImage in, color c1, color c2) {
  
  // iterate through all pixels in the image
  in.loadPixels();
  for (int i=0; i<in.pixels.length; i++) {
    
    // get the brightness of the current pixel (the red value)
    float bright = in.pixels[i] >> 16 & 0xFF;
    
    // lerpColor wants values 0-1, so divide by 255
    bright /= 255.0;
    
    // create a new color for the pixel that's somewhere between
    // the two colors we specified
    color newColor = lerpColor(c1, c2, bright);
    
    // set the current pixel
    in.pixels[i] = newColor;
  }
  in.updatePixels();
  
  // send back the filtered image
  return in;
}