
// import the Processing port of the OpenCV library
import gab.opencv.*;

/*
BLOB DETECTION
Jeff Thompson | 2017 | jeffreythompson.org

While we can implement simple things like color detection
ourselves, once we start trying to do things like complex
image processing or track shapes, we're better off using a
purpose-built code library. OpenCV is an extremely robust
tool that has been around since <WHEN?>, and works very well
for these kinds of things.

"Blobs", or contiguous regions in an image, allow us to
track shapes across the screen. Later, we'll also find the
center point of them, letting us use the tracking as interactive
controls like a mouse!

CHALLENGES:
+ Finding a blob in a static image if ok, but the real fun
  comes from tracking an object in real time. Can you use
  a webcam as an input, pre-process each frame, and run the
  detection code? Try using your phone's flashlight as a
  bright object to track. It may be helpful set the threshold
  value interactively using the mouse.
+ Our blob code can be used to track colors. Can you convert
  the input to a binary image, where the color to track is white
  and everything else black, then run the blob detection code?
  (Hint: you'll need to return a new PImage, instead of pixel
  locations.)
+ The Contour class also gives you the bounding box for each
  blob, accessed with the getBoundingBox() method. Can you use
  that to find an approximate center for the blob? (Hint: it
  returns a Java Rectangle object, so you'll have to look at
  the documentation for that.)

*/

float minBlobArea = 200;     // reject blobs smaller than this

PImage img;                  // image to load
ArrayList<Contour> blobs;    // list of blob contours
OpenCV cv;                   // instance of the OpenCV library


void setup() {
  size(800,800);
  
  // load the image and pass it to the OpenCV library
  img = loadImage("../Blobs.jpg");
  cv = new OpenCV(this, img);
  
  // pre-process the image
  // we want a binary image with a black background and white
  // blobs to detect – this may require inverting the image
  // if the thing we want to detect is dark-colored
  // (blurring, at the end, may also be helfpul in some cases)
  cv.invert();
  cv.threshold(70);     // threshold leaves just the lightest area 
  cv.dilate();          // fill holes and smooth edges
  cv.erode();           // separate connected components
  
  // of course, we could do the pre-processing ourselves
  // and then pass the filtered image to OpenCV, but the 
  // library's code is very good (it's developed by many
  // computer vision researchers), offers more options, 
  // and is likely faster too :)
  
  // display the pre-processed image
  img = cv.getOutput();
  image(img, 0,0);
  
  // extract the blob contours
  blobs = cv.findContours();
  println("Found " + blobs.size() + " blob(s)");
  
  // draw the blobs onscreen
  noFill();
  stroke(255,150,0);
  strokeWeight(3);
  for (Contour blob : blobs) {
    
    // optional: skip blobs that are smaller than a
    // certain size (helps remove erroneous little ones)
    if (blob.area() < minBlobArea) {
      continue;
    }
    
    beginShape();
    for (PVector pt : blob.getPolygonApproximation().getPoints()) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
  }
}