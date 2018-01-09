
/*
GRAYSCALE CONVERSION
Jeff Thompson | 2017 | jeffreythompson.org

Converting an image to grayscale is perhaps the simplest
of filters we can implement ourselves. While Processing's
grayscale filter is a one-line, easy option, it's useful
to understand how it works, and, as you'll see below, we
can also improve it a bit.

CHALLENGES:
+ Another way to create a grayscale image is to average the 
  values for red, green, and blue. Can you implement that 
  below? Do you prefer those results or just the red value?

*/


void setup() {
  size(900,700);
  
  // load and display the image
  PImage img = loadImage("../Test.jpg");
  image(img, 0,0);
  
  // SIMPLE GRAYSCALE CONVERSION
  // a simple way to convert an image to grayscale is
  // to just take the red value from each pixel and set
  // that as the new color – it's not perfect, but a 
  // decent approximation
  loadPixels();                              // get the pixel array
  for (int i=0; i<pixels.length; i++) {      // go through each one
    float r = pixels[i] >> 16 & 0xFF;        // extract the red value
    pixels[i] = color(r);                    // set the pixel to this value
  }
  updatePixels();                            // update the screen
  
  // A BETTER CONVERSION
  // the above method works ok, but often loses the dynamic
  // range of the original image, since some colors tend to
  // play a more prominent role in how we perceive brightness
  // the formula below does a better job of capturing the values
  // from the original image, though it's a bit more complex
  /*loadPixels();
  for (int i=0; i<pixels.length; i++) {
    float r = pixels[i] >> 16 & 0xFF;
    float g = pixels[i] >> 8 & 0xFF;
    float b = pixels[i] & 0xFF;
    float bright = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    pixels[i] = color(bright);
  }
  updatePixels();
  */
}