/*
TYPE AS IMAGES
Jeff Thompson | 2021 | jeffreythompson.org

There are times when dealing with type as letters
and shapes can't get you the effect you're after.
But, using a separate graphics object (like our
canvas but not displayed onscreen) means we can
do some really fun, glitchy, playful stuff with
our text!

For a 'real-world' project, you'd probably want to 
create the tiles and save them to a folder instead
of creating them every time the sketch gets run.

SEE ALSO
+ This example on getting portions of an image
  https://editor.p5js.org/jeffThompson/sketches/oLiww5UE9
+ And this one about offscreen graphics
  https://editor.p5js.org/jeffThompson/sketches/ObJgmj-2c

*/

let tileSize = 50;  // size tiles to make
let tiles;          // list of tiles, created in setup()
let font;           // font we'll use


function preload() {
  font = loadFont('assets/manteka.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // draw the text to a graphics object
  let pg = createGraphics(width, height);
  pg.background(0);
  pg.textFont(font);            // note we have to start all
  pg.textAlign(CENTER, CENTER); // commands with the name of
  pg.textSize(400);             // the graphics object
  pg.fill(255);
  pg.noStroke();
  pg.text('NO', pg.width/2, pg.height/2-38);
  
  // bonus: add some glitchy extra stuff in the background!
  pg.textSize(12);
  for (let i=0; i<500; i++) {
    pg.text('yes', random(pg.width), random(pg.height));
  }
  
  // split the graphics object into tiles!
  tiles = [];
  for (let y=0; y<pg.height; y+=tileSize) {
    for (let x=0; x<pg.width; x+=tileSize) {
      let tile = new Tile(x, y, tileSize, pg);
      tiles.push(tile);
    }
  }
  
  // start the background all black
  // note: there's no background in draw()
  background(0);
}


// display the tiles (real work is in the
// Tile class below)
function draw() {
  for (let i=0; i<tiles.length; i++) {
    tiles[i].display();
  }
}


// a simple class for the tiles
// this lets us more easily create images
// from the graphics we made in setup(),
// handle displaying them, etc though you
// could definitely do this without a class
class Tile {
  constructor(x, y, w, pg) {
    this.x = x;
    this.y = y;
    
    // create an empty image and copy from
    // the graphics object we made above!
    this.img = createImage(w, w);
    this.img.copy(pg, x,y, w,w, 0,0, w,w);
  }
  
  // display the tile!
  display() {
    push();
    translate(this.x, this.y);
    rotate( map(mouseX, 0,width, 0,TWO_PI) );
    image(this.img, 0,0);
    pop();
  }
}
  
