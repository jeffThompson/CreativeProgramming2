/*
OTHER IMAGE FILTERS
Jeff Thompson | 2017/21 | jeffreythompson.org

A few more filters we can make ourselves: adjusting
the brightness and contrast of an image, and inverting
the colors.

CHALLENGES
1. Can you try just brightening the red, green, or
   blue channel of an image and see what happens?
2. Can you make the brightness and contrast filters
   into a single tool that modifies both values
   interactively with the mouse?
3. Can you implement any other Photoshop-style
   filters for adjusting images?
   
*/

let img;


function preload() {
  img = loadImage('assets/test.jpg');
}


function setup() {
  
  // resize the image to fit the window, then 
  // create the canvas at that size
  img.resize(windowWidth, 0);
  createCanvas(img.width, img.height);
  noLoop();
  
  // try the different filters or combine
  // them in different orders!
  img = brighten(img, -100);
  // img = contrast(img, 255);
  // img = invert(img);
}


function draw() {
  image(img, 0,0);
}


// brighten the pixels in an image by
// a specified amount
function brighten(input, amount) {
  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
      
      // get the current pixel
      let index = (y*input.width+x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];
      let a = input.pixels[index+3];
      
      // make adjustments to color, using
      // constrain() to ensure it doesn't go
      // outside the 0–255 range
      r += amount;
      r = constrain(r, 0,255);
      g += amount;
      g = constrain(g, 0,255);
      b += amount;
      b = constrain(b, 0,255);
      
      // change the pixel value
      input.pixels[index] =   r;
      input.pixels[index+1] = g;
      input.pixels[index+2] = b;
      input.pixels[index+3] = a;
    }
  }
  
  // send the image back
  input.updatePixels();
  return input;
}


// contrast is the amount of variation between
// light and dark in an image – higher contrast
// means lighter lights an darker darks
// the math is a bit tricky but that's why the
// internet exists!
// mostly via:
// http://stackoverflow.com/q/13500289/1167783
function contrast(input, amount) {
  
  // this implementation expects the amount
  // to be 0–4, so we convert to that range
  amount = map(amount, -255,255, 0,4);
  
  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
      
      // get the current pixel
      let index = (y*input.width+x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];
      let a = input.pixels[index+3];
      
      // convert rgb to range of 0–1
      r /= 255;
      g /= 255;
      b /= 255;
      
      // apply the contrast formula
      r = (((r - 0.5) * amount) + 0.5) * 255.0;
      g = (((g - 0.5) * amount) + 0.5) * 255.0;
      b = (((b - 0.5) * amount) + 0.5) * 255.0;
      
      // make sure we don't go past 0–255 range
      r = constrain(r, 0,255);
      g = constrain(g, 0,255);
      b = constrain(b, 0,255);
      
      // change the pixel value
      input.pixels[index] =   r;
      input.pixels[index+1] = g;
      input.pixels[index+2] = b;
      input.pixels[index+3] = a;
    }
  }
  
  // send the image back
  input.updatePixels();
  return input;
}


// inverts the color of each pixel by subtracting
// its value from 255
function invert(input) {
  input.loadPixels();
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
      
      // get the current pixel
      let index = (y*input.width+x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];
      let a = input.pixels[index+3];
      
      // subtract color from 255
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
      
      // change the pixel value
      input.pixels[index] =   r;
      input.pixels[index+1] = g;
      input.pixels[index+2] = b;
      input.pixels[index+3] = a;
    }
  }
  
  // send the image back
  input.updatePixels();
  return input;
}



