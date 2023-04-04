
// total number of frames in the video
let numFrames = 269;

let whichFrame = 0;  // which frame are we on?
let frames;          // list of all frames
let ui;              // UI overlay image
let capture;         // for recording the canvas

function preload() {
  // load all the frames into an array
  console.log('loading frames...');
  frames = [];
  for (let i=1; i<numFrames; i++) {
    let filename = 'frames/' + nf(i,6) + '.png';
    let frame = loadImage(filename);
    frames.push(frame);
  }
  console.log('- found ' + frames.length + ' frames!');

  // load the UI image too
  ui = loadImage('assets/TikTokOverlay.png');
}

function setup() {
  // create the canvas but as a variable with an "id"
  // (so CCapture can find it)
  let canvas = createCanvas(1080, 1920);
  canvas.id('canvas');

  // create the capture object
  capture = new CCapture({ 
    format:  'png',       // save as png
    name:    'Processed'  // to a folder called "Processed"
  });
}

function draw() {
  // we have to start in draw for some reason
  // (so do that on the first frame)
  if (whichFrame === 0) {
    capture.start();
    console.log('processing frames...');
  }
  console.log('- ' + whichFrame + '/' + frames.length);
  
  // YOUR CODE HERE!
  // be sure to draw the result to the canvas
  let frame = flipRGB(frames[whichFrame]);
  image(frame, 0,0);

  // add any other drawing commands here
  // such as the UI overlay
  image(ui, 0,0);

  // record the canvas every frame
  capture.capture(document.getElementById('canvas'));
  
  // if we've reached the end of the video (or earlier
  // for testing), stop the capture and stop
  whichFrame += 1;
  if (whichFrame === frames.length) {
    console.log('- done!');
    console.log('saving to file...');
    capture.stop();
    capture.save();
    console.log('- done!');
    noLoop();  // like quitting p5.js!
  }
}

// your filter function should take an image as its input
// (and maybe some settings) and send back a filtered
// image as its output
function flipRGB(input) {
  let output = createImage(input.width, input.height);
  input.loadPixels();
  output.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
      
      // processing with get/set() will be
      // SUUUUPER SLOOOW!
      // instead, use the "better" method
      // for pixel access, which will speed
      // things up a lot

      // get()
      let index = (y * input.width + x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];

      // set()
      output.pixels[index] =   b;
      output.pixels[index+1] = g;
      output.pixels[index+2] = r;
      output.pixels[index+3] = 255;  // alpha
    }
  }
  output.updatePixels();
  return output;
}

