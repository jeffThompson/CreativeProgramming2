/*
IMAGE FILTERS
Jeff Thompson | 2017/21 | jeffreythompson.org

p5.js comes with some pre-built filters that change 
the pixels onscreen, ranging from converting a color 
image to grayscale to smooth blurring. The filters 
can be used for artistic effect on their own (though, 
like the filters in Photoshop, they tend to look a bit 
cheesy and pre-made) but are better used to prepare 
images for further processing.

Later, we'll implement a few of these ourselves. We'll 
also see some of these filters used in computer vision 
to prepare images for object detection. This is also
a crucial step in machine learning to make training and 
feature extraction easier.

ORDER MATTERS!
Like signal processing in audio, the order in which we 
apply filters matters. If we first blur, then threshold, 
we'll get a very different result than in the opposite 
order. Thinking about how you apply the filters (or at 
least trying things and see what happens) will be important 
to get the best results.

CHALLENGES
1. Can you make the filter parameters interactive using the
   mouse or keyboard?
2. Can you chain several filters together to make something
   more interesting than a single on by themselves? For 
   example, try blurring before running a threshold filter.

*/


// which filter to apply
let whichFilter = 'threshold';
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
  
  // threshold
  // if the brightness of a pixel is below a
  // set threshold, set it to black; if above,
  // set it to white (we'll implement this
  // filter ourselves in a bit)
  if (whichFilter === 'threshold') {
    filter(THRESHOLD, 0.5);  // threshold 0–1
  }
  
  // grayscale
  // converts an image to grayscale (we'll make
  // this one too)
  else if (whichFilter === 'gray') {
    filter(GRAY);  // no arguments!
  }
  
  // invert
  // set each pixel's color to its opposite on
  // the color wheel
  else if (whichFilter === 'invert') {
    filter(INVERT);  // no arguments here either!
  }
  
  // blur
  // executes a gaussian blur (though there are
  // lots of other methods to blur images)
  else if (whichFilter === 'blur') {
    filter(BLUR, 8);  // radius of blur in pixels
  }
  
  // dilate
  // increases light areas in the image, which is
  // useful in computer vision for filling holes
  // and smoothing edges
  // https://docs.opencv.org/2.4/doc/tutorials/imgproc/erosion_dilatation/erosion_dilatation.html
  else if (whichFilter === 'dilate') {
    filter(DILATE);     // no arguments
    // filter(DILATE);  // try running multiple times!
    // filter(DILATE);
  }
  
  // erode
  // reduces light areas, also useful in computer
  // vision to remove bridges between separate
  // objects which appear connected
  else if (whichFilter === 'erode') {
    filter(ERODE);  // no arguments, like dilate
  }
}

