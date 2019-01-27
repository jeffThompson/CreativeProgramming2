
import gab.opencv.*;

/*
CENTROID
Jeff Thompson | 2017 | jeffreythompson.org

The "centroid" is the center of gravity of a blob – the middle! While
there are mathematically fancier ways to do this, we'll extract the
outline of the blob and average all the points, which should be accurate
enough for most of our uses.

Want another, more accurate approach? See this great post:
https://blog.mapbox.com/a-new-algorithm-for-finding-a-visual-center-of-
a-polygon-7c77e6492fbc

CHALLENGES:
+ Can you wrap the centroid-finding code into a useful function? Pass
  it the Contour object and return the center as a PVector.

*/

int seed = 0;  // set the random seed manually
OpenCV cv;     // instance of the OpenCV library


void setup() {
  size(600,600);
  
  // setup OpenCV to the sketch's dimensions
  cv = new OpenCV(this, width, height);
}

void draw() {
  background(0);
  
  // create a random polygon to find the center of
  randomSeed(seed);
  randomPolygon(width/2, height/2, 200);
  
  // load the current sketch's pixels into OpenCV
  // then find the blob(s) in the image
  cv.loadImage(get());       // get() returns the current sketch as an image!
  ArrayList<Contour> blobs = cv.findContours();
  
  // iterate through all the blobs
  for (Contour blob : blobs) {
  
    // find their contour, which is an ArrayList of points
    // try the getConvexHull() command instead – notice the difference?
    ArrayList<PVector> pts = blob.getPolygonApproximation().getPoints();
    //ArrayList<PVector> pts = blob.getConvexHull().getPoints();
    
    // values for calculating the centroid
    float centerX = 0;
    float centerY = 0;
    
    // draw the blob and add up all the x/y points
    noFill();
    stroke(255,150,0);
    strokeWeight(3);
    beginShape();
    for (PVector pt : pts) {
      vertex(pt.x, pt.y);
      centerX += pt.x;
      centerY += pt.y;
    }
    endShape(CLOSE);
    
    // average the points and draw the centroid
    centerX /= pts.size();
    centerY /= pts.size();
    fill(0,150,255);
    noStroke();
    ellipse(centerX,centerY, 10,10);
  }
}


// press any key to generate a new blob
void keyPressed() {
  seed += 1;
}


// draws a random polygon onscreen!
void randomPolygon(float x, float y, float dia) {
  fill(255);
  noStroke();
  beginShape();
  float angle = 0;
  while (angle < 360) {
    float px = x + cos(radians(angle)) * random(dia*0.7, dia);
    float py = y + sin(radians(angle)) * random(dia*0.7, dia);
    vertex(px, py);
    angle += random(15, 20);
  }
  endShape(CLOSE);
}