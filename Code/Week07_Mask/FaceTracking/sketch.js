/*
FACE-TRACKING
Jeff Thompson | 2020 | jeffreythompson.org

A demo using Audun Mathias Øygard's great clmtrackr 
library to track facial features from the webcam.

More info on the clmtrackr.js library and to see an
image showing all the facial points that are tracked:
https://www.auduno.com/clmtrackr/docs/reference.html

Based on: 
https://editor.p5js.org/kerryrodden/sketches/-KkpbDv6Z

Which is based on: 
https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm

*/


// clmtrackr returns a list of points, which reference
// pre-defined features on the face – to access them,
// we need the index in the list where those features
// can be found
let leftPupil =  27;
let rightPupil = 32;
let leftEye =  [ 23, 63, 24, 64, 25, 65, 26, 66 ];
let rightEye = [ 30, 68, 29, 67, 28, 70, 31, 69 ];
let mouth =    [ 44, 61, 60, 59, 50, 58, 57, 56 ];

let webcam = null;    // webcam object
let tracker = null;   // clmtrackr object
let features = null;  // list of facial features


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // start webcam input
  webcam = createCapture(VIDEO);
  webcam.size(width, height);

  // connect face tracking to webcam
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(webcam.elt);
}


function draw() {
  
  // mirror the webcam input (which will be more
  // natural-feeling) and display it
  translate(width, 0);
  scale(-1.0, 1.0);
  image(webcam, 0, 0, width,height);
  
  // get the features and, if we found some,
  // draw the mask
  features = tracker.getCurrentPosition();
  if (features.length > 0) { 
    drawMask();
  }
  
  // generally, it's a good idea to think of your
  // draw() loop as a "script" – a basic outline
  // of what your sketch does
  // any complex commands should be moved to functions,
  // which makes it easier to understand what's 
  // happening in both the draw() and your various
  // functions
  // here, we move the complex mask-drawing bits
  // to another function, making it easy to see that
  // we draw the webcam image, get the features, and
  // draw something if features are found
}


function drawMask() {
  
  // various examples below!
  // you can comment out sections to see them on their own
  
  // a simple example: get the x/y location of the pupils
  // and draw them as ellipses  
  fill(0);
  stroke(255);
  ellipse(features[leftPupil][0], features[leftPupil][1], 10,10);
  ellipse(features[rightPupil][0], features[rightPupil][1], 10,10);
  
  // some features, like the mouth, are made of many points
  // that we can chain together into a single shape
  // to do this, we iterate through the 'mouth' array...
  beginShape();
  for (var i=0; i<mouth.length; i++) {
    
    // each element of the 'mouth' array is an index
    // in the list of features – grab that index so
    // we can extract the x/y coords for each point
    var index = mouth[i];
    vertex(features[index][0], features[index][1]);
  }
  endShape(CLOSE);
  
  // do the same thing for each eye (we'll need to
  // move the pupil code below so it doesn't get
  // covered up)
  fill(255,0,0);
  stroke(255);
  beginShape();
  for (var i=0; i<leftEye.length; i++) {
    var index = leftEye[i];
    vertex(features[index][0], features[index][1]);
  }
  endShape(CLOSE);

  beginShape();
  for (var i=0; i<rightEye.length; i++) {
    var index = rightEye[i];
    vertex(features[index][0], features[index][1]);
  }
  endShape(CLOSE);
  
  // the features are listed as coordinates in the image
  // and don't have width/height listed – we can get that
  // info though with a little math
  // to calculate the eye height, subtract the y coordinate
  // of a point at the bottom of the the eye from one at
  // the top!
  var eyeHeightLeft = features[26][1] - features[24][1];
  var eyeHeightRight = features[31][1] - features[29][1];
  
  // we can then use those heights to draw pupils that
  // get larger/smaller with th eyes
  fill(0);
  stroke(255);
  ellipse(features[leftPupil][0], features[leftPupil][1], eyeHeightLeft,eyeHeightLeft);
  ellipse(features[rightPupil][0], features[rightPupil][1], eyeHeightRight,eyeHeightRight);
  
  // clmtrackr looks for faces, but doesn't give us an overall
  // face dimesion – but we can use the same ideas from above
  // plus a little knowledge from figure drawing: generally, 
  // the eyes are at the center of the face
  var faceCenterX = features[33][0];
  var faceCenterY = features[33][1];
  
  // we can use two outside points to figure out the width
  // and double the distance from the eyes to the chin for
  // the overall height
  var faceWidth = features[14][0] - features[0][0];
  var faceHeight = (features[7][1] - features[0][1]) * 2;
  fill(255, 100);
  noStroke();
  ellipse(faceCenterX,faceCenterY, faceWidth,faceHeight);
  
  // rough "smiling" estimation by measuring the distance
  // between the two corners of the mouth and comparing it
  // relative to the distance between the pupils**
  var mouthLeft = createVector(features[44][0], features[44][1]);
  var mouthRight = createVector(features[50][0], features[50][1]);
  var mouthWidth = mouthLeft.dist(mouthRight);
  
  var eyeLeft = createVector(features[27][0], features[27][1]);
  var eyeRight = createVector(features[32][0], features[32][1]);
  var eyeDist = eyeLeft.dist(eyeRight);
  
  var smile = mouthWidth / eyeDist;
    console.log('mouth: ' + nf(mouthWidth,0,2) + ', eyes: ' + nf(eyeDist,0,2) + ', smile: ' + nf(smile,0,2));
  
  // map the smile values from a neutral proportion (about 0.65
  // for me) and a smiling one (about 0.8) to a range of 0–1
  smile = map(smile, 0.65, 0.8, 0,1);
  
  // ** note! these kinds of face measurements are very, very 
  // rough approximations and are meant as a starting point – 
  // there are millions of different faces and any attempt to
  // break them down into an "ideal" or "average" starts to 
  // get dangerously close to eugenics
  
  // we can use the "smile" value to add a color overlay!
  var neutral = color(150, 100);
  var happy = color(255,150,0, 100);
  fill( lerpColor(neutral,happy, smile) );
  noStroke();
  rect(0,0, width,height);
}

