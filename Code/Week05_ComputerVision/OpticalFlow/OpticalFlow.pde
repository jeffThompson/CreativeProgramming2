
import gab.opencv.*;
import processing.video.*;

/*
OPTICAL FLOW
Jeff Thompson | 2018 | jeffreythompson.org
 
Optical flow measures the apparent motion across an image. It dates
back to research by psychologist James Gibson in the 1940s, and is used
today in fields like robotics (to know how a target object is moving
in the scene) and crowd analysis (figuring out individual and average
movement).
 
To calculate optical flow, the pixel you want to track is compared to
its neighbors in the next frame. Whichever is most similar is the direction
of movement. Depending on the algorithm, this might be a 3x3 or 8x8 pixel
range. The OpenCV library uses the Farneback algorithm – read about it in 
all it's gritty details here: https://docs.opencv.org/2.4/modules/video/
doc/motion_analysis_and_object_tracking.html
 
(Thanks to Bell Labs researcher Larry O'Gorman for explaining this to me!)
 
CHALLENGES:
+ Since we can read the flow in a particular region, can you create
an onscreen trigger that is "hit" by motion in the video?
 
 */

int camWidth =  640;   // we'll use a smaller camera resolution, since
int camHeight = 360;   // HD video might bog down our computer

int gridSize =  5;     // the image is divided into regions, and we
                       // get the average movement in each
OpenCV cv;
Capture webcam;


void setup() {
  size(1280, 720);

  // start the webcam
  String[] inputs = Capture.list();
  printArray(inputs);
  if (inputs.length == 0) {
    println("Couldn't detect any webcams connected!");
    exit();
  }
  webcam = new Capture(this, camWidth,camHeight);
  webcam.start();

  // create an instance of the OpenCV library
  cv = new OpenCV(this, camWidth,camHeight);
}


void draw() {
  if (webcam.available()) {
    webcam.read();

    // draw the image, with a dark overlay (moar sparkle)
    image(webcam, 0,0, width,height);
    fill(0, 100);
    rect(0,0, width,height);

    // load the frame into OpenCV and calculate the
    // optical flow
    cv.loadImage(webcam);
    cv.calculateOpticalFlow();

    // draw flow in the image as circles (larger = more flow)
    fill(255, 150);
    noStroke();
    for (int y=0; y<webcam.height; y+=gridSize) {
      for (int x=0; x<webcam.width; x+=gridSize) {

        // get the average flow in this grid square
        PVector flow = cv.flow.getAverageFlowInRegion(x,y, gridSize,gridSize);
        flow.mult(0.5);     // value too large for drawing, reduce by 1/2

        // use the length (magnitude) of the flow line to set the circle diameter
        // if it's not large enough, skip it
        float dia = flow.mag();
        if (dia > 3) {
          
          // convert from camera dimensions to the larger screen dimensions
          // add some randomness too, to break the grid
          float nx = int(map(x, 0,webcam.width, 0,width) + random(gridSize));
          float ny = int(map(y, 0,webcam.height, 0,height) + random(gridSize));
          ellipse(nx,ny, dia,dia);
        }
      }
    }
  }
}