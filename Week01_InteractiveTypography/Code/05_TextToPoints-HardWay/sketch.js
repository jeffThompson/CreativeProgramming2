/*
TEXT TO POINTS (the hard way)
Jeff Thompson | 2021 | jeffreythompson.org

In the 'easy way' version, we just drew text onscreen
and used the color to determine if a letter was there.
But what if we want the outline of text instead?

While p5.js does have a textToPoints() function built
in (https://p5js.org/reference/#/p5.Font/textToPoints),
it has limited capability, namely that it just gives you
a big list of points and we don't have a way of knowing
when one part of a letter begins and the next ends.

But, being an open-source project, we can take a peek
at the code for textToPoints() and make our own version!
(You could also fork p5.js from Github and make modifications
that way, even submit a change to the project!) The
basics are pretty simple but the details get real gnarly.
See textToShapes.js if you want to see how it's all done.

There are still some limitations, the big one being
that we don't have a good way to tell if a shape is the
outside or a cutout, like we'd have in the letter 'o'.
It also doesn't work with textAlign()... :(

Use your mouse to interact with the text!

SEE ALSO
+ The opentype library: https://github.com/opentypejs/opentype.js
  And this rad demo of it: https://opentype.js.org

CHALLENGES
1. Can you try other ways of displaying the letters? What
   about points or circles? Experiment with size and color
   to see how it changes the look
2. The list of lists of lists gets a litte complicated,
   especially if you want to have more than one text.
   Can you create a class (or nested classes) that keep
   track of all this?
3. Bonus: if you create a class, can you keep track of
   each character ('p', 't', etc) as well as its points?
   Can you watch for the line break character (\n) and
   have the x/y positions change when it hits one?

*/

let letters;  // list of shapes, created in setup()
let font;


function preload() {
  font = loadFont('assets/CaslonSemiBoldItalic.otf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // text setup, then convert into shapes
  textFont('Georgia');
  let options = {          // optional, but very useful!
    x: 50,                 // start of text (default 0,0)
    y: 250, 
    fontSize: 144,         // font size (default uses textSize() value)
    sampleFactor: 0.1,     // controls spacing of points (default 0.1)
    simplifyThreshold: 0   // removes collinear points (default 0) 
  };
  letters = textToShapes(font, 'ångström', options);
}


function draw() {
  background(50);
  
  // go through each letter...
  for (let i=0; i<letters.length; i++) {
    let shapes = letters[i];
    
    // ...go through all shapes in each letter...
    for (let j=0; j<shapes.length; j++) {
      let shape = shapes[j];
      
      // ...and draw each each
      fill(255, 100);
      stroke(255);
      beginShape();
      for (let k=0; k<shape.length; k++) {
        let x = shape[k].x;
        let y = shape[k].y;
        
        // if the points are within a certain
        // range of the mouse, distort
        let d = dist(x,y, mouseX,mouseY);
        if (d < 50) {
          x += random(-2,2);
          y += random(-2,2);
        }
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
  
  // show distortion area at cursor
  noFill();
  stroke(255, 30);
  circle(mouseX,mouseY, 100);
}

