
import processing.video.*;
import gab.opencv.*;

/*
BLOB DETECTION: WEBCAM
Jeff Thompson | 2017 | jeffreythompson.org

An expanded version of the Blob Detection example
using the webcam as an input. Try using your phone's
flashlight in a darkened room, adjusting the threshold
until it's the only blob. The mouse's X position is
also used to set the minimum blob size – anything smaller
is ignored, which is useful for noisey environments.

Details on how the pre-processing and blob detection
work are skipped here, so see the previous example
if you want to understand what's happening there.
For more on getting webcam input, see the Image 
Processing code examples.

*/

Capture webcam;              // webcam input
OpenCV cv;                   // instance of the OpenCV library
ArrayList<Contour> blobs;    // list of blob contours


void setup() {
  size(1280,720);
  
  // create an instance of the OpenCV library
  // we'll pass each frame of video to it later
  // for processing
  cv = new OpenCV(this, width,height);
  
  // start the webcam
  String[] inputs = Capture.list();
  if (inputs.length == 0) {
    println("Couldn't detect any webcams connected!");
    exit();
  }
  webcam = new Capture(this, inputs[0]);
  webcam.start();
 
  // text settings (for showing the # of blobs)
  textSize(20);
  textAlign(LEFT, BOTTOM);
}


void draw() {
  
  // don't do anything until a new frame of video
  // is available
  if (webcam.available()) {
    
    // read the webcam and load the frame into OpenCV
    webcam.read();
    cv.loadImage(webcam);
    
    // pre-process the image (adjust the threshold
    // using the mouse) and display it onscreen
    int threshold = int( map(mouseY, 0,height, 0,255) );
    cv.threshold(threshold);
    //cv.invert();    // blobs should be white, so you might have to use this
    cv.dilate();
    cv.erode();
    image(cv.getOutput(), 0,0);
    
    // get the blobs and draw them
    blobs = cv.findContours();
    noFill();
    stroke(255,150,0);
    strokeWeight(3);
    for (Contour blob : blobs) {
      
      // optional: reject blobs that are too small
      if (blob.area() < map(mouseX, 10,width,0,3000)) {
        continue;
      }
      
      beginShape();
      for (PVector pt : blob.getPolygonApproximation().getPoints()) {
        vertex(pt.x, pt.y);
      }
      endShape(CLOSE);
    }
    
    // how many blobs did we find?
    fill(0,150,255);
    noStroke();
    text(blobs.size() + " blobs", 20,height-20);
  }
}