
/*
BLOCK PRINT TEMPLATE
Jeff Thompson | 2019 | jeffreythompson.org

Below is the basic template for generating your printing
block. 

Some details to consider:
+ Black or white only, no grayscale!
+ Black will be cut away, white will print with 
  ink (reverse of what you'll see when printing)
+ Your image will be reversed horizontally when 
  printed, so beware if you use text!
+ Save as a TIFF file

*/

void setup() {
  
  size(900,900);    // 3x3" at 300 dpi
  background(0);

  // fill should be black if you want that area to be
  // the paper or white if you want it to be printed in ink
  fill(255);
  noStroke();

  // or you can use stroke!
  stroke(255);
  strokeWeight(3);

  // add your drawing commands here!

  // save to file (with a unique filename)
  save("LastnameFirstname-v1.tiff");
}
