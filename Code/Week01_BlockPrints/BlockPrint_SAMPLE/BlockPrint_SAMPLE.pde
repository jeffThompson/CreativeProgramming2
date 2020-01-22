import processing.pdf.*;

/*
BLOCK PRINT: SAMPLE
Jeff Thompson | 2019 | jeffreythompson.org

Sample code for creating your printing block – this
example generates lots of random polygons.

Also includes a "debug" variable, which mirrors the 
image and inverts the colors (so it appears as it will 
print). 

**Be sure to turn this off before your final export!**

*/

int numPolygons = 1000;     // how many random polygons to draw
boolean debug =   true;    // if true, mirror the image and flip colors


void setup() {
  size(900,900);    // 3x3" at 300 dpi
  
  // remember: in your sketch black = paper, white = ink
  background(255);
  
  // draw all the polygons!
  for (int i=0; i<numPolygons; i++) {
    float baseRad = random(20,30);                     // overall radius for the shape
    float mutAmt =  random(2,8);                       // random amount to "mutate" the points
    float margin = baseRad+mutAmt;                     // keep shapes from hitting the edge
    float x =       random(margin, width-margin);      // random position
    float y =       random(margin, height-margin);
    int numSides =  int(random(8,24));                 // number of sides
    
    fill(0);
    stroke(255);
    strokeWeight(4);
    randomPolygon(x, y, baseRad, numSides, mutAmt);
  }  
  
  // if debug is on, mirror the image and flip the colors so it appears
  // as printed – helpful to see how your print will actually look!
  if (debug) {
    pushMatrix();
    translate(width/2, height/2);
    scale(-1, 1);
    popMatrix();
    filter(INVERT);
  }

  // save to file (with a unique filename)
  save("ThompsonJeff-v1.tiff");
}


void randomPolygon(float x, float y, float baseRad, float numSides, float mutAmt) {
  pushMatrix();
  translate(x, y);
      
  // calculate angle between vertices
  float increment = TWO_PI / numSides;
  float angle = 0;
  
  // draw the shape!
  beginShape();
  for (int j=0; j<numSides; j++) {                 // iterate all sides
    float r =  baseRad + random(-mutAmt, mutAmt);  // random distance off base radius
    float px = cos(angle) * r;                     // calc x/y pos using angle and radius
    float py = sin(angle) * r;
    vertex(px, py);                                // draw a vertex there
    angle += increment;                            // and update angle
  }
  
  // done with this shape
  endShape(CLOSE);
  popMatrix();
}
