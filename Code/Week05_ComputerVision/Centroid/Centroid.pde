
/*
CENTROID
Jeff Thompson | 2017 | jeffreythompson.org


https://blog.mapbox.com/a-new-algorithm-for-finding-a-visual-center-of-a-polygon-7c77e6492fbc

*/

void setup() {
  size(600,600);
  background(255);
  
  // create a random polygon to find the center of
  randomPolygon();
  
  
}


void randomPolygon() {
  fill(0);
  noStroke();
  beginShape();
  float angle = 0;
  while (angle < 360) {
    float x = width/2 + cos(radians(angle)) * random(150, 200);
    float y = height/2 + sin(radians(angle)) * random(150, 200);
    vertex(x, y);
    angle += random(20, 40);
  }
  endShape(CLOSE);
}