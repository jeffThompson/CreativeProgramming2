let video;
let audio;
let amplitude;

function preload() {
  video = createVideo('assets/waves.mp4');
  video.hide();
  
  audio = loadSound('assets/MaeShi-PowerToThePowerBiteTwo.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(start);

  amplitude = new p5.Amplitude();
}

function draw() {
  image(video, 0,0, width,height);

  // 0-1
  let volume = amplitude.getLevel();
  let speed = 0;
  if (volume > 0) {
    speed = map(volume, 0,1, 0.25,5);
  }
  video.speed(speed);

  fill(255);
  noStroke();
  text(nf(speed * 100, 0,2) + '%', 30,30);
}

function start() {
  video.loop();
  video.volume(0);
  
  audio.loop();
}