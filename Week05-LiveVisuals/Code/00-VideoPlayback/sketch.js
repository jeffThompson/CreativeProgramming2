*
VIDEO PLAYBACK
Jeff Thompson | 2023 | jeffreythompson.org
We've looked at how to use images and sound with
p5.js, but it's also easy to add video! 
You'll need to make sure your video file is
in one of these supported formats:
+ mp4: a great, well-supported option
+ webm: newer format, also used for images!
+ mov: sadly won't work – use an online converter
       to make an mp4 version
Sample video by Enrique Hoyos:
https://www.pexels.com/video/drone-view-of-big-waves-rushing-to-the-shore-3571264/
*/

// like an image, we need a variable
// to load the video into
let video;

// we can draw stuff on top of the
// video too!
let a = 0;

function preload() {
  // load the video file
  video = createVideo('assets/waves.mp4');

  // in some browsers, you may notice
  // that a second video appears onscreen!
  // that's because p5js actually creates
  // a <video> html element, which then is
  // piped into the canvas – this command
  // ensures we can control when it's displayed
  // inside our sketch
  video.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // play the video in loop mode
  // (can also call video.play() to play once)
  video.loop();

  // and set the volume to 0
  // (1 = full volume)
  video.volume(0);
}

function draw() { 
  // display the video just like an image! 
  image(video, 0,0, width,height);

  // since we're drawing the video frames to
  // the canvas, we can draw on top of it too
  push();
  translate(width/2, height/2);
  rotate(a);
  fill(255);
  noStroke();
  circle(0, -50, 30);  // top
  circle(50, 0, 30);   // right
  circle(0, 50, 30);   // bottom
  circle(-50, 0, 30);  // left  
  pop();
  a += radians(2);
}