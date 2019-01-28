import processing.pdf.*;

void setup() {
  size(216,216);    // 3x3" at 72 dpi
  
  beginRecord(PDF, "LastnameFirstname.pdf");
  
  // drawing stuff here
  background(255);
  
  // fill should be black if you want that area to be
  // the paper or white if you want it to be printed in ink
  fill(0);
  
  // stroke can be off (noStroke()) or blue (color(0,0,255))
  // to do a vector etching
  stroke(0,0,255);

  // if using stroke (see below) the thickness **MUST** be
  // set to 0.072 otherwise you'll have weird issues
  // with the lasercutter :(
  strokeWeight(0.072);
  
  endRecord();
}
