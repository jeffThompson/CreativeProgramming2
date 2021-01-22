
import gab.opencv.*;    // import the OpenCV library

/*
EDGE DETECTION
Jeff Thompson | 2018 | jeffreythompson.org

There are some things we can do easily ourselves, more complex
algorithms are time-consuming to implement, and the math can be
really tricky. That's when leaning on a code library to do the
heavy lifting can be helpful. We'll be using the OpenCV library
lots more this semester, but here we use it to improve the edge
detection we did in the Kernel Filters example with much better
results.

Edge detection can be useful for a variety of tasks, and is one of
the oldest computer vision tactics, dating to John Canny in 1986.
It is often used for "segmenting" an image (splitting it into 
meaningful parts), and the math behind it is similar to what is 
used in machine learning.

CHALLENGES:
+ Look at the Wikipedia pages for Canny, Scharr, and Sobel
  edge detection – see if you can implement them yourself!

*/

OpenCV cv;     // an instance of the OpenCV library


void setup() {
  size(900,700);
  
  // load an image to run edge detection on
  PImage img = loadImage("../Test.jpg");
  
  // optional: try pre-processing the image with a blur
  // uncomment and see how it changes the result
  //img.filter(BLUR, 3);
  
  // create an instance of the OpenCV library, using 
  // the PImage as an input
  cv = new OpenCV(this, img);
  
  // run edge detection
  // there are several different algorithms in the library,
  // so try them all, and play with their parameters
  cv.findCannyEdges(20, 75);
  //cv.findScharrEdges(cv.HORIZONTAL);
  //cv.findSobelEdges(1, 0);
  
  // extract a PImage from OpenCV and display it
  img = cv.getSnapshot();
  image(img, 0,0);
}