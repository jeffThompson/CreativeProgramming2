/*
WEBCAM INPUT
Jeff Thompson | 2021 | jeffreythompson.org

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


// like an image, we need a variable
// to connect our webcam to our sketch
let video;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create a video capture (aka webcam input)
  video = createCapture(VIDEO);
  
  // specify the resolution of the webcam input
  // (too high and you may notice performance
  // issues, especially if you're extracting info
  // from it or adding filters)
  video.size(640, 480);

  // in some browsers, you may notice
  // that a second video appears onscreen!
  // that's because p5js actually creates
  // a <video> html element, which then is
  // piped into the canvas – this command
  // ensures we don't see it :)
  video.hide();
}

function draw() { 

  // display the video just like an image! 
  image(video, 0,0);
}

