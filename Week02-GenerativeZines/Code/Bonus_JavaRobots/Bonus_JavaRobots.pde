import java.awt.Robot;           // for the basic Robot class
import java.awt.event.KeyEvent;  // to simulate key presses
import java.awt.AWTException;    // for catching errors

/*
SIMULATE MOUSE AND KEYBOAD WITH "ROBOTS"
Jeff Thompson | 2013/23 | jeffreythompson.org

Using Java's Robot class, we can simulate keystrokes, 
mouse movements and clicks, etc!  Great for automation, 
or controlling other programs via Processing.

BE CAREFUL! This code can easily get out of hand, so
make sure you don't have any unsaved work open, just in
case you need to shut down your computer :)

*/

float moveAmt = 10;  // how much to wiggle the mouse

Robot r;             // instance of the Robot class
float x, y;          // for the mouse position


void setup() {
  size(400,400);
  
  // start the mouse in the center of
  // the screen (not the sketch)
  x = displayWidth/2;
  y = displayHeight/2;
  
  // create the Robot
  // (may throw an error, so run in a 'try' statement)
  try {
    r = new Robot();
  }
  catch (AWTException e) {
    e.printStackTrace();
  }
}


void draw() {
  background(50);
  
  // random mouse movement!
  x += random(-moveAmt, moveAmt);
  if (x < 0) x = 0;
  else if (x > displayWidth) x = displayWidth;
  
  y += random(-moveAmt, moveAmt);
  if (y < 0) y = 0;
  else if (y > displayHeight) y = displayHeight;
  
  r.mouseMove(int(x), int(y));
  
  // randomly press the letter 'a' too
  // (try opening a text editor while this is running!)
  if (random(0, 100) < 10) {
    r.keyPress(KeyEvent.VK_A);    // make a lowercase 'a'
    r.keyRelease(KeyEvent.VK_A);  // always release!
  } 
  
  // bonus!
  // change the location of the sketch window too
  surface.setLocation(
    int(random(0, displayWidth-width)), 
    int(random(0, displayHeight-height))
  );
}
