
/*
KERNEL FILTERS
Jeff Thompson | 2017 | jeffreythompson.org
 
A filter that looks at its neighbors can be very useful,
since a single pixel in context doesn't tell us a whole lot.
If we weight how much influence the neighboring pixels have,
we call this a "kernel" filter.
 
Kernel filters can be used for lots of things, but they're
often used for things like blurring, which average pixels in
a region, and edge detection (the opposite).

EXAMPLE KERNELS
(These descriptions from the setosa.io link below)
+ blur de-emphasizes differences in adjacent pixels
+ sharpen emphasizes differences in adjacent pixels
+ edge (aka outline) highlights large differences in
  neighboring pixels – pixels of similar intensity will
  be made black, while pixels that differ strongly 
  will be made white

You may also see these, which are variations of the ones above:
+ sobel shows only the differences b/w adjacent pixels
  in a particular direction (up, right, etc)
+ emboss is like sobel, but creates a sense of depth by
  showing differences in both right and bottom directions

More info and some example kernels here:
+ https://en.wikipedia.org/wiki/Kernel_(image_processing)
+ http://setosa.io/ev/image-kernels/
+ https://docs.gimp.org/en/plug-in-convmatrix.html
 
CHALLENGES:
+ What happens when you apply a blurring kernel before a
  threshold filter? How is it different than no blur?
+ Try changing the kernel to match some of the ones listed
  in the links above – can you get a simple edge detection 
  working?
+ Our kernel function currently only takes a 3x3 array – can
  you expand it to take any size? Can you have it check to be
  sure the kernel is square and return an error if not?
+ Can you make the kernel interactive, so you can play with
  the values using the mouse or keyboard?
  
*/

// a 2D array stores our kernel "weights", or how much influence
// each neighboring pixel should have on the new value

float[][] blur = {
  { 0.0625, 0.125, 0.0625 },
  { 0.125,  0.25,  0.125 },
  { 0.0625, 0.125, 0.0625 }
};

float[][] sharpen = {
  {  0, -1,  0 },
  { -1,  5, -1 },
  {  0, -1,  0 }
};

float[][] edge = {
  { -1, -1, -1 },
  { -1,  8, -1 },
  { -1, -1, -1 }
};


void setup() {
  size(900, 700);

  // load the image
  PImage img = loadImage("../Test.jpg");
  
  // apply the filter, passing an image and the kernel weights
   //as arguments
  //img = kernelFilter(img, blur);
  
  
  // try sharpening the image instead
   //img = kernelFilter(img, sharpen);
  
  // edge detection will work best if you first convert
  // the image to grayscale
   img.filter(GRAY);
   img = kernelFilter(img, edge);
   img.filter(INVERT);
  
  // display the result
  image(img, 0, 0);
  
  // as with other filters, you may want to run the same filter
  // several times, for example to build up more blurring!
}


PImage kernelFilter(PImage in, float[][] kernel) {
  
  // create a blank image to write the new pixels to
  // we have to do this, since we're modifying pixels
  // as we go, and using neighboring pixels to decide 
  // what to do!
  PImage out = createImage(in.width, in.height, RGB);

  // loop through image's pixels, skipping the edges
  // (note that here we use x/y instead of just the index
  // since we need to know the pixel's neighbors too)
  in.loadPixels();
  for (int y=1; y<in.height-1; y++) {
    for (int x=1; x<in.width-1; x++) {

      // for each pixel, we add up RGB value for itself
      // and its neighbors, weighted by the kernel
      float sumR = 0;
      float sumG = 0;
      float sumB = 0;      

      // iterate through the neighboring pixels
      for (int offsetY=-1; offsetY<=1; offsetY++) {
        for (int offsetX=-1; offsetX<=1; offsetX++) {

          // get the index in the pixel array for this neighboring pixel
          int neighborIndex = (y + offsetY) * in.width + (x + offsetX);

          // get the rgb values for the neighbor
          float r = in.pixels[neighborIndex] >> 16 & 0xFF;
          float g = in.pixels[neighborIndex] >> 8 & 0xFF;
          float b = in.pixels[neighborIndex] & 0xFF;

          // multiply the color values by the kernel weight, 
          // then add to the sum – note that we add 1 to the
          // offset to get the kernel index (which will b 0–2)
          sumR += kernel[offsetY+1][offsetX+1] * r;
          sumG += kernel[offsetY+1][offsetX+1] * g;
          sumB += kernel[offsetY+1][offsetX+1] * b;
        }
      }
      
      // having checked all the neighbors, make sure
      // the final sums sticks to a range of 0–255
      sumR = constrain(sumR, 0,255);
      sumG = constrain(sumG, 0,255);
      sumB = constrain(sumB, 0,255);

      // set the current pixel in the output
      // image to the weighted sums
      out.pixels[y * in.width + x] = color(sumR, sumG, sumB);
    }
  }
  out.updatePixels();

  // send back the filtered image
  return out;
}
