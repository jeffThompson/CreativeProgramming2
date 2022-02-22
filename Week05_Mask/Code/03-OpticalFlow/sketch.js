/*
OPTICAL FLOW
Jeff Thompson | 2021 | jeffreythompson.org

Optical flow measures the apparent motion across 
an image. It dates back to research by psychologist 
James Gibson in the 1940s, and is used today in fields 
like robotics (to know how a target object is moving
in the scene) and crowd analysis (figuring out individual
and average movement).
 
To calculate optical flow, the pixel you want to track 
is compared to its neighbors in the previous frame. 
Whichever is most similar is the direction of movement.
(Thanks to Larry O'Gorman at Bell Labs for explaining 
this to me!)

BASED ON
https://editor.p5js.org/kylemcdonald/sketches/rJg3gPc3Q

CHALLENGES
1. Can you visualize the flow's angle and magnitude 
   (strength) with something other than arrows?

*/


let gridSize = 24;      // spacing to check flow
                        // lower = more info but slower
let ignoreThresh = 16;  // ignore movements below this level

let flow;               // calculated flow for entire image
let previousPixels;     // copy of previous frame
let video;


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  // set up flow calculator
  flow = new FlowCalculator(gridSize);
}


function draw() {
  video.loadPixels();
  if (video.pixels.length > 0) {

    // calculate flow (but skip if the current and
    // previous frames are the same)
    if (previousPixels) {
      if (same(previousPixels, video.pixels, 4, width)) {
        return;
      }
      flow.calculate(previousPixels, video.pixels, video.width,video.height);
    }

    // display the video
    image(video, 0,0);

    // if flow zones have been found, display
    // them for us!
    if (flow.zones) {
      for (let zone of flow.zones) {
        
        // if a zone's flow magnitude (strength) is
        // less than a set threshold, don't display
        if (zone.mag < ignoreThresh) {
          continue;
        }

        // otherwise, draw a little arrow!
        push();
        translate(zone.pos.x, zone.pos.y);
        rotate(zone.angle);
        strokeWeight(2);
        stroke(255);
        line(0,0, zone.mag,0);
        line(zone.mag,0, zone.mag-5,-5);
        line(zone.mag,0, zone.mag-5,5);
        pop();
      }
    }

    // copy the current pixels into previous
    // for the next frame
    previousPixels = copyImage(video.pixels, previousPixels);
  }
}

