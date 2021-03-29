/*
PUTTING IT ALL TOGETHER (with bonus snowstorm simulation)
Jeff Thompson | 2019/21 | jeffreythompson.org

Whew, we've covered a lot! Let's put it all together and
create a snowfall simulator. This is a fun little project
that quickly shows how many different variables you can add 
and the ways that one variable can affect another. For 
example, the wind's force can proportionately change the 
speed and direction that a snowflake rotates! Subtle, but 
adds a lot.

CHALLENGES:
1. What other parameters can you add to the Snowflake class? 
   What about randomized transparency or little doodads on 
   the ends of each point?
2. Can you make the snowflakes "stick" to the ground instead 
   of being deleted? (Hint: you could have their position 
   stay fixed, but eventually your computer would slow down. 
   Instead, try creating a Graphics object and draw the flake 
   to it.)

*/

let numFlakes = 500;  // how many snowflakes to generate

let flakes;           // list of snowflake objects
let wind;             // wind to apply to snowflakes


function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  // create a list of Snowflake objects
  flakes = [];
  for (let i=0; i<numFlakes; i++) {
    let f = new Snowflake();
    flakes.push(f);
  }

  // make a Wind object too
  wind = new Wind();
}

function draw() {
  background(30, 40, 50);

  // update the wind's force
  wind.update();

  // go through all the snowflakes
  for (let i=0; i<flakes.length; i++) {
    let f = flakes[i];
    
    // update their position and draw them
    f.update(wind);
    f.display();

    // if past the bottom of the screen,
    // remove from list and make a new one
    if (f.pos.y > height + f.outerRadius) {
      flakes.splice(i, 1);  // remove one element
      flakes.push( new Snowflake() );
    }
  }
}


class Snowflake {
  
  constructor() {

    // some variables that control the overall
    // behavior of each snowflake – putting them
    // at the top of your class makes is much
    // easier to update/tweak your settings

    this.minPoints =    5;      // # points in the snowflake
    this.maxPoints =    12;
    this.minRadius =    4;      // overall size
    this.maxRadius =    12;
    
    this.minDownSpeed = 0.1;    // speed falling down
    this.maxDownSpeed = 1.5;
    
    this.wiggleSpeed =  0.02;
    this.wiggleAngle =  random(0, TWO_PI);
    
    // these variables get set when the snowflake is
    // created, using either random values from the
    // variables above or using map() to tie one variable
    // to another!
    
    // set overall shape and size of the snowflake
    this.numPoints =   int(random(this.minPoints, this.maxPoints));
    this.outerRadius = random(this.minRadius, this.maxRadius);
    this.innerRadius = this.outerRadius / 1.5;
    
    // set the initial position offscreen
    // (can be off to the left or right side too, so that
    // when they're blown by the wind they don't all disappear)
    this.pos = createVector(random(-width, width*2), random(-height,0));
    
    // set downward speed based on the size of the snowflake
    this.downSpeed = map(this.outerRadius, this.minRadius, this.maxRadius, this.maxDownSpeed, this.minDownSpeed);
    this.speed = createVector(0, this.downSpeed);
    
    // and set rotation speed as they fall
    // (this will be changed in the update() method later)
    this.rotationSpeed = 0;
    this.rotation = 0;
  }
  
  update(w) {
    
    // each frame, move the snowflake down and
    // apply the wind's force to them too
    this.pos.add(this.speed);
    this.pos.add(w.force);
    
    // use the wind speed to change the overall rotation
    // (note: they rotate in the direction the wind is blowing!)
    this.rotationSpeed = map(w.force.x, -w.maxSpeed,w.maxSpeed, -3,3);
    this.rotation += radians(this.rotationSpeed);
    
    // optional: add a little wiggle to each flake's
    // downward movement
    let wiggle = sin(this.wiggleAngle) * 0.5;
    this.pos.x += wiggle;
    this.wiggleAngle += this.wiggleSpeed;
  }
  
  display() {
    
    // move the origin to the snowflake's position
    // this makes our drawing commands much easier
    // to read/change, since they're all relative to 0,0
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);
    
    // draw the star-shape
    fill(255, 100);
    noStroke();
    let angle = TWO_PI / this.numPoints;
    beginShape();
    for (let a=0; a<TWO_PI; a+=angle) {
      let x = cos(a) * this.outerRadius;
      let y = sin(a) * this.outerRadius;
      vertex(x, y);

      x = cos(a+angle/2) * this.innerRadius;
      y = sin(a+angle/2) * this.innerRadius;
      vertex(x, y);
    }
    endShape(CLOSE);
    
    pop();    
  }
}


// Perlin-noise driven wind!
class Wind {
  
  constructor() {
    this.speedInc =       0.03;    // max amt change each frame
    this.maxSpeed =       0.8;     // total max wind speed
    
    this.noiseOffset =    0;       // position in the Perlin noise
    this.noiseIncrement = 0.1;     // speed to step through the noise
    
    // computed wind force (start at 0)
    this.force = createVector(0,0);  
  }
  
  update() {
    
    // update the value from Perlin noise
    this.noiseOffset += this.noiseIncrement;
    let noiseValue = noise(this.noiseOffset);
    
    // convert the Perlin noise value (0-1) to the
    // desired wind speed
    this.force.x += map(noiseValue, 0,1, -this.speedInc,this.speedInc);
    
    // finally, make sure the wind stays within the 
    // desired range (otherwise it can get really huge)
    this.force.x = constrain(this.force.x, -this.maxSpeed, this.maxSpeed);
  }
}

