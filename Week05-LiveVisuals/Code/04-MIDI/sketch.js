/*
MIDI
Jeff Thompson | 2023 | jeffreythompson.org

Note! Once you connect a MIDI device, you may need
to restart your browser for it to work. Check the
browser's console to see any errors.

Mouse and keyboard input provide easy ways to
control your program. But there are lots of other
input devices we could consider using, ranging
from trackpads and game controllers to custom-built
electronics! But a great solution comes to us
from the world of music: MIDI controllers.

MIDI (musical instrument data interface) is a
communications standard developed in the 1980s
but is still in wide use. Today, we send MIDI
data over USB, making these controllers easy to
use.

To incorporate MIDI into our project, we need a
Javascript library called WebMIDI.js:
https://webmidijs.org

Be sure to add this to your index.html file!
*/

// values for a circle, which we'll
// change using the keyboard
let dia = 20;
let hue = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // hsb (hue, saturation, brightness) will
  // let us create nice-looking color shifts
  colorMode(HSB);
}

function draw() {
  background(20);

  // draw a circle, using the note's
  // input values to change how it looks!
  fill(hue, 100, 100);
  noStroke();
  circle(width/2, height/2, dia);
}

// note!
// you can just copy/paste most of this code
// into your project – just change the
// setShapeParameters() function to do what you
// want after receiving the note data

// create a webmidi object, which will
// handle incoming messages from the
// controller (once created, this will
// run the onMidiEnabled() function to
// complete the setup)
WebMidi
  .enable()
  .then(onMidiEnabled)
  .catch(error => console.log(error)
);

// when the webmidi object is created, it
// runs this function...
function onMidiEnabled() {

  // verify if a midi device is connected
  // if so, print the name of the device
  // to the console (or display an error)
  if (WebMidi.inputs.length < 1) {
    console.log('No MIDI device detected!');
  }
  else {
    WebMidi.inputs.forEach((device, index) => {
      console.log(index + ': ' + device.name);
    });
  }

  // you'll need the index of the controller
  // that was printed to the console
  let whichController = 0;

  // create a 'listener' – this code will run every
  // time a new note is received from the controller
  const controller = WebMidi.inputs[whichController].addListener(
    'noteon', n => {
      
      // we get a note object, which contains some
      // useful stuff!
      let name =     n.note.name;        // A, B, C, etc
      let id =       n.note.identifier;  // C2, D#4, etc
      let octave =   n.note.octave;      // 1, 2, 3, etc
      let velocity = n.note.attack;      // how hard you pressed (0–1)
    
      // we could do lots of cool stuff with the note's
      // data but let's pass it to a function and have
      // it change a shape onscreen...
      setShapeParameters(n.note);
    
    }, { channels: [ 1 ] }               // listen on midi channel 1
  );                                     // add extra numbers to this list if
}                                        // want to listen to additional channels!

function setShapeParameters(n) {
  // use the note velocity (how hard you press)
  // to change the circle's diameter
  dia = map(n.attack, 0,1, 20,height/3);
  
  // and use the note number (0–127 for the
  // entire keyboard, but we'll just use octave
  // 0) to set the hue
  hue = map(n.number, 48,72, 0,360);
}
