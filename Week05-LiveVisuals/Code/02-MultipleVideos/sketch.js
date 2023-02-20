/*
MULTIPLE VIDEOS
Jeff Thompson | 2023 | jeffreythompson.org

Just like images and other assets, we can also
load more than one video file into our sketch.
For this example we load two videos and switch 
between them with the spacebar.

Note! p5.js doesn't give us a way to see if a
video is currently playing or not, so we need
a variable to keep track. This makes for some
messy if statements – for more complicated 
projects, you might want to think about a better 
system for organzing this.

Videos by Zlatin Georgiev and David Dion:
https://www.pexels.com/video/drone-footage-of-winter-landscape-of-pine-trees-5598973/
https://www.pexels.com/video/drone-footage-of-mountains-and-low-land-3574266/

*/

// the two videos
let snow, desert;

// keep track of which one is playing
let snowPlaying = true;
let desertPlaying = false;

function preload() {
  // load the first video...
  snow = createVideo('assets/snow.mp4');
  snow.hide();

  // ...and the second!
  desert = createVideo('assets/desert.mp4');
  desert.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // start the first video (and make sure
  // the second one isn't playing)
  snow.loop();
  desert.pause();
}

function draw() {
  // show the video, depending on which
  // one is currently playing
  if (snowPlaying) {
    image(snow, 0,0, width,height);

    // bonus: add a colored overlay to everything
    fill(0,150,255, 150);
  }
  else {
    image(desert, 0,0, width,height);
    fill(255,150,0, 150);
  }

  // use the fill color selected above
  noStroke();
  rect(0,0, width,height);
}

function keyPressed() {
  // spacebar toggles which video is
  // displayed onscreen
  if (keyCode == 32) {
    // if it's currently the first
    // video...
    if (snowPlaying) {
      // ...pause it
      snow.pause();
      snowPlaying = false;

      // ...and start the other one
      desert.loop();
      desertPlaying = true;
    }
    else {
      desert.pause();
      desertPlaying = false;

      snow.loop();
      snowPlaying = true;
    }
  }
}

