/*
EXPORTING FRAMES TO VIDEO
Jeff Thompson | 2021 | jeffreythompson.org

Want to create a video of a sketch but it runs too
slowly? Have thousands of objects you're simulating
and your computer bogs down? Want to render 8k video?
Trying to optimize sketches to run in real-time can 
be incredibly challenging, but exporting frames and
turning them into a video can be a great solution.

If we added the save() command to the end of our
draw loop, we'd be prompted every time to download
the resulting image: not a good solution. Instead,
we can use the CCapture library which saves all the
images in a compressed form, then lets us download
them all when we're done!

TO CREATE YOUR VIDEO
1. Install ffmpeg, a command-line tool for video
   - Mac: install Homebrew, then the command 
     "brew install ffmpeg"
   - PC: go to the FFMPEG site and download the 
     pre-compiled version
   - Linux: run "sudo apt-get install ffmpeg"
2. In your terminal, navigate to your sketch's folder
3. FFMPEG has lots of options, but try this:
   
     ffmpeg -y -r 24 -i output/%06d.png -c:v libx264 
     -profile:v high -crf 20 -pix_fmt yuv420p 
     MySweetVideo.mp4

4. Hit return; it may take a while to render but you 
   should see lots of text scroll by – if it ends 
   without an error, you're all set! (try previewing 
   your video file to be sure)

REQUIRES
+ CCapture lib
  https://github.com/spite/ccapture.js

BASED ON
+ https://peterbeshai.com/blog/2018-10-28-p5js-ccapture

CHALLENGES
1. Can you convert an old sketch of yours to render 
   frames at a higher resolution?
2. Can you add feedback while the rendering is 
   happening, using console.log()?

*/

let numFrames = 100;
let capture;

function setup() {

  // we need to create our canvas a bit differently than we've
  // done before this is so we can give it an 'id' that we can 
  // reference later when we record it, otherwise it will be 
  // hard to tel the capture library where to find our canvas
  let canvas = createCanvas(1920, 1080);
  canvas.id('canvas');  // the id can be anything, but we reference it at
                        // the end of our draw()

  // formats include:
  // png, jpg, gif, and webm
  // name = name of folder (image files) or file (gif or video)
  capture = new CCapture( { format: 'png', name: 'frames' } );

  // note: webm is probably Chrome-only, according to the docs :(
  // docs also note that gifs with a lot of frames may break

  // other useful options: add a little export progress widget 
  // and output details to the console
  // capture = new CCapture( { format: 'png', display: true, verbose: true });
}


function draw() {
  // we have to start recording in draw() otherwise your sketch
  // won't work (but you won't get any errors) so we just start
  // on the first frame
  if (frameCount === 1) {
    capture.start();
    console.log('starting recording');
  }
  // and end when we've reached the # of frames desired
  if (frameCount === numFrames) {
    console.log('done recording');
    noLoop();
    capture.stop();   // stop recording
    capture.save();   // and prompt us to save the frames
    return;
  }

  // draw something
  background(50);
  for (let i=0; i<100; i++) {
    fill(255);
    noStroke();
    circle(random(0,width), random(0,height), 10);
  }

  // capture the current state of the canvas every frame
  // (note this should be after you finish drawing stuff!)
  capture.capture(document.getElementById('canvas'));
}

