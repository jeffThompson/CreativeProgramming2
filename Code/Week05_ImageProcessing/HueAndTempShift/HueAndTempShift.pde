
/*
HUE SHIFT
Jeff Thompson | 2017 | jeffreythompson.org

*/

float tempAdj, hueAdj;
PImage img;

void setup() {
  size(900,700);
  img = loadImage("../Test.jpg");
}

void draw() {
  image(img, 0,0);
  
  tempAdj = map(mouseX, 0,width, -100,100);
  hueAdj = map(mouseY, 0,height, -100,100);
  
  loadPixels();
  for (int i=0; i<pixels.length; i++) {
    float r = pixels[i] >> 16 & 0xFF;
    float g = pixels[i] >> 8 & 0xFF;
    float b = pixels[i] & 0xFF;
    
    r += tempAdj;
    r = constrain(r, 0,255);
    g += hueAdj;
    g = constrain(g, 0, 255);
    b -= tempAdj;
    b = constrain(b, 0,255);
    
    pixels[i] = color(r, g, b);
  }
  updatePixels();
}