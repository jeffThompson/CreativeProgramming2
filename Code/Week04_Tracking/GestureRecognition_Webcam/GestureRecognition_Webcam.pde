
import processing.video.*;
import gab.opencv.*;
import de.voidplus.dollar.*;

/*
GESTURE RECOGNITION: WEBCAM
Jeff Thompson | 2019 | jeffreythompson.org

This example combines blob tracking from the webcam with
the $1 Unistroke Recognizer library to create an explosion
onscreen every time you draw a checkmark!

Use your mouse's y-position to adjust the threshold for
detecting blobs. In finished code, you might want this to be
done with the arrow keys or even loaded from a text file!

THIS LOOKS SO COMPLICATED!
Though the code looks pretty complex, it's really just combining
things we've already done before, step-by-step. For a project like
this, it can be really helpful to do two things:

1. Break down what you want to have happen on paper. Write out a
   "recipe" (an algorithm!) for what your code needs to do. In this
   case, we read the webcam, pre-process the frame, detect blobs,
   get the largest, find its center, and track that with the gesture
   library!
2. Get things working one step at a time and use separate sketches
   to test out parts of your code. If you try to write your entire
   sketch in one go, you'll have a million errors. Instead, get the
   first step of your algorithm working, then add the next. This will
   help alleviate headaches and let you focus.

CHALLENGES:
1. Can you add another gesture to detect and have it trigger a different
   behavior? For a full list of supported gestures and their learn()
   values, see the library's documentation.
2. Can you improve our Explosion and/or Particle class for richer and
   more exciting behavior? For example, random Particle colors within
   a preset palette?

*/

Capture webcam;                     // webcam input
OpenCV cv;                          // instance of the OpenCV library
ArrayList<Contour> blobs;           // list of blob contours
OneDollar gesture;                  // gesture detection object
PVector centroid;                   // center of gestures when found
ArrayList<Explosion> explosions;    // explosions triggered by our gesture


void setup() {
  size(1280,720);

  // basic webcam stuff (see BlobDetection_Webcam for more info)
  cv = new OpenCV(this, width,height);
  String[] inputs = Capture.list();
  if (inputs.length == 0) {
    println("Couldn't detect any webcams connected!");
    exit();
  }
  webcam = new Capture(this, inputs[0]);
  webcam.start();
  
  // gesture detection stuff (see GestureRecognition_Simple for details)
  gesture = new OneDollar(this);
  gesture.learn("check", new int[] { 91,185,93,185,95,185,97,185,100,188,102,189,104,190,106,193,108,195,110,198,112,201,114,204,115,207,117,210,118,212,120,214,121,217,122,219,123,222,124,224,126,226,127,229,129,231,130,233,129,231,129,228,129,226,129,224,129,221,129,218,129,212,129,208,130,198,132,189,134,182,137,173,143,164,147,157,151,151,155,144,161,137,165,131,171,122,174,118,176,114,177,112,177,114,175,116,173,118 } );
  gesture.on("check", "explode");
  
  // optionally, try playing with these settings to tune your results
  //gesture.setMinSimilarity(85);                    // how close to template (0-100, default 80)
  //gesture.setMinDistance(100).enableMinDistance(); // min linear length of gesture (default 50)
  //gesture.setMaxTime(1200).enableMaxTime();        // max time of gesture in ms (default 1000)
  //gesture.setMinSpeed(3).enableMinSpeed();         // ignore slower gestures (default 2)
  
  // an empty ArrayList of explosions, created when our 
  // gesture is detected
  explosions = new ArrayList<Explosion>();
}


void draw() {
  
  if (webcam.available()) {
    
    // read the frame and display it
    // (set() is faster than image() which helps when we're
    // doing this much processing)
    webcam.read();
    set(0,0, webcam);
    
    // pre-process for blob detection
    cv.loadImage(webcam);
    int threshold = int( map(mouseY, 0,height, 0,255) );
    cv.threshold(threshold);
    //cv.invert();            // blobs should be white, so you might have to use this
    cv.dilate();
    cv.erode();
    
    // get the blobs and get the largest one
    blobs = cv.findContours();
    float largestArea = 0;
    int largestIndex = 0;
    for (int i=0; i<blobs.size(); i++) {
      float area = blobs.get(i).area();
      if (area > largestArea) {
        largestArea = area;
        largestIndex = i;
      }
    }
    Contour largest = blobs.get(largestIndex);
    
    // calculate center of the largest blob
    float centerX = 0;
    float centerY = 0;
    ArrayList<PVector> pts = largest.getPolygonApproximation().getPoints();
    for (PVector pt : pts) {
      centerX += pt.x;
      centerY += pt.y;
    }
    centerX /= pts.size();
    centerY /= pts.size();
    
    // draw the largest blob (helpful for debugging but you'd probably
    // want to turn off in the final version)
    fill(0,150,255, 150);
    noStroke();
    beginShape();
    for (PVector pt : largest.getPolygonApproximation().getPoints()) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
    
    // track the blob using the gesture library
    gesture.track(centerX, centerY);
    
    // finally, draw the explosions that we've created!
    // (note we iterate the list backward so we can delete old
    // explosions – if we went forward the size of the arraylist
    // would change partway through and we'd get an error)
    for (int i=explosions.size()-1; i>=0; i-=1) {
      Explosion e = explosions.get(i);
      e.update();
      e.display();
      
      // if they are too old, delete them
      if (e.age >= e.lifespan) {
        explosions.remove(i);
      }
    }
  }
}


// when a checkmark gesture is detected, create a new explosion!
// to make this more natural, we start the explosion not in the center
// but at the end of the gesture (close to our blob's current position)
void explode(String gesture, float percent, int startX, int startY, int centroidX, int centroidY, int endX, int endY) {
  Explosion e = new Explosion(endX, endY);
  explosions.add(e);
}
