
import gab.opencv.*;
import processing.video.*;

/*
FRAME DIFFERENCING
Jeff Thompson | 2017 | jeffreythompson.org

Also called background subtraction, frame differencing
shows only pixels that have changed from the previous
frame. Frame differencing is one of those things that we
*could* do ourselves but OpenCV does much more easily and 
probably better too.

Frame differencing can can be very useful if you want to
track blobs against a background that is relatively stable
but uneven. Or, in this case, to make trippy videos that
show just the motion.

ARGUMENTS
Many of the OpenCV commands have complex arguments, and
you'll be best served leaving them as the default. If you
dig through the documentation, however, you can learn quite
a bit about how the code works. The arguments for background
subtraction are:

+ History: the number of frames to look back on (probably
  the most useful to try changing)
+ Max number of "Gaussian mixtures" (see http://scikit-learn.org/
  stable/modules/mixture.html for more info)
+ Background ratio: not so important, so you can probably leave it

See the OpenCV docs for more info:
https://docs.opencv.org/2.4/modules/video/doc/motion_analysis
_and_object_tracking.html#backgroundsubtractormog2
  
CHALLENGES:
+ Instead of using the binary difference image to mask the
  video coming in, can you run blob detection on it?
+ What kinds of inputs could you apply this to? CCTV feeds?
  Traffic cameras? 
+ OpenCV does frame differencing really well, but can you
  figure out how we'd do it? (Hint: you'd need to store the
  previous frame in a PImage buffer, then compare it to the
  current frame.)

*/

Capture webcam;
OpenCV cv;


void setup() {
  size(1280,720);
  
  // create an instance of the OpenCV library
  // we'll pass each frame of video to it later
  // for processing
  cv = new OpenCV(this, width,height);
  cv.startBackgroundSubtraction(5, 3, 0.8);
  
  // start the webcam
  String[] inputs = Capture.list();
  if (inputs.length == 0) {
    println("Couldn't detect any webcams connected!");
    exit();
  }
  webcam = new Capture(this, inputs[0]);
  webcam.start();
}


void draw() {
  if (webcam.available()) {
    
    // clear the background every frame
    // (try removing this and see what happens!)
    background(150);
    
    // get the camera frame and pass it to OpenCV
    webcam.read();
    cv.loadImage(webcam);
    
    // update the background subtraction
    // the result will be a binary image where black
    // pixels are the background, white ones that have
    // changed
    cv.updateBackground();
    
    // use the binary image as a mask on the video
    // showing only the areas that have changed!
    webcam.mask(cv.getOutput());
    image(webcam, 0,0);
  }
}