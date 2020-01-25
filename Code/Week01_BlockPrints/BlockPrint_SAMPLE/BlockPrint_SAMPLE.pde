import processing.pdf.*;

/*
BLOCK PRINT: SAMPLE
Jeff Thompson | 2019 | jeffreythompson.org

Sample code for creating your printing block – this
example generates lots of random polygons.

*/

int numPolygons =         1000;   // how many random polygons to draw
boolean mirror =          false;  // if true, mirror the image (to show as it would print)
boolean showPrintColors = true;   // if true, show colors as they will print


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
  
  // add some text (so we can see how the image must
  // be mirrored before etching)
  PFont font = loadFont("CooperHewitt-Heavy-400.vlw");
  textFont(font);
  textAlign(CENTER, CENTER);
  pushMatrix();
  translate(width/2, height/2);
  scale(-1, 1);
  fill(255);
  text("TEST", 0,0);
  popMatrix();
  
  // if these options are on, mirror the image and flip the colors 
  // so it appears as printed – helpful to see how your print 
  // will actually look!
  if (mirror) {
    pushMatrix();
    translate(width/2, height/2);
    scale(-1, 1);
    popMatrix();
  }
  if (showPrintColors) {
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
