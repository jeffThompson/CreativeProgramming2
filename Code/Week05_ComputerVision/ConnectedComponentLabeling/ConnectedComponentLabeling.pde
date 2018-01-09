
/*
CONNECTED COMPONENT LABELING
Jeff Thompson | 2017 | jeffreythompson.org

https://en.wikipedia.org/wiki/Connected-component_labeling

*/

void setup() {
  size(800,800);
  background(255);
  
  //PImage img = loadImage("Blobs.jpg");
  //image(img, 0,0);
  fill(0);
  noStroke();
  ellipse(width/2, height/2, 300,300);
  
  int label = 1;
  int[][] labels = new int[height][width];
  
  loadPixels();
  for (int y=0; y<height; y++) {
    for (int x=0; x<width; x++) {
      
      //if (pixels[y*width+x] == color(255) || labels[y][x] != 0) {
        
      //}
      
      // if pixel isn't a background px
      if (pixels[y*width+x] != color(255)) {
        
        // if not yet labeled, label it
        // the current value
        if (labels[y][x] == 0) {
          labels[y][x] = label;
        }
      
      }
    }
  }
  
  
}