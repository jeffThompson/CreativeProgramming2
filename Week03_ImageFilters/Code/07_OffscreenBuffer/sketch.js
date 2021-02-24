/*
OFFSCREEN BUFFER
Jeff Thompson | 2017/21 | jeffreythompson.org

Sometimes we don't want to manipulate the pixels
onscreen directly: for example, if we wanted to
create a user interface for editing images and
applied a grayscale filter, we wouldn't want the
user interface's pixels to be modified too! To
solve this, we can create a new image, manipulate
its pixels, then display the results when done.

RUNNING SLOW?
While we are using the pixels[] instead of get()
and set(), this will still run pretty slow on
larger images. This is because we're doing a lot
of processing each frame! Languages like OpenGL
that run on the graphics card are optimized for
this and will be much faster.

OTHER USES?
+ You may want to manipulate the pixels of an image
  but keep the original data, as in our example here
+ You can work on images waaaaayy to big to show
  onscreen, for example ones that you want to be able
  to print at high resolution – just save the results
  to a file and view it
   
*/

let chanceSwap = 0;
let source, output;


function preload() {
  source = loadImage('assets/test.jpg');
}


function setup() {
  
  // resize the image to fit the window, then 
  // create the canvas at that size
  source.resize(windowWidth, 0);
  createCanvas(source.width, source.height);
  
  // create a blank image the same size as
  // our input – we want to do this in setup()
  // to avoid slowing down our sketch in draw()
  output = createImage(source.width, source.height);
}


function draw() {
  
  // use the mouse to set the chance that two pixels
  // will be swapped – by setting the random seed every
  // frame, the results of the filter are repeatable
  chanceSwap = map(mouseX, 0,width, 0,100);
  randomSeed(1);
  
  // do the swap!
  output = swapPixels(source, chanceSwap);
  image(output, 0,0);
  
  // we might also want to have some kind of user 
  // interface displayed that would be captured by 
  // a filter using the sketch's pixel array – here
  // we show the chance that two pixels will be swapped
  textFont('Georgia');
  textSize(200);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  text(int(chanceSwap) + '%', width/2, height/2);
}


// press the 's' key to save the swapped image
// notice that this doesn't save the text overlay
// since that's not part of our image!
function keyPressed() {
  if (key === 's') {
    output.save('PixelSwap.png');
  }
}


// the swap code gets a little long, so moving
// it to a function helps keep our draw() clean
function swapPixels(source, chanceSwap) {
  source.loadPixels();
  output.loadPixels();
  
  // go through all the pixels
  for (let y=0; y<source.height; y++) {
    for (let x=0; x<source.width; x++) {
      
      // calculate the index in the pixels array
      let index = (y * source.width + x) * 4;
      
      // randomly swap the color of two pixels
      if (random(100) < chanceSwap) {
        
        // random pixel to swap with
        let rx = int(random(0, source.width));
        let ry = int(random(0, source.height));
        let swapIndex = (ry * source.width + rx) * 4;
        
        // set current position to randomly-chosen
        // pixel value
        output.pixels[index] =   source.pixels[swapIndex];
        output.pixels[index+1] = source.pixels[swapIndex+1];
        output.pixels[index+2] = source.pixels[swapIndex+2];
        output.pixels[index+3] = source.pixels[swapIndex+3];
      }
      
      // if no swap, set them to the input color
      else {
        output.pixels[index] =   source.pixels[index];
        output.pixels[index+1] = source.pixels[index+1];
        output.pixels[index+2] = source.pixels[index+2];
        output.pixels[index+3] = source.pixels[index+3];
      }
    }
  }
  
  // send back the processed image
  output.updatePixels();
  return output;
}



