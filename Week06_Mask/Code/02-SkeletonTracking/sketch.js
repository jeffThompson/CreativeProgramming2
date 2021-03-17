/*
SKELETON TRACKING
Jeff Thompson | 2021 | jeffreythompson.org

In addition to face tracking, machine-learning allows
us to track all kinds of other things including our
skeletons! This is really fun for interactive projects
like games where you want to get your body involved.

This example uses ml5.js, a wonderful open-source
library intended to be easy to interface with p5.js.
Basically, it wraps up more complex code like
TensorFlow and can save a *ton* of headache
but doesn't give you as much control.

MORE INFO
+ https://learn.ml5js.org/#/reference/posenet

SEE ALSO
+ https://learn.ml5js.org/#/reference/handpose

CHALLENGES
1. What ways can you think to use the skeleton
   points? Can you use the angle/distance in
   interesting ways?
2. Can you get the HandPose library working? It's is 
   also available with ml5.js and should be pretty
   similar

*/

let video;     // webcam input
let model;     // PoseNet machine-learning model
let skeleton;  // detected skeleton

let firstSkeleton = true;


function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  // load the PoseNet model
  model = ml5.poseNet(video, { maxPoseDetections: 1 } );
  
  // when it has a new pose (skeleton), this 
  // function will be run!
  // (basically we just grab the first prediction,
  // since we only want one skeleton)
  model.on('pose', function(predictions) {
    skeleton = predictions[0];
  });
}


function draw() {
  if (video.loadedmetadata) {
    image(video, 0,0, width,height);
  }
  if (skeleton !== undefined) {

    // if this is the first face we've
    // found, print the info
    if (firstSkeleton) {
      console.log(skeleton);
      firstSkeleton = false;
    }

    // the skeleton includes a list of 17 keypoints,
    // or named locations on the body – let's see them!
    fill(255);
    noStroke();
    for (let pt of skeleton.pose.keypoints) {
      
      // the points in PoseNet are in a different
      // format than in our face examples – they
      // include a 'part' (rightShoulder, etc), a
      // 'score' (confidence that this is correct)
      // and a position

      pt = scalePoint(pt.position);
      circle(pt.x, pt.y, 20);
    }

    // we can also get specific points!
    let leftWrist =  skeleton.pose.leftWrist;
    let rightWrist = skeleton.pose.rightWrist;

    // only display if the confidence level is high enough
    if (rightWrist.confidence > 0.3 && leftWrist.confidence > 0.3) {
      
      // grab the position from the wrists and convert into
      // a vector (which will let us do fancier math below)
      let l = createVector(leftWrist.x, leftWrist.y);
      l = scalePoint(l);
      
      let r = createVector(rightWrist.x, rightWrist.y);
      r = scalePoint(r);
      
      stroke(255);
      strokeWeight(6);
      line(l.x, l.y, r.x, r.y);

      // bonus!
      // we can use the dist() and angleBetween() functions
      // to calculate useful measurements between points!
      let a = l.angleBetween(r);  // angle (in radians)
      let d = l.dist(r);          // distance too!

      fill(0);
      noStroke();
      text('Angle: ' + nf(degrees(a), 0,2) + 'º\nDist: ' + nf(d, 0,2) + 'px', l.x,l.y);
    }
  }
}


// note: this is a little different than the previous
// versions of this function, since the position from
// PostNet has separate x/y variables
function scalePoint(pt) {
  let x = map(pt.x, 0,video.width, 0,width);
  let y = map(pt.y, 0,video.height, 0,height);
  return createVector(x, y);
}

