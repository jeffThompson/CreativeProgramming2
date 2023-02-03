/*
MORE THAN ONE FONT
Jeff Thompson | 2021 | jeffreythompson.org

One font is great, but if you want multiple weights
of a single font or mix-and-match different fonts,
you'll need to load each separately. Doing this is
simple! Just like images, you can create one
variable for each font, then load them in 
preload()... that's it!

To use your fonts, just call the textFont() 
command to specify which one to use and any size,
alignment, etc commands you need (this is just
like fill and stroke: the change stays until you 
specify otherwise).

CHALLENGES
1. Can you make the typefaces change when your
   mouse crosses the middle?

*/

// one variable for each font
// (name them whatever you want!)
let light, black;

// then load them in preload() just
// like with a single font
function preload() {
  light = loadFont('assets/Chivo-Light.ttf');
  black = loadFont('assets/Chivo-Black.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, BASELINE);
}


function draw() {
  background(50);
  
  fill(255);
  noStroke();
  
  let alternate = true;
  for (let y=0; y<=height; y+=50) {
    for (let x=0; x<=width; x+=50) {
      push();
      translate(x, y);
      let angle = map(mouseX, 0,width, -PI,PI);
      if (alternate) {
        rotate(angle);
        
        // one font
        textFont(black);
        textSize(64);
        text('q', 0,0);
      }
      else {
        rotate(-angle);
        
        // and the other!
        textFont(light);
        textSize(24);
        text('z', 0,0);
      }
      pop();
      alternate = !alternate;
    }
  }
}

