
import processing.video.*;

/*
MIRROR TEMPLATE

Template code for your digital mirror project – this will
ensure it will run nicely on a variety of displays.

Be sure to use the width/height instead of hard-coded 
values in your sketch!

*/

Capture camera;          // webcam input
boolean debug = false;   // show debug info
PFont font;              // for debug display


void setup() {
  
  // prototyping:
  // make our sketch always run fullscreen
  // note! this means our code below all has to be relative to
  // the width and height variables
  size(displayWidth, displayHeight);
  
  // final version:
  // set your sketch to run fullscreen (similar to Present Mode)
  // fullScreen();

  // init camera – specify the width and height of the camera's 
  // input (this will be faster than resizing the image below)
  camera = new Capture(this, width,height);
  
  // start the camera input
  camera.start();
  
  // create debug font
  font = createFont("Arial", 60);
  textFont(font, 60);
}


void draw() {
  
  // only draw if there's a new frame available from the
  // camera (saves unecessary processing)
  if (camera.available()) {
    
    // read the frame from the camera
    camera.read();
    
    // draw the camera's frame
    image(camera, 0,0);
    
    // does the same thing and is sometimes faster than image()
    // set(0,0, camera);
    
    // flip the image to mirror correctly
    // (may slow down your sketch quite a bit)
    //pushMatrix();
    //scale(-1,1);
    //image(camera, -width,0);
    //popMatrix();
    
    // put your mirror code here!
    // (note we put it in the if statement – this avoids re-processing
    // your image before a new frame is available from the webcam)
    
    // display debug info, if turned on
    if (debug) {
      fill(255);
      noStroke();
      text(nf(frameRate,0,1), 40,height-40);
    }
  }
}


// use the 'd' key to toggle debug mode
void keyPressed() {
  if (key == 'd') {
    debug = !debug;
  }
}
