
import gab.opencv.*;

PImage img;
OpenCV cv;


void setup() {
  size(900,700);
  
  img = loadImage("../Test.jpg");
  img.filter(BLUR, 3);
  
  cv = new OpenCV(this, img);
  
  cv.findCannyEdges(20,75);
  //cv.findScharrEdges(cv.HORIZONTAL);
  //cv.findSobelEdges(1,0);
  
  img = cv.getSnapshot();
  image(img, 0,0);
}