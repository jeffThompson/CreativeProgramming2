
import processing.video.*;      // required to get webcam access

/*
CAMERA
Jeff Thompson | 2017 | jeffreythompson.org

Working with static images is fun, but live video is even more
fun! This example shows how to start a connection with your
built-in webcam, or an external one, display each frame of
video, and use the frame's pixel values to draw shapes.

What happens below is pretty simple, but needs to be wrapped
into if statements that make it look complex. When opening
the camera, we first want to read the list of cameras available
and have a fallback in case none is detected. Similarly, we
only want to update the sketch when a new frame of video is
available from the camera, otherwise we might get flickering
or other undesirable effects.
 
*/


int spacing = 40;    // grid spacing 

Capture camera;      // instance of the Capture class, used 
                     // to get frames from the camera


void setup() {
  size(1280, 720);

  // get a list of all available cameras
  // (if there are none, it means no camera was detected)
  String[] cameras = Capture.list();
  if (cameras.length == 0) {
    println("Couldn't detect any cameras!");
    exit();
  } 
  else {
    println("Available cameras:");
    printArray(cameras);
  }

  // select which camera to use from the cameras array
  // and start the camera capture
  // (note above that we've also set the sketch size to
  // be the same as the camera we're using)
  camera = new Capture(this, cameras[0]);
  camera.start();
}


void draw() {
  
  // only draw if there's a new frame available from the
  // camera (saves unecessary processing)
  if (camera.available()) {
    background(0);
    
    // read the frame from the camera
    camera.read();
    
    // if we wanted to just display the video, we can draw
    // the frame to screen using the image() command!
    // image(camera, 0,0);
    
    // go through the frame's pixel values in a grid
    camera.loadPixels();    
    for (int y=0; y<height; y+=spacing) {
      for (int x=0; x<width; x+=spacing) {
        
        // get the index in the pixel array for this x/y point
        // (note that normally we'd use y*width+x, but that gives
        // us an image that is flipped horizontally and wouldn't
        // feel natural – the equation below makes the input look 
        // like a normal mirror)
        int index = (width-x-1) + y*width;
        
        // set the fill color to the current pixel and draw a 
        // circle there
        fill(camera.pixels[index]);
        noStroke();
        ellipse(x+spacing/2,y+spacing/2, spacing*2,spacing*2);
      }
    }
  }
}