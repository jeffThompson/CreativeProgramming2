/*
REMIXING VIDEO
Jeff Thompson | 2023 | jeffreythompson.org

Playing a video is cool, but we can also interact
with the file, creating live remixes! In this example,
we create a playbar showing where in the file we are
and use a keypress to jump to a random spot in the file.

Bonus! Use the mouse's y position to change the
playback speed of the video

Video by Alexander Lutkov:
https://www.pexels.com/video/time-lapse-video-of-traffic-1860079/

*/

let video;
let w, h;

function preload() {
  video = createVideo('assets/city-timelapse.mp4');
  video.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // play the video!
  video.loop();
  video.volume(0);

  // calculate the aspect ratio of the video, 
  // then use that to calculate a new size
  // so the video is half the width of the screen
  let aspectRatio = video.height / video.width;
  w = width / 2;
  h = w * aspectRatio;
}

function draw() { 
  background(50);

  // draw the video at the new size
  // (centered vertically)
  image(video, 0,height/2-h/2, w,h);

  // draw the mirror image of the video
  // (horizontal scale of -1 flips the image!)
  push();
  translate(width, height/2-h/2);
  scale(-1, 1);
  image(video, 0,0, w,h);
  pop();

  // we can get the current playback time
  // of the video, then use map() to create
  // a playback head onscreen
  let playbackPos = map(
    video.time(), 
    0, video.duration(), 
    0, width
  );
  stroke(255);
  strokeWeight(8);
  line(playbackPos,height/2-10, playbackPos,height/2+10);

  // use the mouse's y position to change
  // the speed of the video
  // 0.5 = half speed
  // 1.0 = normal speed
  // 2.0 = 2x speed
  let speed = map(mouseY, 0,height, 0.5,5);
  video.speed(speed);
}

// press a key to jump to a random time
function keyPressed() {
  let t = random(0, video.duration());
  video.time(t);
}

