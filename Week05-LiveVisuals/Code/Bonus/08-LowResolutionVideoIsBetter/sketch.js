/*
LOW RESOLUTION VIDEO IS BETTER
(Bonus: with smoothing too!)
Jeff Thompson | 2021 | jeffreythompson.org

Note! This example doesn't run super well in the
p5.js Editor – you may have a better experience
downloading and running this example locally.

We are really used to seeing video at high
resolution these days, whether it be streaming
TV or a Zoom call. But working with high-res
video for computer vision can grind your frame-
rate to a standstill and doesn't really give
better results. If you don't need the video
image onscreen as part of your sketch, using
a much lower-resolution video input will
still give great results and improve your
framerate considerably!

Bonus: if we were to use a tracked object
to control something onscreen, you'll probably
notice that it's really jumpy. We can smooth
this movement by averaging a list of previous
positions. By adjusting how many positions
we keep track of, we can tune the smoothing
so it feels responsive but not sluggish.

CHALLENGES
1. Try experimenting with the video dimensions
   and see how small you can make it but still
   get good object detection.
2. You may notice that we lose the person-tracking
   when your body gets too close to the edge of
   the screen – can you figure out a left/right
   margin and use that in the map() commands so
   the circle goes all the way to the edge of
   the canvas?

*/

let videoWidth =  160;   // video dimensions
let videoHeight = 120;   // (experiment with this!)

let smoothingSteps = 5;  // number of previous positions
let prevPositions = [];  // to use for smoothing

let video;
let model;


function setup() {

  // video is much smaller than the window
  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  video.hide();

  // canvas is full width and proportional
  // to the video's dimensions
  let ratio = videoHeight / videoWidth;
  createCanvas(windowWidth, windowWidth * ratio);

  // load the coco-ssd model
  console.log('loading model...');
  cocoSsd.load().then(cocoSsd => {
    console.log('- loaded');
    model = cocoSsd;
  });
}


function draw() {
  background(50);

  if (video.width > 0 && model !== undefined) {

    // optional: show a little preview of the video 
    // image(video, 0,0);
    
    // run the video (but not the entire canvas) 
    // through coco model
    video.loadPixels();
    let imgData = new ImageData(video.pixels, video.width, video.height);
    model.detect(imgData).then(predictions => {
      for (let p of predictions) {
        
        // skip anything that's not a person
        if (p.class !== 'person') {
          continue;
        }

        // get the center of the bounding box
        let centerX = p.bbox[0] + p.bbox[2]/2;
        let centerY = p.bbox[1] + p.bbox[3]/2; 

        // then convert the video coordinates
        // to screen coordinates!
        // note: why is the x from width to zero?!
        // the webcam mirrors your movements – flipping
        // the video is a computationally-intensive
        // process, but we can just reverse the x 
        // direction of the motion!
        centerX = map(centerX, 0,video.width,  width,0);
        centerY = map(centerY, 0,video.height, 0,height);

        // add to our list of previous positions
        prevPositions.push( [ centerX, centerY ] );

        // if we've gathered enough positions, remove
        // the oldest one
        if (prevPositions.length > smoothingSteps) {
          prevPositions.shift();
        }

        // calculate the average position from
        // the previous positions...
        let x = 0;
        let y = 0;
        for (let pos of prevPositions) {
          x += pos[0];
          y += pos[1];
        }
        x /= prevPositions.length;
        y /= prevPositions.length;

        // ...and draw a circle there
        fill(255);
        noStroke();
        circle(x,y, 30);        
      }
    });
  }

  // display the current framerate – try changing the
  // video's size and see how this changes!
  fill(255);
  noStroke();
  textAlign(RIGHT, TOP);
  text(nf(frameRate(), 0,2) + ' fps', width-50,50);
}

