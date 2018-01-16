
/*
ADAPTIVE THRESHOLD
Jeff Thompson | 2017 | jeffreythompson.org

A standard threshold may not work well for all images, especially
if some regions are overall dark or light but contain information.
Instead, an "adaptive" threshold selects which pixels should be
black or white based on a value computed based on neighboring
pixels, giving a much more natural result. Depending on your 
settings, the output can vary from looking like a pen drawing to 
a blown-out old photocopier.
 
CHALLENGES:
+ Another method (described in the first link below), suggests
  finding the min/max values for the neighboring region and
  using (min+max)/2 as the threshold. Can you implement that
  in our function below? How do the results differ?

SEE ALSO:
+ http://homepages.inf.ed.ac.uk/rbf/HIPR2/adpthrsh.htm
+ https://en.wikipedia.org/wiki/Otsu's_method
+ https://dsp.stackexchange.com/a/2504/16690

*/

// region to measure for threshold value
int dia = 8;      // try values between 4–30
                  // small = fast processing, more noisy
                  // large = slower, retain large details

// after computing mean, it may help to reduce the
// threshold by a set amount
int adjustment = 5;    // try values between 0–10


void setup() {
  size(900, 700);
  PImage img = loadImage("../Test.jpg");
  img = adaptiveThreshold(img, dia, adjustment);
  image(img, 0, 0);  
}


PImage adaptiveThreshold(PImage in, int dia, int adjustment) {

  // create an output image (since we need access to each pixel's neighbors)
  PImage out = createImage(in.width, in.height, RGB);
  out.loadPixels();
  in.loadPixels();

  // go through each pixel...
  for (int y=0; y<in.height; y++) {
    for (int x=0; x<in.width; x++) {

      // get the mean of all neighboring pixels
      float mean = 0;
      int r = dia/2;
      for (int dy=-r; dy<r; dy++) {
        for (int dx=-r; dx<r; dx++) {
          
          // if this pixel is off the edges of the image, set
          // to 127 (half of 256, the normal threshold value)
          if (x+dx< 0 || y+dy < 0 || x+dx > width-1 || y+dy > height-1) {
            mean += 127;
          }
          
          // otherwise, add the red value to the mean
          else {
            mean += in.pixels[(y+dy) * in.width + (x+dx)] >> 16 & 0xFF;
          }
        }
      }
      
      // compute mean and subtract the adjustment factor
      mean /= dia*dia;
      mean -= adjustment;

      // do normal thresholding using the new mean value
      if ( (in.pixels[y*in.width+x] >> 16 & 0xFF) < mean) {
        out.pixels[y*in.width+x] = color(0);
      } 
      else {
        out.pixels[y*in.width+x] = color(255);
      }
    }
  }

  // all done, send back output image
  out.updatePixels();
  return out;
}