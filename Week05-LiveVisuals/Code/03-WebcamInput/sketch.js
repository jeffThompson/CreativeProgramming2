/*
WEBCAM INPUT
Jeff Thompson | 2021/23 | jeffreythompson.org

Getting webcam input with p5.js is super easy!
We create a variable for it, start the capture
in setup(), and can display the result with
the image() command! In upcoming examples,
we'll also see how we can access the pixels
from the webcam.

CHALLENGES
1. Can you make a grid from the video input,
   drawing the image a bunch of times?

*/

// like a video file, we need a variable
// to connect our webcam to our sketch
let video;

// we'll calculate the aspect ratio
// once the webcam has loaded (for now
// these initial dimensions should work)
let w = 640;
let h = 480;
let foundAspectRatio = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create a video capture (aka webcam input)
  video = createCapture(VIDEO);

  // just like video files, we'll need to hide
  // the webcam input to avoid it being shown
  // twice :)
  video.hide();
}

function draw() { 
  background(0,150,255);

  // display the webcam, just like a video!
  imageMode(CENTER);
  image(video, width/2,height/2, w,h);

  // the webcam gets connected to p5.js in setup()
  // but we won't know the dimensions of the video
  // until the first frame comes in
  // waiting until the metadata has loaded is a 
  // reliable way to check that the video is
  // ready – then we can calculate the aspect ratio!
  if (!foundAspectRatio && video.loadedmetadata) {
    let aspectRatio = video.height / video.width;
    w = width / 2;
    h = w * aspectRatio;
    
    // set the 'flag' variable to true, so we
    // don't run this calculation every frame!
    foundAspectRatio = true;
  }
}

