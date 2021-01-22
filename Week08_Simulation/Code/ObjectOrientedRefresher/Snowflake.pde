
class Snowflake {
  
  // some variables that control the overall
  // behavior of each snowflake – putting them
  // at the top of your class makes is much
  // easier to update/tweak your settings
  
  int minPoints =      5;      // # points in the snowflake
  int maxPoints =      12;
  float minRadius =    4;      // overall size
  float maxRadius =    12;
  
  float minDownSpeed = 0.1;    // speed falling down
  float maxDownSpeed = 1.5;
  
  float wiggleSpeed =  0.02;
  float wiggleAngle =  random(0, TWO_PI);
  
  // these variables get set when the snowflake is
  // created, using either random values from the
  // variables above or using map() to tie one variable
  // to another!
  
  PVector pos;
  PVector speed;
  
  int numPoints;
  float innerRadius, outerRadius;
  float rotation, rotationSpeed;
  
  
  Snowflake() { 
    
    // set overall shape and size of the snowflake
    numPoints =   int(random(minPoints, maxPoints));
    outerRadius = random(minRadius, maxRadius);
    innerRadius = outerRadius / 1.5;
    
    // set the initial position offscreen
    // (can be off to the left or right side too, so that
    // when they're blown by the wind they don't all disappear)
    pos = new PVector(random(-width, width*2), random(-height,0));
    
    // set downward speed based on the size of the snowflake
    float downSpeed = map(outerRadius, minRadius,maxRadius, maxDownSpeed, minDownSpeed);
    speed = new PVector(0, downSpeed);
    
    // and set rotation speed as they fall
    // (this will be changed in the update() method later)
    rotationSpeed = 0;
    rotation = 0;
  }
  
  
  void update(Wind w) {
    
    // each frame, move the snowflake down and
    // apply the wind's force to them too
    pos.add(speed);
    pos.add(w.force);
    
    // use the wind speed to change the overall rotation
    // (note: they rotate in the direction the wind is blowing!)
    rotationSpeed = map(w.force.x, -w.maxSpeed,w.maxSpeed, -3,3);
    rotation += radians(rotationSpeed);
    
    // optional: add a little wiggle to each flake's
    // downward movement
    float wiggle = sin(wiggleAngle) * 0.5;
    pos.x += wiggle;
    wiggleAngle += wiggleSpeed;
  }
  
  
  void display() {
    
    // move the origin to the snowflake's position
    // this makes our drawing commands much easier
    // to read/change, since they're all relative to 0,0
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(rotation);
    
    // draw the star-shape
    fill(255, 100);
    noStroke();
    float angle = TWO_PI / numPoints;
    beginShape();
    for (float a=0; a<TWO_PI; a+=angle) {
      float x = cos(a) * outerRadius;
      float y = sin(a) * outerRadius;
      vertex(x, y);
      x = cos(a+angle/2) * innerRadius;
      y = sin(a+angle/2) * innerRadius;
      vertex(x, y);
    }
    endShape(CLOSE);
    
    popMatrix();    
  }
}
