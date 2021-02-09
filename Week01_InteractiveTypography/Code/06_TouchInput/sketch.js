/*
TOUCH INPUT
Jeff Thompson | 2021 | jeffreythompson.org

Note: this demo won't work on a normal computer. Try
it on a phone or tablet for the full effect, though
you can see how the code works here.

One of the great things about projects that run in
the web browser is that they can run on tons of
different devices, including phones and tablets!
Javascript provides touch input on devices that
have it and p5.js has made it super easy to access
that data.

For most purposes, touch works just like the mouse:
if you use mouseX/mouseY in your sketch and someone
is on a phone, it will work just like a mouse. In
fact, though p5.js provides some touch-related
functions we almost never need them: mouse ones
will capture both mouse and touch!

This sketch demonstrates the more advanced 'touches'
array, that allows us to see multiple fingers
touching our sketch!

NOTE ABOUT USABILITY
Ok, so this is super fun! But you don't want to
design a sketch that doesn't work well for someone
on a regular computer. Think about ways these
interactions can be a bonus for folks but always
default to the same kind of interaction. Plus, there
really isn't a reliable way to know if someone
is on a phone or a computer, so it's best not to
worry about it.

SEE ALSO
Lots more fun mobile stuff, like acceleration and
even shake detection, here!
https://p5js.org/reference/#group-Events

*/

let dia = 300;


function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(50);

  // touches array
  // if a touch event occurs, an array called
  // 'touches' is populated, with one entry per
  // finger – we can use the length of that array
  // to know if a touch is happening and how
  // to handle it!

  // single touch works just like a mouse
  if (touches.length === 1) {
    background(0, 150, 255);

    fill(255);
    noStroke();
    circle(mouseX, mouseY, dia);
  }

  // two touches
  else if (touches.length === 2) {
    background(255, 150, 0);

    // grab the touches from the array
    let first = touches[0];
    let second = touches[1];
    
    // calculate how far apart they are and
    // use that to set the fill color
    let d = dist(first.x, first.y, second.x, second.y);
    if (d < dia) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    noStroke();
    
    // draw both touches
    circle(first.x, first.y, dia);
    circle(second.x, second.y, dia);
  }
}


// important!
// since touch is used for so many different things
// (clicking, scrolling, etc) we want to avoid the
// default behavior which might cause weirdness
// by returning 'false' we prevent that from
// happening!
function touchStarted() {
  return false;
}

