/*
VIDEO PIXELS
Jeff Thompson | 2021 | jeffreythompson.org

Video input is basically just like an image!
We can get it's width and height, and access
the frame's pixel values too!

BASED ON
https://p5js.org/examples/dom-video-pixels.html

CHALLENGES
1. Can you have the circles filled with the
   pixel color instead of just black?
2. Notice a lag before the video starts? Can
   you have something else display onscreen
   before the camera is ready? (Hint: if
   video.width === 0, then it's not ready
   yet)

*/

let video;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // webcam capture (at the size of the window)
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() { 
  background(255);

  // try experimenting with this
  let gridSize = int(map(mouseX, 0,width, 15,50));

  // the video has pixels just like an image!
  video.loadPixels();
  for (let y=0; y<video.height; y+=gridSize) {
    for (let x=0; x<video.width; x+=gridSize) {
      
      // at the current position, get the red
      // value (an approximation for brightness)
      // and use it to create the diameter
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let dia = map(r, 0,255, gridSize,2);
      
      // draw a circle at the current location
      // using the diameter we calculated
      fill(0);
      noStroke();
      circle(x+gridSize/2,y+gridSize/2, dia);
    }
  }
  
}

