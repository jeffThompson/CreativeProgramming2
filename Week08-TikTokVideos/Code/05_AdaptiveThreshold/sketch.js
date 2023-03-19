/*
ADAPTIVE THRESHOLD
Jeff Thompson | 2017/21 | jeffreythompson.org

A standard threshold may not work well for all images,
especially if some regions are dark or light overall
but contain information we want to preserve. Instead,
an "adaptive" threshold selects which pixels should
be black or white using a value that is computed based
on neighboring pixels, giving a much more natural
result. Depending on your settings, the output can
vary from looking like a pen drawing to a blown-out
old photocopier.

SEE ALSO
+ http://homepages.inf.ed.ac.uk/rbf/HIPR2/adpthrsh.htm
+ https://en.wikipedia.org/wiki/Otsu's_method
+ https://dsp.stackexchange.com/a/2504/16690

CHALLENGES
1. Another method (described in the first link above)
   suggests finding the min/max values for the neighboring
   region and using (min+max)/2 as the threshold. Can
   you implement that in our function below? How do
   the results differ?

*/

// region to measure to threshold value
// try small values between 4–30
// small = fast processing, more noisy
// large = slower, retain details
let dia = 12;

// after computing the mean, it may help to
// reduce the threshold by a set amount (try
// values 0–10)
let adjustment = 5;

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
  
  // process the image (we do this in setup() to
  // avoid re-processing the image every frame)
  img = adaptiveThreshold(img, dia, adjustment);
}


function draw() {
  image(img, 0,0); 
}


function adaptiveThreshold(input, dia, adjustment) {
  
  // if each pixel is the center and we look at
  // neighboring pixels within a given diameter,
  // we need the radius (easier to calcuate here
  // instead of multiple times in our for loops)
  let radius = dia/2;
  
  // create a blank output image (since we need to
  // access all the pixels in the source image, we
  // don't want to change it)
  let output = createImage(input.width, input.height);
  
  // load pixels for both the input and output image
  input.loadPixels();
  output.loadPixels();
  
  // go through all pixels in the image
  for (let y=0; y<input.height; y++) {
    for (let x=0; x<input.width; x++) {
      
      // look at the pixel's neighbors within the
      // radius specified, calculating the mean
      // brightness of that region
      let mean = 0;
      for (let dy=-radius; dy<radius; dy++) {
        for (let dx=-radius; dx<radius; dx++) {
          
          // if a neighboring pixel is off the edges of 
          // the image, use 127 (half of 256, the usual
          // threshold value)
          if (x+dx<0 || x+dx>input.width-1 || y+dx<0 || y+dy>input.height+1) {
            mean += 127;
          }
          
          // otherwise, grab the red value (a good
          // approximation of brightness) and add to mean
          else {
            let index = ((y+dy) * input.width + (x+dx)) * 4;
            mean += input.pixels[index];
          }
        }
      }
      
      // compute the mean from all neighboring pixels
      // and subtract the adjustment factor (if used)
      mean /= dia*dia;
      mean -= adjustment;
      
      // the mean value now becomes our threshold level
      // for this pixel – compute as normal!
      let index = (y * input.width + x) * 4;
      if (input.pixels[index] < mean) {
        output.pixels[index] =   0;      // set to black
        output.pixels[index+1] = 0;
        output.pixels[index+2] = 0;
        output.pixels[index+3] = 255;
      }
      else {
        output.pixels[index] =   255;    // set to white
        output.pixels[index+1] = 255;
        output.pixels[index+2] = 255;
        output.pixels[index+3] = 255;
      }
    }
  }
  
  // all done, send the processed image back!
  output.updatePixels();
  return output;
}

