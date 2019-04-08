
class ImageVector {
  
  String label;    // a name labeling the vector (often this is the filename of the image)
                   // useful for when we have large numbers of vectors to keep track of
  
  int w, h;        // the image will be resized (large images provide too much data that we
                   //  don't really need, and make processing slow – 16x16 or 24x24 is good)
  
  float[] x;       // 1D array storing the normalized data

  // where's the image data?
  // we don't store the input PImage, since it would just produce redundant
  // data – with a few images that wouldn't be a problem, but with a set of
  // hundreds or thousands, we'd run out of RAM really quickly
  // instead, the display() function below creates the image as needed
  
  
  // CONSTRUCTOR  
  // args: path to image, width/height to resize to
  ImageVector(String path, int _w, int _h) {
    w =     _w;
    h =     _h;
    label = path;
    
    // load and preprocess the image
    // convert to grayscale and resize to a small square
    // (color data and proportion are not too important
    // in these kind of cases – larger images and/or color
    // data makes our vectors very large but won't give
    // us better results!)
    PImage img = loadImage(path);
    img.filter(GRAY);
    img.resize(w, h);
    
    // copy pixel data into the vector, normalizing
    // it to a range of 0–1 (instead of 0–255)
    img.loadPixels();
    x = new float[img.pixels.length];
    for (int i=0; i<img.pixels.length; i++) {
      float px = img.pixels[i] >> 16 & 0xFF;    // get red (in grayscale, RGB are the same)
      px /= 255.0;                              // normalize
      x[i] = px;                                // add to the vector
    }
  }
  
  
  // METHODS  
  
  // make the lightest pixel 255 and the darkest 0 
  // so we don't have all our data skewed into a small range
  void minMax() {
    float minVal = min(x);
    float maxVal = max(x);
    for (int i=0; i<x.length; i++) {
      x[i] = map(x[i], minVal,maxVal, 0,1);
    }
  }
  
  
  // print the vector data nicely
  void printVector() {
    print("[ ");
    for (int i=0; i<x.length; i++) {
      print(x[i]);
      if (i < x.length-1) print(", ");
    }
    println(" ]");
  }
  
  
  // display the vector onscreen (essentially a clone
  // of the image() function, but allows us to draw it
  // at various sizes and keeps the pixels sharp)
  void display(int x, int y, int w, int h) {
    PImage img = createPImage();
    PGraphics pg = createGraphics(w,h);
    pg.noSmooth();
    pg.beginDraw();
    pg.image(img, 0,0, w,h);
    pg.endDraw();
    image(pg, x,y);
  }
  
    
  // creates a PImage from the current vector
  PImage createPImage() {
    PImage img = createImage(w, h, RGB);
    img.loadPixels();
    for (int i=0; i<img.pixels.length; i++) {
      img.pixels[i] = color(x[i] * 255);
    }
    img.updatePixels();
    return img;
  }
  
  
  // DISTANCE CALCULATIONS  
  // there are lots of ways we can compare the similarity
  // between two vectors, but for all of them we think of it
  // as the "distance" between them...
  
  
  // calculate the distance between this vector
  // and another, using the pythagorean theorem
  // strangely, this works not just for 2D distances, 
  // but for many-dimensional ones too!
  // (fyi, this is also the shortest possible route
  // between two vectors)
  float euclideanDist(ImageVector other) {
    float dist = 0;
    for (int i=0; i<x.length; i++) {
      dist += pow(x[i] - other.x[i], 2);  // square the dist b/w each and add to overall distance
    }
    return sqrt(dist);                    // get square root for final distance
  }
  
  
  // calculates the longest distance b/w this
  // vector and another – called "manhattan"
  // distance because it's like going from one point
  // to another in a grid of city blocks
  float manhattanDist(ImageVector other) {
    float dist = 0;
    for (int i=0; i<x.length; i++) {
      dist += abs(x[i] - other.x[i]);
    }
    return dist;
  }
  
  
  // chebyshev distance (used quite a bit in machine 
  // learning) is like how a king moves in chess
  // (it's also useful for many-dimensional data, where
  // many of the data points might not be useful or are redundant)
  // note: if our data is normalized 0–1, the result here
  // will also always be 0–1 too!
  float chebyshevDist(ImageVector other) {
    float dist = 0;
    for (int i=0; i<x.length; i++) {
      float d = abs(x[i] - other.x[i]);
      if (d > dist) dist = d;
    }
    return dist;
  }
  
  
  // cosine similarity
  // if inputs are 0–1, this one will also return a dist of 0–1
  float cosineSimilarity(ImageVector other, boolean reverseResults) {
    float dotProduct = 0;
    float normA =      0;
    float normB =      0;
    for (int i=0; i<x.length; i++) {
      dotProduct += x[i] * other.x[i];
      normA += pow(x[i], 2);
      normB += pow(other.x[i], 2);
    }
    float dist = dotProduct / (sqrt(normA) * sqrt(normB));
    
    // with cosine similarity, 1 = an exact match, 0 = very far
    // apart – optionally, reverse that to be like the other
    // distance measures
    if (reverseResults) {
      dist = map(dist, 0,1, 1,0);
    }
    
    return dist;
  }
}

 