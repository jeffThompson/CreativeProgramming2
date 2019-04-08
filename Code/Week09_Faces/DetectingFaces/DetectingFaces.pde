
import gab.opencv.*;
import processing.video.*;
import java.awt.Rectangle;    // a Java class, used for the detected faces

/*
DETECTING FACES (and other things)
Jeff Thompson | 2018 | jeffreythompson.org

Blob and color tracking are great, but it doesn't let us differentiate 
between a blob that is someone's face and a blob that's a cat or a banana.
Object detection, such as finding faces in an image, has been an ongoing
area of computer vision research, but one for which we've found some really
good, fast solutions.

In this example, we'll use the Viola-Jones method, which is older (2001) 
but works very well. It uses a "cascade" file, and XML file that is the 
result of training run on hundreds or thousands of images of the thing to
detect, and about the same number of "negative" images, or photos of *not* 
that thing. The cascade file describes features in the image, which are 
really differences that are common across all of them (ex: that the eyes 
are usually brighter than the cheeks).

You can read more about the Viola-Jones method here:
https://en.wikipedia.org/wiki/Viola%E2%80%93Jones_object_detection_framework

See details about how it works:
https://www.youtube.com/watch?v=wpAwdsubl1w
https://www.youtube.com/watch?v=v-gkPTvdgYo

And more info on the classification code and its parameters:
https://docs.opencv.org/2.4/modules/objdetect/doc/cascade_classification.html

CHALLENGES
+ Since we can detect pairs of eyes, can you make a sketch that automatically
  applies super-cool sunglasses? (Hint: draw with basic shapes, or resize an 
  image of sunglasses using the size of the rectangle.) 

*/

int camWidth =  640;    // input camera and detection dimensions
int camHeight = 360;    // too slow if we run it on the full-res camera input

String cascadePath = "/Users/JeffThompson/Documents/Processing/libraries/opencv_processing/library/cascade-files/";

OpenCV cv;
Capture webcam;
Rectangle[] faces, eyes;
float aspectX, aspectY;


void setup() {
  size(1280,720);
  
  // calculate the aspect ratio between the input image
  // size and the sketch's size (for drawing rectangles around
  // the detected faces later)
  aspectX = width / camWidth;
  aspectY = height / camHeight;

  // start the webcam with our specified resolution
  String[] inputs = Capture.list();
  printArray(inputs);
  if (inputs.length == 0) {
    println("Couldn't detect any webcams connected!");
    exit();
  }
  webcam = new Capture(this, camWidth,camHeight);
  webcam.start();

  // create an instance of the OpenCV library, also
  // at this reduced resolution
  cv = new OpenCV(this, camWidth,camHeight);
}


void draw() {
  if (webcam.available()) {
    
    // load the image and display it fullscreen, then pass
    // it to OpenCV
    webcam.read();
    image(webcam, 0,0, width,height);
    cv.loadImage(webcam);
    
    // load the cascade file, in this case to detect pairs of eyes
    // the argument "true" means we want to load it from a full path
    cv.loadCascade(cascadePath + "haarcascade_mcs_eyepair_small.xml", true);
    
    // run the detection algorithm and return an array of Rectangle
    // objects with the results
    eyes = cv.detect();
    
    // draw the eye pairs, scaling to the dimensions of the sketch window
    noFill();
    stroke(255,150,0);
    strokeWeight(2);
    for (Rectangle eye : eyes) {
      rect(eye.x * aspectX, eye.y * aspectY, eye.width * aspectX, eye.height * aspectY);
    }
    
    // load a different cascade file, this one for front-facing human faces
    cv.loadCascade(cascadePath + "haarcascade_frontalface_alt2.xml", true);
    
    // run detection with custom parameters
    // the values below are the defaults, but try tweaking them!
    float scaleFactor = 1.1;    // reduce by this percent for each test level (1.1 = 10%)
    int minNeighbors =  3;      // look for overlap at various scales, higher = less error
    int minSize =       30;     // reject matches smaller than this
    int maxSize =       width;  // ditto larger
    faces = cv.detect(scaleFactor, minNeighbors, 0, minSize, maxSize);
    
    // display the faces we've found
    stroke(0,150,255);
    for (Rectangle face : faces) {
      rect(face.x * aspectX, face.y * aspectY, face.width * aspectX, face.height * aspectY);
    }
  }
}     
