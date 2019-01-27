
/*
RUNNING SKETCHES FULLSCREEN
Jeff Thompson | 2018 | jeffreythompson.org

For most of our projects, we haven't really thought about getting them
to look perfect when running, we've just worried about their output.
But for installations and interactive pieces, all we often see is the
content of the sketch! Below are ways to get your sketch to run fullscreen,
and other useful tips for making your piece look its best.

RUN FULLSCREEN
To run your sketch without the menu bar, etc, click Sketch > Present
instead of the usual Run. Escape will quit. You can also program this
into the settings() function, shown below.

CHANGE THE DEFAULT DISPLAY
In the Preferences menu, you can change which display (if there are
more than one) you want to run the sketch on. This will help if you
want to be sure your sketch runs on a projector instead of an attached
monitor, for example.

*/

boolean debug = false;    // use 'd' key to enable debug mode


void setup() {
  
  // let's get some info about the current display
  println("DISPLAY INFO:");
  
  // get the display's dimensions
  // Processing normally won't let us use variables in the size()
  // command, but we can pass it the dimensions of the display
  println("- " + displayWidth + " x " + displayHeight + " px");
  size(displayWidth, displayHeight);
  
  // get the display's pixel density
  // this will optimize the sketch's graphics for retina and other
  // high-density displays
  if (displayDensity() == 1) {
    println("- normal-density display (1x)");
  }
  else {
    println("- retina display (2x)");
  }
  pixelDensity(displayDensity());
  
  // get rid of the cursor (depending on if you need it or not)
  noCursor();
}


// we can run the fullScreen() command inside settings(), a function
// that is run before setup() and draw() start
// this is the same as using Sketch > Present... but lets us specify
// exactly how it will be displayed
void settings() {
  fullScreen(P2D, 1);    // use the P2D renderer on screen #1
  
  // you can specify different monitors by number, or use SPAN
  // to have the sketch show up across many monitors or projectors!
}


void draw() {
  
  // do something
  background( lerpColor(color(255,150,0), color(0,150,255), frameCount%1000/1000.0) );
  
  // show debug info using a secret keyboard shortcut
  // useful for installations and troubleshooting
  if (debug) {
    fill(255);
    noStroke();
    text(nf(frameRate, 0,2) + " fps", 50,50);
  }
}


// 'd' key toggles display of debug info
void keyPressed() {
  if (key == 'd') debug = !debug;
}