/*
READING PIXELS AND COLORS
Jeff Thompson | 2017/21 | jeffreythompson.org

Since our screens are made of up pixels, basically anything
we do in computer graphics (type in a Word doc, watch a video, 
move a window) involves manipulating pixel values.

p5.js lets us read the values of all the pixels onscreen, which 
are stored in an array (aptly named "pixels"), extract their 
RGB values, and even change individual pixels, too!

CHALLENGES
1. While there's a lot of science to understanding our
   visual perception, the red value of a pixel is a good
   approximation of brightness. Can you calculate the
   average brightness of the image?
2. A better measure of brightness uses this formula:
     brightness = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
  Can you use this to find a better average brightness
  of the image?
3. Can you implement any of the p5.js drawing commands (like
   rect or line) using the pixel array?

*/


let img;

function preload() {
  img = loadImage('assets/test.jpg')
}


function setup() {
  // resize the image, preserving its
  // proportions, to fit onscreen
  img.resize(windowWidth, 0);
  
  // then create our canvas to that size
  createCanvas(img.width, img.height);
  noLoop();
}


function draw() {
  image(img, 0,0);
  
  // pixels
  // a raster image is made up of individual pixels,
  // each a single rgb color – these are stored in an
  // array called 'pixels'
  // to use them, we need to call loadPixels() otherwise
  // we might see nothing :)
  loadPixels();
  
  // to access a pixel's color, we use get()
  console.log('The first 10 pixels of the canvas...');
  for (let x=0; x<10; x++) {
    let px = get(x, 0);
    console.log(px);
  }
  
  // notice the pixels are little arrays?
  // each contains r, g, b, and a (which is alpha)
  // so if we want to get the rgb values from the
  // pixel at (100,100) we could do this
  let px = get(100,100);
  let r = px[0];
  let g = px[1];
  let b = px[2];
  console.log(r + ', ' + g + ', ' + b);
  
  // for more info (and to understand some of
  // the limitations of this method), see the
  // Better Pixel Access demo
  
  // we can also change the value of pixels!
  // let's randomly set some to be black
  for (let i=0; i<3000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    set(x, y, color(0));
  }
  updatePixels();
  
  // note: when we change pixel values, we have to
  // call updatePixels() so the screen gets updated
}

