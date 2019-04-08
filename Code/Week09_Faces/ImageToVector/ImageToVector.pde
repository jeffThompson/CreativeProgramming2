
/*
IMAGE TO VECTOR
Jeff Thompson | 2017 | jeffreythompson.org

A "vector" is a numerical representation of some kind
of data – essentially a list of values. Imagine the vector
for a person: it might include their name, birthday, occupation,
address, and other information that identifies them. Though it
doesn't tell us everything about you, you can think of these
characteristics as a portrait of you!

(This kind of reduction to data is part of the issue around
machine learning and bias – a much bigger topic than we can
talk about here.)

In machine learning, we can take these vectors and do all kinds
of operations on them to transform the data, compare things, even
sort by similarity! In this example, we'll input images and
convert them to vectors, then check to see how much alike they are.

This is the ideal use for a class – we need to represent
complex data in a variety of easy-to-access ways, and build
good ways to work with that data. Our class will include:

  + the path to the image (we'll use this as a "label" to
    keep track of what the vector refers to)
  + a way to load in an image, preprocess it, and convert
    it into a vector
  + the vector representation: a 1D float array, containing
    the image's pixel values
  + the height and width of the image data, so we can
    keep track of spatial relationships and reconstruct
    the image if necessary
  
We can load in an image, get its values into the vector,
and display the image... all within the class!

You'll also see that we compute the "distance" between two
vectors. This lets us see how similar an image is to another,
which can be useful for things like Google's "similar
image" search.

CHALLENGES:
+ There's a lot we should do to get this code ready to be
  used in a real project. For example, in the distance
  calculations, we'd want to be sure that our vectors were
  both the same length, and throw an error if they weren't.
  Can you implement that? What other changes would you make
  to make the code more robust?

*/


void setup() {
  size(600,300);
  
  // create a vector from an image of a face at 16x16
  ImageVector face1 = new ImageVector("face1.jpg", 16,16);
  face1.minMax();
  face1.display(0,0, width/2,height);
  
  // load a different image, also as a 16x16 vector
  ImageVector face2 = new ImageVector("face2.jpg", 16,16);
  face2.minMax();
  face2.display(width/2,0, width/2,height);
  
  // compute differences between the two
  println("Distance between the two vectors:");
  println("- euclidean = " + face1.euclideanDist(face2));
  println("- manhattan = " + face1.manhattanDist(face2));
  println("- chebyshev = " + face1.chebyshevDist(face2));
  println("- cosine =    " + face1.cosineSimilarity(face2, true));
}



class ImageVector {
  
  String label;    // a name labeling the vector (often this is the filename of the image)
                   // useful for when we have large numbers of vectors to keep track of
  
  int w, h;        // the image will be resized (large images provide too much data that we
                   //  don't really need, and make processing slow – 16x16 or 24x24 is good)
  
  float[] x;       // 1D array storing the normalized data

  // where's the image data?
  // we don't store the input PImage, since it would just produce redundant
  // data – with a few images that wouldn't be a problem, but with a set of
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
    // in these kind of cases – larger images and/or color
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

 