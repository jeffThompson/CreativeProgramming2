import processing.pdf.*;

/*
BLOCK PRINT: SAMPLE
Jeff Thompson | 2019 | jeffreythompson.org

Sample code for creating your printing block – this
example generates lots of random polygons, all have 
outlines and some will be filled with ink.

*/

// white gets printed with ink
// black remains the paper color!
// blue lines will be etched (ie not printed)
// in order to keep track more easily, we can
// assign each color a variable
color ink =   color(255);
color paper = color(0);
color etch =  color(0,0,255);

//color ink =   color(0);
//color paper = color(255);
//color etch =  color(255);

// you could also temporarily color these the 
// way they'll appear when printed which may be 
// helpful but don't forget to change them back 
// before cutting!


void setup() {
  size(225,255);    // 3x3" (with a little buffer) at 72 dpi
  
  beginRecord(PDF, "ThompsonJeff.pdf");
  
  background(ink);
  strokeWeight(0.072);    // required if using stroke!
  
  // generate lots of random polygons
  for (int i=0; i<30; i++) {
    
    // for each shape, translate to a random coordinate
    pushMatrix();
    translate(random(width), random(height));
    
    // outline all shapes
    stroke(etch);
    
    // randomly fill them with ink or leave
    // them the paper color
    if (random(1) < 0.5) {
      noFill();
    }
    else {
      fill(paper);
    }
        
    // choose a random number of sides 
    int numSides = int(random(8,24));
    float increment = TWO_PI / numSides;  // angle to next vertex
    float angle = 0;                      // keep track of current angle
    float baseRad = random(3,12);        // overall radius for the shape
    
    // draw the shape!
    beginShape();
    for (int j=0; j<numSides; j++) {      // iterate all sides
      float r = baseRad + random(-2,2);   // random distance off base radius
      float x = cos(angle) * r;           // calc x/y pos using angle and radius
      float y = sin(angle) * r;
      vertex(x,y);                        // draw a vertex there
      angle += increment;                 // and update angle
    }
    
    // done with this shape
    endShape(CLOSE);
    popMatrix();
  }
  
  // done, save it!
  endRecord();
}
