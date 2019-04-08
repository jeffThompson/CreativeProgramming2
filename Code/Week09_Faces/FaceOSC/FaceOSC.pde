
import oscP5.*;


/*
FaceOSC
Jeff Thompson | 2019 | jeffreythompson.org

While OpenCV can get us pretty good and quick face detection, it's also showing
signs of age. It doens't do well with rotated faces, it loses them in low light, and
it doesn't give us details like the position of the mouth and nose. Systems that use
machine learning are replacing more traditional OpenCV methods, letting your phone
auto-focus on a face and social media platforms automatically learn who is in your
photos.

In this example, we'll use FaceOSC, a standalone application developed by Kyle McDonald,
to read faces from the webcam. It sends data about the face's position and features via
a protocol called Open Sound Control (OSC). Originally used to send audio data, OSC
can be used to send a wide range of data between applications and computers.

To run this example, you'll need to install the FaceOSC app (scroll to the bottom):
https://github.com/kylemcdonald/ofxFaceTracker/releases

Adapted from an example by Dan Wilcox (which is adapted from an example by Greg Borenstein):
https://github.com/CreativeInquiry/FaceOSC-Templates/tree/master/processing

TO RUN THIS EXAMPLE
1. Start the FaceOSC app and make sure your camera is working
2. Run this sketch – you should see the features of your face appear!

WHAT FaceOSC RETURNS:
+ pose
  + center position: /pose/position
  + scale: /pose/scale
  + orientation (which direction you're facing): /pose/orientation
+ gestures
  + mouth width: /gesture/mouth/width
  + mouth height: /gesture/mouth/height
  + left eyebrow height: /gesture/eyebrow/left
  + right eyebrow height: /gesture/eyebrow/right
  + left eye openness: /gesture/eye/left
  + right eye openness: /gesture/eye/right
  + jaw openness: /gesture/jaw
  + nostril flare: /gesture/nostrils
+ raw
  + raw points (66 xy-pairs): /raw

*/



// variables for pose and gesture from FaceOSC
int numFacesFound;
float poseScale;
PVector posePosition = new PVector();
PVector poseOrientation = new PVector();
float mouthHeight, mouthWidth;
float eyeLeft, eyeRight;
float eyebrowLeft, eyebrowRight;
float jaw;
float nostrils;
float[] rawFace = new float[132];    // 66 interlaced x/y points

OscP5 osc;    // osc connection from FaceOSC


void setup() {
  size(640, 480);

  // create new OSC connection on port 8338 (the default set in
  // FaceOSC's settings.xml file)
  osc = new OscP5(this, 8338);

  // create some templates for data coming in
  // the second arg is a function to run (see the CallbackFunctions tab for
  // more details) when the address (the third arg) is found
  osc.plug(this, "found", "/found");
  osc.plug(this, "poseScale", "/pose/scale");
  osc.plug(this, "posePosition", "/pose/position");
  osc.plug(this, "poseOrientation", "/pose/orientation");
  osc.plug(this, "mouthWidthReceived", "/gesture/mouth/width");
  osc.plug(this, "mouthHeightReceived", "/gesture/mouth/height");
  osc.plug(this, "eyeLeftReceived", "/gesture/eye/left");
  osc.plug(this, "eyeRightReceived", "/gesture/eye/right");
  osc.plug(this, "eyebrowLeftReceived", "/gesture/eyebrow/left");
  osc.plug(this, "eyebrowRightReceived", "/gesture/eyebrow/right");
  osc.plug(this, "jawReceived", "/gesture/jaw");
  osc.plug(this, "nostrilsReceived", "/gesture/nostrils");
  osc.plug(this, "rawReceived", "/raw");
}


void draw() {  
  background(255);

  // if we've found a face...
  if (numFacesFound > 0) {

    // go to it's position (all values for features are
    // relative to the face's position)
    pushMatrix();
    translate(posePosition.x, posePosition.y);
    scale(poseScale);

    // draw the eyes, mouth, and nose as ellipses
    noFill();
    stroke(0);
    ellipse(-20, eyeLeft * -9, 20, 7);
    ellipse(20, eyeRight * -9, 20, 7);
    ellipse(0, 20, mouthWidth * 3, mouthHeight * 3);
    ellipse(-5, nostrils * -1, 7, 3);
    ellipse(5, nostrils * -1, 7, 3);

    // draw the eyebrows as rectangles
    rectMode(CENTER);
    fill(0);
    noStroke();
    rect(-20, eyebrowLeft * -5, 25, 5);
    rect(20, eyebrowRight * -5, 25, 5);
    popMatrix();
    
    // draw the outline of the face
    // see this example for the indices of other features
    // https://github.com/CreativeInquiry/FaceOSC-Templates/blob/master/processing/FaceOSCRawReceiver/FaceOSCRawReceiver.pde
    //fill(0,150,255, 150);
    //noStroke();
    //beginShape();
    //for (int i=0; i<34; i+=2) {
    //  vertex(rawFace[i], rawFace[i+1]);
    //}
    //for (int i=52; i>32; i-=2) {
    //  vertex(rawFace[i], rawFace[i+1]);
    //}
    //endShape(CLOSE);
  }
}
