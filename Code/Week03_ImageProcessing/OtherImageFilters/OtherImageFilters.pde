
/*
OTHER IMAGE FILTERS
Jeff Thompson | 2017 | jeffreythompson.org
 
A few more filters: adjusting the brightness and contrast
of an image, and inverting the colors. For even fancier
filters that take into consideration neighboring pixel values,
see the "KernelFilter" example.
 
CHALLENGES:
+ Can you try just brightening the red, green, or blue channel
  of an image and see what happens?
+ Can you make the Brightness and Contrast filters into
  a single tool that modifies both using X/Y mouse coordinates?
+ Can you invent your own filter using these ideas? Can you
  implement filters you've used in Photoshop or read about online?
 
*/


void setup() {
  size(900, 700);

  // load the image
  PImage img = loadImage("../Test.jpg");

  // the filters below are implemented as separate
  // functions to keep our code cleaner – note that
  // we pass the PImage into them as an argument and
  // it returns the filtered image

  // brighten or darken an image
  // second arg = amount to adjust by (-255 to 255)
  img = brighten(img, -50);

  // adjust the contrast of an image
  // second arg = amount to adjust (-255 to 255)
  // img = contrast(img, 255);

  // invert the image's colors
  // img = invert(img);

  // after we've filtered it, display the final image
  image(img, 0, 0);
}