
import de.voidplus.dollar.*;

/*
GESTURE RECOGNITION: SIMPLE
Jeff Thompson | 2019 | jeffreythompson.org

We can do a lot by simply tracking a blob onscreen and having it
drive various parameters in our code. But we can also extend that
functionality for more user-driven actions by detecting gestures.

In this simple example, use the mouse to draw circles onscreen – you
when the gesture is recognized, it should draw a crosshairs at the
center of the circle you drew... pretty cool!

NOTE! The example below will only detect circles draw counter-clockwise!

Requires the $1 Unistroke Recognizer library (install using
Sketch > Import Library > Add Library...)

Which is based on this really cool project from University of
Washington and Microsoft Research:
http://depts.washington.edu/madlab/proj/dollar/index.html

*/

OneDollar gesture;    // gesture detection object
PVector centroid;     // center of gestures when found


void setup() {
  size(800,800);
  
  // create an instance of the library
  gesture = new OneDollar(this);
  
  // add a gesture for it to watch for
  // the numbers below are copy/pasted from the library's example
  // code – take a look for more gestures to add!
  gesture.learn("circle", new int[] { 127,141,124,140,120,139,118,139,116,139,111,140,109,141,104,144,100,147,96,152,93,157,90,163,87,169,85,175,83,181,82,190,82,195,83,200,84,205,88,213,91,216,96,219,103,222,108,224,111,224,120,224,133,223,142,222,152,218,160,214,167,210,173,204,178,198,179,196,182,188,182,177,178,167,170,150,163,138,152,130,143,129,140,131,129,136,126,139 } );
  
  // specify a function to run when the gesture is detected
  // "circle" is the name of the gesture above
  // "detected" is the name of the function (below) to run
  gesture.on("circle", "detected");
  
  // draw the background now
  // we won't clear the screen in the draw() loop so we
  // can see all the previous gestures
  background(50);
}


void draw() {
  
  // if the library has found a center point
  if (centroid != null) {
    
    // draw it
    stroke(255);
    strokeWeight(2);
    line(centroid.x-10, centroid.y, centroid.x+10, centroid.y);
    line(centroid.x, centroid.y-10, centroid.x, centroid.y+10);
    
    // and set it to null (nothing, not found)
    centroid = null;
  }
}


// track the mouse only when it's being dragged
void mouseDragged() {
  gesture.track(mouseX, mouseY);
  
  // visualize the line we're drawing
  // this is optional but helpful for debugging
  stroke(255);
  strokeWeight(2);
  line(mouseX,mouseY, pmouseX,pmouseY);
}


// function to trigger when a circle is detected!
void detected(String gesture, float percent, int startX, int startY, int centroidX, int centroidY, int endX, int endY) {
  println(gesture + " detected!");
  
  // set the centroid to the position given us by the library
  centroid = new PVector(centroidX, centroidY);
}
