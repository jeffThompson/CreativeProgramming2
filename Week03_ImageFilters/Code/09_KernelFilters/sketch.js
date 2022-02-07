/*
KERNEL FILTERS
Jeff Thompson | 2017/21 | jeffreythompson.org

A filter that looks at its neighbors can be very
useful, since a single pixel in context doesn't 
tell us a whole lot. If we weight how much influence 
the neighboring pixels have, we call this a "kernel" 
filter.
 
Kernel filters can be used for lots of things, but 
they're often used for things like blurring, which 
average pixels in a region, and edge detection (the
opposite).

EXAMPLE KERNELS
(These descriptions from the setosa.io link below)
+ blur de-emphasizes differences in adjacent pixels
+ sharpen emphasizes differences in adjacent pixels
+ edge (aka outline) highlights large differences in
  neighboring pixels – pixels of similar intensity will
  be made black, while pixels that differ strongly 
  will be made white

You may also see these, which are variations of the 
ones above:
+ sobel shows only the differences b/w adjacent pixels
  in a particular direction (up, right, etc)
+ emboss is like sobel, but creates a sense of depth by
  showing differences in both right and bottom directions

More info and some example kernels here:
+ https://en.wikipedia.org/wiki/Kernel_(image_processing)
+ http://setosa.io/ev/image-kernels/
+ https://docs.gimp.org/en/plug-in-convmatrix.html
 
CHALLENGES
1. What happens when you apply a blurring kernel before
   a threshold filter? How is it different than no blur?
2. Try changing the kernel to match some of the ones 
   listed in the links above – can you get a simple edge 
   detection working?
3. Our kernel function currently only takes a 3x3 array – 
   can you expand it to take any size? Can you have it 
   check to be sure the kernel is square and return an 
   error if not?
4. Can you make the kernel interactive, so you can play 
   with the values using the mouse or keyboard?
   
*/

let blur = [
  [ 0.0625, 0.125, 0.0625 ],
  [ 0.125,  0.25,  0.125 ],
  [ 0.0625, 0.125, 0.0625 ]
];

let sharpen = [
  [  0, -1,  0 ],
  [ -1,  5, -1 ],
  [  0, -1,  0 ]
];

let edge = [
  [ -1, -1, -1 ],
  [ -1,  8, -1 ],
  [ -1, -1, -1 ]
];

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
  
  // apply the blur filter, passing the image
  // to process and the kernel we want to use
  img = kernelFilter(img, blur);
  
  // try sharpening the image instead!
  // img = kernelFilter(img, sharpen);
  
  // edge detection will work best if you first
  // convert the image to grayscale
  // img.filter(GRAY);
  // img = kernelFilter(img, edge);
  // img.filter(INVERT);
  
  // as with other filters, you may want to run the
  // same filter several times, for example to build
  // up a really smooth blur!
}


function draw() {
  image(img, 0,0);
}


function kernelFilter(input, kernel) {
  
  // we need to access neighboring pixels, so we have
  // to create a blank output image to work with
  let output = createImage(input.width, input.height);
  
  // start at 1 and end -1 from edge so our kernel
  // doesn't try to grab pixels that don't exist!
  input.loadPixels();
  output.loadPixels();
  for (let y=1; y<input.height-1; y++) {
    for (let x=1; x<input.width-1; x++) {

      // for each pixel, we add up rgb values for
      // itself and its neighbors, weighted by the kernel
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      
      // go through neighboring pixels
      for (let offsetY=-1; offsetY<=1; offsetY++) {
        for (let offsetX=-1; offsetX<=1; offsetX++) {
          
          // grab the current pixel
          let neighborIndex = ((y+offsetY) * input.width + (x+offsetX)) * 4;
          let r = input.pixels[neighborIndex];
          let g = input.pixels[neighborIndex+1];
          let b = input.pixels[neighborIndex+2];
          
          // apply kernel and add to the sum
          // (we +1 here so that we get the kernel index
          // from our offsetX/offsetY values)
          sumR += kernel[offsetY+1][offsetX+1] * r;
          sumG += kernel[offsetY+1][offsetX+1] * g;
          sumB += kernel[offsetY+1][offsetX+1] * b;
        }
      }
      
      // having checked all neighbors, make sure final
      // values are in range 0–255
      sumR = constrain(sumR, 0,255);
      sumG = constrain(sumG, 0,255);
      sumB = constrain(sumB, 0,255);
      
      // change the pixel value
      let index = (y * input.width + x) * 4;
      output.pixels[index] =   sumR;
      output.pixels[index+1] = sumG;
      output.pixels[index+2] = sumB;
      output.pixels[index+3] = 255;
    }
  }
  
  // send the image back
  output.updatePixels();
  return output;
}

