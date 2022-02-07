/*
BETTER PIXEL ACCESS
Jeff Thompson | 2017/21 | jeffreythompson.org

In the last example (Reading Pixels and Colors) we
used get() to extract the color of a pixel and set()
to change it. But for anything other than really
small images, this method can be really, REALLY slow!

Instead, accessing and changing values directly
in the image's pixel array is much faster, but is a
bit more confusing to get used to.

The pixel array for an image (or your screen) is
just one big long list, with r, g, b, and a values
listed separately:

  first pixel        second pixel...
  r    g    b  a     r  g    b    a...
[ 255, 150, 0, 255,  0, 150, 255, 255... ]

Since each color has four values, we need a special
formula to get a pixel value at a specific location:

  index = (y * width + x) * 4

This can be pretty confusing at first, but becomes
easier the more you use it and pays off in speed!

CHALLENGES
1. Can you have random pixels become random colors?

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
  
  // change every ten pixels on the screen
  img.loadPixels();
  for (let y=0; y<img.height; y+=10) {
    for (let x=0; x<img.width; x+=10) {
      
      // to calcuate the index in the pixels
      // array, using the formula listed above
      let index = (y * img.width + x) * 4;
      
      // we can then get rgba values like this
      let r = img.pixels[index];
      let g = img.pixels[index+1];
      let b = img.pixels[index+2];
      let a = img.pixels[index+3];
      
      // or set pixels this way too!
      img.pixels[index] =   0;
      img.pixels[index+1] = 150;
      img.pixels[index+2] = 255;
      img.pixels[index+3] = 255;      
    }
  }
  
  // when done, we have to call updatePixels()
  // like when using get() and set()
  img.updatePixels();
  
  // display the image
  image(img, 0,0);
}

