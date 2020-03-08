/*
LOADING IMAGES
Jeff Thompson | 2020 | jeffreythompson.org

To add an image to your sketch, click the little < button
below the play button. A panel will open up that shows all
the files associated with your sketch.

1. Right-click on "Sketch Files" and choose "Add Folder"
2. Call it "assets" and hit ok
3. Right-click your new folder and choose "Add File"
4. Drag-and-drop from your computer (no need to set the name)
5. You can now access this file in your sketch with the
   path 'assets/<YourFilename.jpg>' etc

*/

var img;


function setup() {
  createCanvas(600, 771);
  
  // load the image from the 'assets' folder (see instructions
  // above for how to do this)
  img = loadImage('assets/MaxfieldParrish_TheGlen_1936.jpg');
  
  // Javascript is very picky about files from other locations
  // (as a security procaution), but we can load an image from 
  // a URL using createImg() instead
  // img = createImg('https://cdn3-www.dogtime.com/assets/uploads/2018/10/puppies-cover.jpg');
}

function draw() {
  
  // display the image, then manipulate it's pixels
  image(img, 0,0);
  loadPixels();
  for (var i=0; i<1000; i++) {
    var x = int(random(0,width));
    var y = int(random(0,height));
    
    // the way p5js' pixel array works is different
    // than in Processing – instead of RGB values mashed
    // together into one integer, they are stored
    // sequentially (red followed by blue followed by
    // green)
    // luckily, the get() command is fast and does
    // the math for us :)
    var c = get(x, y);
    fill(c);
    noStroke();
    ellipse(x,y, 10,10);
  }
}

