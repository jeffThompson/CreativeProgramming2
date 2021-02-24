/*
UI OVERLAY
Jeff Thompson | 2021 | jeffreythompson.org

For projects that will eventually be seen on social 
media, it's common to add sample UI on top of your 
images, so that clients and others can see your work 
in context. The quickest way to do this would be to 
buy a PNG or Illustrator overlay or take an hour or 
two and make one yourself – I've gone ahead and made 
them for you! (Well, one for Instagram stories and
one for TikTok)

You can find these files and the original Illustrator
file (so you can modify things like usernames) here:
https://github.com/jeffThompson/CreativeProgramming2/
tree/master/Week03_ImageFilters/Resources

Sunset image via:
https://www.flickr.com/photos/wangjs/185264150

*/

let img;                // the image to process
let instagram, tiktok;  // overlay files


function preload() {
  img = loadImage('assets/Sunset.jpg');
  
  // load both of the overlays
  instagram = loadImage('assets/InstagramOverlay.png');
  tiktok =    loadImage('assets/TikTokOverlay.png');
}


function setup() {
  createCanvas(1080, 1920);
  noLoop();
  
  // process the image!
  // (here we shift each row of pixels
  // randomly left/right)
  img = distort(img, 200);
}


function draw() {
  
  // display the result, with the Instagram
  // overlay, then save it
  image(img, 0,0, width,height);  
  image(instagram, 0,0);
  save('instagram.png');
  
  // same for the TikTok overlay too!
  image(img, 0,0, width,height);  
  image(tiktok, 0,0);
  save('tiktok.png');
}


// randomly displaces each row of pixels
// within a specified range
function distort(input, amount) {
  let output = createGraphics(input.width, input.height);
  input.loadPixels();
  for (let y=0; y<img.height; y++) {
    let strip = img.get(0,y, width,1);
    let offset = random(-amount,amount);
    output.image(strip, offset, y);
    
    // draw the same strip to the right/left
    // too, so there aren't white gaps
    output.image(strip, offset-strip.width, y);
    output.image(strip, offset+strip.width, y);
  }
  return output;
}

