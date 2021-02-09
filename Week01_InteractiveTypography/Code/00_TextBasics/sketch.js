/*
TYPE BASICS
Jeff Thompson | 2021 | jeffreythompson.org

The basics of creating type in p5.js is easy, though
typography is a field that takes a lifetime to master,
which is why it's so fascinating! In this example,
we'll see some of the basic text commands – in the
next example we'll look at how to load unique fonts.

MORE INFO
+ https://p5js.org/reference/#/p5/text
+ https://p5js.org/reference/#/p5/textFont

CHALLENGES
1. Can you create text that follows your mouse?
   Hint: you'll need to remove noLoop() from the
   setup() so you can have interactivity
2. Since text is drawn like any other shape, can
   you apply animation to text? What text settings
   would you need to think about to do that? For
   example, if you wanted text to rotate around
   its center, you'd probably want to use
   textAlign(CENTER, CENTER) so you're drawing
   it from 0,0
   
*/


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}


function draw() {
  background(240);
  
  // we can use the text() command on its own
  // to display text – it takes three arguments:
  // 1. what to display (a string, number, etc)
  // 2. x position
  // 3. y position
  text('hello', 50,50);
  
  // but it looks pretty boring and we don't
  // have any control over how it looks :(
  
  // font
  // the most obvious thing we'd want to change
  // is which font to use!
  // for now, we'll just use 'web-safe' fonts, 
  // ones that we know are installed on everyone's
  // computer – in the next example, we'll see
  // how we can use other fonts too
  textFont('Georgia');
  
  // there are only a handful of fonts we can
  // assume everyone has on their computer
  // you can find a useful list and examples here:
  // https://www.w3schools.com/cssref/css_websafe_fonts.asp
  
  // in addition to the font we use, there
  // are some basic font-related settings we
  // can change... try changing all these
  // and see how it affects the result!
  
  // color/stroke
  // text is drawn with the same fill/stroke
  // commands we use for other shapes
  noStroke();
  fill(50);
  
  // size
  // measured in px (72px should be about 1")
  textSize(72);
  
  // let's see how that looks...
  text('hello', 50,150);
  
  // alignment
  // we can set the horizontal and (optionally)
  // the vertical alignment of text too
  textAlign(CENTER, CENTER);
  
  // (note: CENTER is all-caps which in programming
  // usually means it's a built-in variable)
  
  // we can also change fonts, size, etc
  // throughout our program
  textFont('Brush Script MT');
  textSize(height/2);
  text('hello', width/2,height/2);
  
  // and since all these values are numbers, they
  // can be use in for-loops, randomized, etc!
  textFont('Tahoma');
  textSize(24);
  textAlign(RIGHT, BOTTOM);
  let numSteps = width/5;
  for (let i=0; i<numSteps; i++) {
    let c1 = color(255,150,0, 150);
    let c2 = color(0,150,255, 150);
    fill( lerpColor(c1,c2, i/numSteps));
    
    let x = map(i, 0,numSteps, width,0);
    let y = map(i, 0,numSteps, height,0);
    let a = map(i, 0,numSteps, 0,TWO_PI);
    push();
    translate(x,y);
    rotate(a)
    text('hello', 0,0);
    pop();
  }  
}

