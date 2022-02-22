/*
FACE DETECTION: MESH
Jeff Thompson | 2021 | jeffreythompson.org

In the previous example, we saw a system that gives
us a few key facial features. Awesome, but what if
we want more detail? Facemesh, also part of TensorFlow,
give us 486 different points... and even guesses
3D data too! (We don't use that here, but would love
to see cool stuff you cook up with it!)

These points take some more work to use in our code,
but allow for a ton of expressiveness.

SEE ALSO
+ https://github.com/tensorflow/tfjs-models/tree/
  master/face-landmarks-detection
+ https://arxiv.org/pdf/1907.06724.pdf

CHALLENGES
1. Using the URL above, can you find where dimples
   would be and draw some?
2. The mouth opening is pretty simple but can you
   draw the individual lips? (Hint: you'll need
   to combine the upper/lower lips for the top
   and bottom, but reverse the outer lip list.)

*/

let video;  // webcam input
let model;  // Face Landmarks machine-learning model
let face;   // detected face

// print details when a face is
// first found
let firstFace = true;


function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  // like in the BlazeFace example, we have
  // to load the model in an asynchronous function
  loadFaceModel();
}


// load the Face Landmarks model – this can be super
// slow so you might want to add a loading screen!
async function loadFaceModel() {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    
    // optional: limit results to just one face
    { maxFaces: 1 }
  );
}


function draw() {

  // get face data if the video and model are both loaded
  if (video.loadedmetadata && model !== undefined) {
    getFace();
  }

  // if we have face data, show us!
  if (face !== undefined) {
    image(video, 0,0, width,height);

    // print info the first time a face is detected
    if (firstFace) {
      console.log(face);
      firstFace = false;
    }

    // this model gives us a *ton* of data!
    // first, let's see all the points
    fill(255);
    noStroke();
    for (let pt of face.scaledMesh) {
      pt = scalePoint(pt);
      circle(pt.x, pt.y, 3);
    }

    // amazing, but probably information overload
    // we can also use the 'annotations' section to get
    // facial features...

    // silhouette
    fill(0,150,255, 100);
    noStroke();
    beginShape();
    for (pt of face.annotations.silhouette) {
      pt = scalePoint(pt);
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    // eyes
    // first, let's use the iris position as the center
    let leftEye =  scalePoint(face.annotations.leftEyeIris[0]);
    let rightEye = scalePoint(face.annotations.rightEyeIris[0]);

    // then use the face's overall bounding box to scale them
    let topLeft =     scalePoint(face.boundingBox.topLeft);
    let bottomRight = scalePoint(face.boundingBox.bottomRight);
    let w = bottomRight.x - topLeft.x;
    let dia = w / 6;

    fill(255);
    noStroke();
    circle(leftEye.x,  leftEye.y,  dia);
    circle(rightEye.x, rightEye.y, dia);

    // the mouth is split into four parts: the top/bottom
    // and their inner/outer lips – to use these to make a 
    // shape, we have to be a little creative
    let mouth = [];
    for (let pt of face.annotations.lipsUpperInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }
    for (let pt of face.annotations.lipsLowerInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }

    fill(50,0,0);
    noStroke();
    beginShape();
    for (let pt of mouth) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    // if necessary, you can also grab points directly
    // from the mesh! (see the url at the top for an
    // image showing all the point locations)
    let nose = scalePoint(face.scaledMesh[5]);
    for (let d=w/6; d>=2; d-=1) {
      fill(255,150,0, map(d, w/6,2, 0,255));
      noStroke();
      circle(nose.x, nose.y, d);
    }
  }
}


// converts points from video coordinates to canvas
function scalePoint(pt) {
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
  return createVector(x, y);
}


// gets face points from video input
async function getFace() {
  const predictions = await model.estimateFaces({
    input: document.querySelector('video')
  }); 
  if (predictions.length === 0) {
    face = undefined;
  }
  else {
    face = predictions[0];
  }
}

