
/*
SEARCH FOR CLOSEST FACE
Jeff Thompson | 2018 | jeffreythompson.org
 
This example extends the ImageVector class and lets us search a dataset
of faces for the one closest to the input image. 
 
This example is by no means perfect: background noise, changes in lighting,
and over- or under-exposure of different skin shades will affect which face 
is matched. The included dataset has done quite a bit of work for us, though,
by having isolated faces that are front-facing, isolated from their backgrounds
(mostly), and face features are aligned.
 
DATASETS
+ Included here is a dataset of cropped and aligned faces to try. It's via Khosla,
  A., Bainbridge, W.A., and Oliva, A. (2013) and it matches the distribution in the
  1990 US census.

  It is compressed for easier download, so unzip it first before running this 
  code. (If you're in my IRL class, I've posted a link to the full dataset of 10k
  faces on Canvas for you to try!)

  More info and request access to the full set here:
  http://www.wilmabainbridge.com/8jans2h5hkskg729.html

+ You can also use the "Labeled Faces in the Wild" dataset, though you'll need
  to extract the images from their subfolders in order to use this code directly.
  
  Download it here: http://vis-www.cs.umass.edu/lfw/lfw-funneled.tgz

CHALLENGES
+ Loading and processing our dataset can be really slow. A better idea would be
  to create a "model" of processed data that is smaller and easier to load. Can
  you think of ways to acccomplish that? (For example: doing all the image
  transformations like grayscale conversion once and saving copies, using a
  separate Processing sketch.)
+ Loading a long list of files like this is the perfect case for a thread, code
  that runs asyncronously, letting you do other tasks. See the documentation for
  the thread() command and see if you can load the face vectors in it!

*/

String faceToMatchFilename = "FaceToTest1.jpg";          // a face image to match
String faceDirectory =       "../FaceImages/49Faces";    // folder of faces to search

ImageVector faceToMatch, closest;                        // vector for input and matching faces

// all the faces to test
ArrayList<ImageVector> otherFaces = new ArrayList<ImageVector>();


void setup() {
  size(800, 400);

  // load all image files from a directory
  // uses the Java "File" class, which lets us access things like
  // a file's name, full path, etc
  println("Getting a list of all image files...");
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
    println("- found " + files.size() + " images");
  } 
  else {
    println("- not a directory, quitting!");
    exit();
  }


  // load the face we want to match as an image vector
  println("Creating vector of the input image...");
  faceToMatch = new ImageVector(faceToMatchFilename, 16, 16);
  faceToMatch.minMax();


  // create vectors from all the other face images too
  println("Creating vectors to test against (may take a while)...");
  for (int i=0; i<files.size(); i++) {
    println("- " + i + " / " + files.size());
    ImageVector face = new ImageVector(files.get(i), 16, 16);
    face.minMax();
    otherFaces.add(face);
  }


  // find the closest face by measuring the distance
  // between the target and all other faces (smallest
  // distance = the most similar!)
  println("Finding most-similar face...");
  float minDist = MAX_FLOAT;
  for (ImageVector other : otherFaces) {

    // calculate the distance – here we use cosine similarity,
    // but it returns 1 if it is an exact match, so the "true"
    // argument reverses the results to be like other distance
    // measures
    float dist = faceToMatch.cosineSimilarity(other, true);

    // if the distance is shorter than the previous record,
    // this face is a closer match!
    if (dist < minDist) {
      minDist = dist;
      closest = other;
    }
  }
  println("- done! closest match = " + minDist);

  // display the results
  PImage img = loadImage(faceToMatchFilename);
  image(img, 0, 0, width/2, height);

  img = loadImage(closest.label);
  image(img, width/2, 0, width/2, height);
}
