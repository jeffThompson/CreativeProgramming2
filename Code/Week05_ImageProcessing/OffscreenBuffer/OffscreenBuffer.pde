
/*
OFFSCREEN BUFFER
Jeff Thompson | 2017 | jeffreythompson.org

Sometimes we don't want to manipulate the pixels onscreen
directly. For example if we wanted to create a user interface
for manipulating images, we wouldn't want the UI's pixels
to be included in our filter. To solve this, we create
manipulate the PImage directly, then display the results
when done.

Other uses for an offscreen buffer?
+ You may want to manipulate the pixels of an image, but
  keep the original data, as in our example below.
+ You can work on images waaayyy to big to show onscreen,
  for example ones you want to be able to print at a high
  resolution. You could just save the results to file and
  view it, or show a reduced-size version.
+ The same idea also works for the PGraphics object, 
  letting you draw shapes to the buffer before displaying
  or saving it.

*/


PImage img, output;      // an input and output PImage object
float chanceSwap = 0;    // filter variable controlled by the mouse


void setup() {
  size(900,700);
  
  img = loadImage("../Test.jpg");
  
  // create a blank image the same size as our input
  // we don't want to do this every frame, since it might
  // slow down our sketch
  output = createImage(img.width, img.height, RGB);
}


void draw() {
  
  // randomly swap pixels in the image
  // we wouldn't be able to undo this change, but by
  // writing the changes to a second PImage, we can
  // update the filter's settings interactively
  
  // use the mouse to set the chance that two pixels
  // will be swapped – by setting the random seed every
  // frame, the results of the filter are repeatable
  chanceSwap = map(mouseX, 0,width, 0,100);
  randomSeed(1);
  
  // load the pixels of both our input and output images
  img.loadPixels();
  output.loadPixels();
  
  // run our swapping filter on the input image
  for (int i=0; i<img.pixels.length; i++) {
    
    // randomly decide whether to swap pixels or not
    if (random(100) < chanceSwap) {
      
      // pick a random pixel to swap with
      int swapIndex = int(random(img.pixels.length));
      
      // set the output image's pixels to the original
      // and swapped pixel values from the input image
      output.pixels[i] = img.pixels[swapIndex];
      output.pixels[swapIndex] = img.pixels[i];      
    }
    
    // if no swap, just set the output pixel to the
    // same as the input
    else {
      output.pixels[i] = img.pixels[i];
    }
  }
  
  // update the output image to the new pixel values
  // and display it onscreen
  output.updatePixels();
  image(output, 0,0);
  
  // we might also want to have some kind of user interface
  // displayed that would be captured by a filter using
  // the sketch's pixel array – here we show the chance that
  // two pixels will be swapped
  textSize(200);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  text(nf(chanceSwap, 0,2) + "%", width/2, height/2);
}