
/*
SEARCH FOR CLOSEST FACE
Jeff Thompson | 2018 | jeffreythompson.org

This example extends the ImageVector class and lets us search a dataset
of faces for the one closest to the input image. 

IMPROVING THE RESULT
This example is by no means perfect: background noise and changes in lighting
will effect which face is matched. Some ways we might improve this would
be to:

+ use only images that are front-facing
+ use OpenCV to isolate just the face from the image and automatically crop it
+ or, even better, align by identifying the points of the eyes, nose, and mouth

Can you think of other ways to improve this system?

DATASETS
There are two datasets included here to try, both have been
reduced (by me) to make demo-ing the code faster. Both are compressed
for easier download, so unzip them first before running this code.

1. Cropped photos from Wikipedia by Rasmus Rothe, Radu Timofte,
and Luc Van Gool: https://data.vision.ee.ethz.ch/cvl/rrothe/imdb-wiki/

2. Cropped and aligned faces by Lior Wolf, Tal Hassner, and Yaniv 
Taigman: https://www.openu.ac.il/home/hassner/data/lfwa/

*/

String faceToMatchFilename = "FaceToTest2.jpg";    // a face image to match
String faceDirectory =       "faces";              // folder of faces to search

ImageVector faceToMatch, closest;                  // vector of matching faces

ArrayList<ImageVector> otherFaces = new ArrayList<ImageVector>();    // all faces


void setup() {
  size(1200,600);
  
  // load all image files from a directory
  // uses the Java "File" class, which lets us access things like
  // a file's name, full path, etc
  ArrayList<String> files = new ArrayList<String>();
  File dir = new File(sketchPath(faceDirectory));
  if (dir.isDirectory()) {
    for (File f : dir.listFiles()) {
      String filename = f.getName();
      String extension = filename.substring(filename.lastIndexOf(".") + 1);
      if (extension.equals("jpg") || extension.equals("png")) {
        files.add(f.getAbsolutePath());
      }      
    }
  }
  else {
    println("Not a directory!");
    exit();
  } 
  
  // load the face we want to match as an image vector
  faceToMatch = new ImageVector(faceToMatchFilename, 16,16);
  faceToMatch.minMax();
  
  // create vectors from all the other face images too
  println("Loading images to test against...");
  for (int i=0; i<files.size(); i++) {
    println("- " + (i+1) + " / " + files.size());
    ImageVector face = new ImageVector(files.get(i), 16,16);
    face.minMax();
    otherFaces.add(face);
  }
  
  // find the closest face by measuring the distance
  // between the target and all other faces (smallest
  // distance = the most similar!)
  float minDist = MAX_FLOAT;
  for (ImageVector other : otherFaces) {
    float dist = faceToMatch.chebyshevDist(other);
    if (dist < minDist) {
      minDist = dist;
      closest = other;
    }
  }
  println("Closest match: ");
  println("- label: " + closest.label);
  println("- dist: " + minDist);
  
  // display the results
  PImage original = loadImage(faceToMatchFilename);
  image(original, 0,0, width/2,height);
  PImage match = loadImage(closest.label);
  image(match, width/2,0, width/2,height);
}