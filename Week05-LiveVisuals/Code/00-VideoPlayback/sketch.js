
let fingers;

function setup() {
  createCanvas(300,300)
  fingers = createVideo(['assets/fingers.mov']);
  fingers.hide();
  fingers.loop();
}

function draw() {
  tint(255, 12);
  fingers.loadPixels();
  image(fingers, 10, 10);
}