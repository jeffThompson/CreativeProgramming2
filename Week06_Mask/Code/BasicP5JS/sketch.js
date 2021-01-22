/*
BASIC P5JS SKETCH
Jeff Thompson | 2020 | jeffreythompson.org

p5js is a version of Processing for the web. We can
write sketches very similar to the Java version of
Processing but using Javascript (which has no real
connection to Java, despite the name). There are a
few differences though.

CREATING/RUNNING A SKETCH
First, log into the editor (you can use your Github login!)
and create a new sketch. You can rename it at the top, then
save it as you work, all in the browser.

To run it, click the "run" button at the top, just like in
Processing. You can also turn on "auto-refresh" to see changes
happen as you code – sometimes this can be really helpful,
but it can also be annoying.

VARIABLES
In Java, variables are "typed", meaning you have to
specify if "x" is an int, float, String, etc. Javascript
doesn't require this! Instead, we use the command "var"
to create variables.

  int x = 0;    // Java style
  var x = 0;    // JS style (note we still use semicolons!)

You may also see examples that create variables with the
"let" instead of "var". This has to do with the scope of
that variable (global vs "block" level), though for our
purposes they are basically interchangeable.

DRAWING COMMANDS
Nearly all the commands from Processing are carried over.
You can still use rect(), ellipse(), fill(), etc just as
before! There are two that are slightly different, though...

To set the size, we use createCanvas() instead:

  size(400,400);            // Java style
  createCanvas(400,400);    // JS style
  

Functions look a bit different too:

  // Java function
  void multiply(int x, int y) {
    return x * y;
  }
  
  // JS function
  function multiply(x, y) {
    return x * y;
  }

GETTING HELP
You can get help right in the p5js editor! Go to 
Help > Reference... to view the full list of commands.
If you are trying to figure out something specific to
Javascript, check out this extensive tutorial from W3Schools:
https://www.w3schools.com/js/default.asp

*/


// we need a setup() function, just like
// in the Java version
function setup() {
  
  // this is the same as the size() command
  createCanvas(400, 400);
}


// we can include a draw() loop too
function draw() {
  background(220, 30);
  
  // most commands are exactly the same
  // (like setting color for stroke and fill)
  fill(0);
  noStroke();
  
  // others just need to be changed to match
  // the Javascript variable syntax
  for (var i=0; i<100; i++) {
    var x = random(0, width);
    var y = random(0, height);
    ellipse(x,y, 10,10);
  }    
}

