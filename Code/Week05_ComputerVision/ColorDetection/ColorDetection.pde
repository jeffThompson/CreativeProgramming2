
/*
COLOR DETECTION
Jeff Thompson | 2017 | jeffreythompson.org

So far, we've done a lot of processing to images, but
we haven't been extracting much information from them
(ie the "vision" part of "computer vision"). Detecting
things like faces is very complex and is the result of
decades of research. 

We'll start much more simply: detecing if a single color
is present in an image. This is useful if you want to track
a blue object in a space you know contains nothing else
blue, or know if someone is wearing the color green.

The main challenge to this approach is that light and
cameras in the real world are extremely variable. If we
wanted to use color detection in a more robust way, we'd
need to ensure our camera was calibrated for the task and
that we could control, or measure, the light temperature.

CHALLENGES:
+ We can also find the very approximate center of this color
  blob by averaging the location of all pixels with that 
  color – can you add that to our function below, returning
  the center instead of the first match? (Hint: create an
  ArrayList of PVectors to store all matches, then average them.)

*/

color colorToMatch = color(0);    // color to look for
float tolerance =    10;          // how much wiggle-room is allowed?


void setup() {
  size(800,800);

  // load the image and display it
  PImage img = loadImage("../Blobs.jpg");
  image(img, 0,0);
  
  // find the first instance of a certain color
  // this can be useful if your target is small, or
  // if you just want to know if it is there or not
  PVector first = findColor(img, colorToMatch, tolerance);
  
  // if the color was found, display the location
  if (first != null) {
    println("First matching color: " + first.x + ", " + first.y);
    fill(255,0,0);
    noStroke();
    ellipse(first.x, first.y, 30,30);
  }
}


// find the first instance of a color and return the location
PVector findColor(PImage in, color c, float tolerance) {
  
  // extract the rgb values for the color we want
  // to match
  float matchR = c >> 16 & 0xFF;
  float matchG = c >> 8 & 0xFF;
  float matchB = c & 0xFF;
  
  // in this case, we look across each row working
  // our way down the image – depending on your project,
  // you might want to scan across instead
  in.loadPixels();
  for (int y=0; y<in.height; y++) {
    for (int x=0; x<in.width; x++) {
      
      // get rgb values for the current pixel
      color current = in.pixels[y*in.width+x];
      float r = current >> 16 & 0xFF;
      float g = current >> 8 & 0xFF;
      float b = current & 0xFF;
      
      // if our color detection has no wiggle-room (it
      // either the color perfectly or isn't seen at all)
      // then it won't work very well in real-world conditions
      // to overcome this, we check if the RGB values are within
      // a certain range – if they are, we consider it a match
      if (r >= matchR-tolerance && r <=matchR+tolerance &&
          g >= matchG-tolerance && g <=matchG+tolerance &&
          b >= matchB-tolerance && b <=matchB+tolerance) {
          
            // if any match was detected, return the location
            // immediately (to avoid iterating the rest of 
            // the pixels unecessarily)
            return new PVector(x, y);
      }
    }
  }
  
  // if the color wasn't found, return "null" which
  // is like a blank value but not 0 (in some cases, like
  // this, we could return a location of -1,-1 which
  // would be offscreen, but this is better
  return null;
}