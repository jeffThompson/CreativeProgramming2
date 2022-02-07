/*
GRAYSCALE CONVERSION
Jeff Thompson | 2017/21 | jeffreythompson.org

Converting an image to grayscale is perhaps the 
simplest of filters we can implement ourselves. 
While p5.js' grayscale filter is a one-line, easy 
option, it's useful to understand how it works, 
and, as you'll see below, we can also improve it 
a bit, too!

CHALLENGES:
1. Another way to create a grayscale image is to 
   average the values for red, green, and blue. Can 
   you implement that below? Do you prefer those 
   results or just the red value?
2. This demo uses get() and set(), which can be
   slow with large images – can you convert this
   to use the pixels array instead?

*/

let simple, better;

function preload() {
  simple = loadImage('assets/test.jpg');
  better = loadImage('assets/test.jpg');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  
  // resize the image to half the canvas
  simple.resize(width/2, 0);
  better.resize(width/2, 0);
}


function draw() {
  
  // simple grayscale
  // a simple way to convert an image to grayscale
  // is to just take the red value from each pixel
  // and use that to set a grayscale color – it's
  // not perfect, but a decent approximation
  simple.loadPixels();
  for (let y=0; y<simple.height; y++) {
    for (let x=0; x<simple.width; x++) {
      let px = simple.get(x, y);   // get pixel value
      let r = px[0];               // get red value
      simple.set(x, y, color(r));  // set pixel to this value
    }
  }
  simple.updatePixels();
  image(simple, 0,0);
  
  // note all the commands starting with simple.?
  // any pixel command can also be applied to images
  // before we display them onscreen!
  
  // a better grayscale conversion
  // the above method works ok, but often loses
  // the dynamic range of the original, since some
  // colors tend to play a more prominent role in
  // how we perceive brightness
  // the formula below does a better job of capturing
  // the original image, though it's more complex
  better.loadPixels();
  for (let y=0; y<better.height; y++) {
    for (let x=0; x<better.width; x++) {
      let px = better.get(x, y);
      let r = px[0];
      let g = px[1];
      let b = px[2];
      let bright = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
      better.set(x, y, color(bright));
    }
  }
  better.updatePixels();
  image(better, width/2,0);
  
  // notice the difference?
  // while some areas appear the same, other
  // areas retain a lot more detail than the
  // simple method
}



















